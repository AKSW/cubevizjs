/*eslint func-style: 0*/
/*eslint no-console: 0*/
/*eslint no-debugger: 0*/
/*eslint complexity: 0*/
import {fromJS, Map} from 'immutable';
import {createAction} from 'redux-actions';
import {createNewDataCube,
    resetAllDataCubeState,
    changeSelectedComponentIndex,
    handleAccept} from './dataCubeActions.js';
import imprt, {IMPORT_TYPE_FILE_UPLOAD} from '../api/import';
import SparqlStore from '../api/SparqlStore.js';
import RemoteStore from '../api/RemoteStore.js';

import {mapUriToindex, mapUrisToindexes} from '../api/util/dataCubeUtil.js';

export const SHOW_GLOBAL_POPOVER = 'SHOW_GLOBAL_POPOVER';

export const SHOW_SETTINGS_MODAL = 'SHOW_SETTINGS_MODAL';
export const HIDE_SETTINGS_MODAL = 'HIDE_SETTINGS_MODAL';

export const CHANGE_IMPORT_SETTINGS = 'CHANGE_IMPORT_SETTINGS';

export const CHANGE_RDF_STORE = 'CHANGE_RDF_STORE';

export const CHANGE_DATASETS = 'CHANGE_DATASETS';
export const CHANGE_DATASET_INDEX = 'CHANGE_DATASET_INDEX';

export const CHANGE_LOG_BOX_VISIBILITY = 'CHANGE_LOG_BOX_VISIBILITY';
export const ADD_NEW_LINE_TO_LOG_BOX = 'ADD_NEW_LINE_TO_LOG_BOX';

export const showGlobalPopover = createAction(SHOW_GLOBAL_POPOVER, (show, title) => ({show, title}));

export const showSettingsModal = createAction(SHOW_SETTINGS_MODAL, (modalType, anchorEl) => ({modalType, anchorEl}));
export const hideSettingsModal = createAction(HIDE_SETTINGS_MODAL);

export const changeImportSettings = createAction(CHANGE_IMPORT_SETTINGS, (importType, value) => {
    if (importType === IMPORT_TYPE_FILE_UPLOAD)
        return {importType, value: value.name};
    return {importType, value};
});

export const changeRdfStore = createAction(CHANGE_RDF_STORE);

export const changeLogBoxVisibility = createAction(CHANGE_LOG_BOX_VISIBILITY);
export const addNewLineToLogBox = createAction(ADD_NEW_LINE_TO_LOG_BOX);

export const changeDataSets = createAction(CHANGE_DATASETS);
export const changeDataSetIndex = createAction(CHANGE_DATASET_INDEX);

export function createRdfStore({dataType, value}) {
    let store;
    if (dataType === 'triple')
        store = new SparqlStore(value);
    else
        store = new RemoteStore(value);

    return store.create();
}

export function listDataSets(store) {
    return store.getDatasets().then(dataSets => ({dataSets, store}));
}

export function dataSetSelectionChanged(index) {
    return (dispatch, getState) => {
        const {importReducer} = getState();
        const store = importReducer.get('rdfStore');
        const ds = importReducer.getIn(['dataSets', index]).toJS();
        dispatch(showGlobalPopover(true, 'Importing Data'));
        return store.import(ds).
            then(data => {
                dispatch(resetAllDataCubeState());
                dispatch(showGlobalPopover(true, 'Creating Data Cube'));
                dispatch(createNewDataCube(data));
                dispatch(changeDataSetIndex(index));
                dispatch(showGlobalPopover(false, ''));
            }).catch(err => {
                console.error(err);
                dispatch(showGlobalPopover(false, ''));
            });
    };
}

function importPromise(importType, value, dispatch) {
    return imprt({importType, value})
        .then(result => {
            dispatch(changeImportSettings(importType, value));
            dispatch(showGlobalPopover(true, 'Creating RDF Store'));
            return createRdfStore(result);
        })
        .then(store => {
            store.setLogger({logFct: addNewLineToLogBox, dispatch});
            return store.load().then(s => s.verify()).then(s => listDataSets(s));
        })
        .then(({dataSets, store}) => {
            dispatch(changeDataSets(fromJS(dataSets)));
            dispatch(changeRdfStore(store));
            return Promise.resolve({ds: dataSets[0], store});
        })
        .then(({ds, store}) => {
            dispatch(showGlobalPopover(true, 'Importing Data'));
            return store.import(ds);
        }).then(data => {

            dispatch(resetAllDataCubeState());
            dispatch(showGlobalPopover(true, 'Creating Data Cube'));
            dispatch(createNewDataCube(data));
            dispatch(showGlobalPopover(false, ''));
        })
        .catch(err => {
            console.error(err);
            dispatch(showGlobalPopover(false, ''));
        });
}

export function doImport(importType, value) {
    return dispatch => {
        return importPromise(importType, value, dispatch);
    };
}

function preSelectMeasure(uiConfig, dc) {
    const measureIndex = (uiConfig && 'measure' in uiConfig) ? mapUriToindex(uiConfig.measure, dc.measures) : 0;
    return measureIndex;
}

function preSelectAttribute(uiConfig, dc) {
    const attributeIndexes = (uiConfig && 'attribute' in uiConfig)
            ? mapUrisToindexes([uiConfig.attribute], dc.attributesElements)
            : {0: ['0']};
    return attributeIndexes;
}

function preSelectionDimEls(uiConfig, dc) {

    function createDimensionSelection(dc) {
        return dc.dimensions.reduce((obj, dim, idx) => {
            return obj.set(idx, dc.getDimensionElements(dim).map((_, i) => i.toString()).toJS());
        }, Map()).toJS();
    }

    const dimensionIndexes = (uiConfig && 'dimension_elements' in uiConfig)
        ? mapUrisToindexes(uiConfig.dimension_elements, dc.assignedDimEls)
        : createDimensionSelection(dc);
    return dimensionIndexes;
}


/**
 * preSelection - Handels pre selection from user or automatic pre selection without showing a chart.
 *
 * @param  {type} importPromise        Import promise
 * @param  {type} uiConfig             UI config from user
 * @param  {type} shouldAccept = false If true accepts and handels the pre selection to immediately show chart
 * @returns {type}                      description
 */
export function preSelection(importPromise, uiConfig, shouldAccept = false) {
    return (dispatch, getState) => {
        return importPromise
            .then(() => {
                const {dataCubeReducer} = getState();
                const dc = dataCubeReducer.get('dataCube');

                const measureIndex = preSelectMeasure(uiConfig, dc);
                const attributeIndexes = preSelectAttribute(uiConfig, dc);
                const dimensionIndexes = preSelectionDimEls(uiConfig, dc);

                if (measureIndex !== -1)
                    dispatch(changeSelectedComponentIndex('measureComponents', measureIndex));
                if (dc.attributes.size > 0)
                    dispatch(changeSelectedComponentIndex('attrComponentElements', attributeIndexes));
                dispatch(changeSelectedComponentIndex('dimComponentElements', dimensionIndexes));

                if (shouldAccept) {
                    const chartName = (uiConfig && 'chart_name' in uiConfig) ? uiConfig.chart_name : '';
                    dispatch(handleAccept({chartName}));
                }
            })
            .catch(err => {
                console.error(err);
            });
    };
}

export function handleConfiguration(config) {
    return dispatch => {
        if (config && 'data_source' in config && 'value' in config.data_source) {

            let shouldAccept = false;
            if ('ui_configuration' in config)
                shouldAccept = true;

            dispatch(preSelection(
                importPromise('endpoint', config.data_source.value, dispatch),
                config.ui_configuration,
                shouldAccept
            ));
        }
        else {
            dispatch(doImport('default', 'default'));
        }
    };
}
