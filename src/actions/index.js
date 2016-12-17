/*eslint func-style: 0*/
/*eslint no-console: 0*/
/*eslint no-debugger: 0*/
/*eslint complexity: 0*/
/*eslint camelcase: 0*/
import Yup from 'yup';
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

export const CHANGE_USER_CONFIG = 'CHANGE_USER_CONFIG';

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

export const changeUserConfig = createAction(CHANGE_USER_CONFIG);

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

export function importPromise(importType, value, dispatch) {
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
 * preSelection - Handels pre selection after import from user or handels automatic pre selection.
 *
 * @param  {type} importPromise        Import promise
 * @param  {type} config               Config from user
 * @param  {type} shouldAccept = false If true accepts and handels the pre selection to immediately show chart
 * @returns {type}                      description
 */
export function preSelection(importPromise, config, shouldAccept = false) {
    return (dispatch, getState) => {
        return importPromise
            .then(() => {
                const {dataCubeReducer} = getState();
                const dc = dataCubeReducer.get('dataCube');

                const measureIndex = preSelectMeasure(config.data_configuration, dc);
                const attributeIndexes = preSelectAttribute(config.data_configuration, dc);
                const dimensionIndexes = preSelectionDimEls(config.data_configuration, dc);

                if (measureIndex !== -1)
                    dispatch(changeSelectedComponentIndex('measureComponents', measureIndex));
                if (dc.attributes.size > 0)
                    dispatch(changeSelectedComponentIndex('attrComponentElements', attributeIndexes));
                dispatch(changeSelectedComponentIndex('dimComponentElements', dimensionIndexes));

                if (shouldAccept) {
                    const chartName = ('ui_configuration' in config && 'chart_name' in config.ui_configuration)
                        ? config.ui_configuration.chart_name
                        : '';
                    dispatch(handleAccept({chartName}));
                }
            })
            .catch(err => {
                console.error(err);
            });
    };
}

const schema = Yup.object().shape({
    data_configuration: Yup.object().strict().shape({
        source: Yup.string(),
        measure: Yup.string(),
        attribute: Yup.string(),
        dimension_elements: Yup.array().of(Yup.string()),
    }),
    ui_configuration: Yup.object().shape({
        ui_container: Yup.string().required(),
        show_ui_elements: Yup.bool(),
        chart_name: Yup.string()
    }).required()
}).required();

export function handleConfiguration(config) {
    return dispatch => {
        return schema.validate(config)
            .then(() => {

                dispatch(changeUserConfig(config));

                if (config && 'data_configuration' in config && 'source' in config.data_configuration) {

                    let shouldAccept = false;
                    if ('ui_configuration' in config && 'show_ui_elements' in config.ui_configuration)
                        shouldAccept = !config.ui_configuration.show_ui_elements;

                    dispatch(preSelection(
                        importPromise('endpoint', config.data_configuration.source, dispatch),
                        config,
                        shouldAccept
                    ));
                }
                else {
                    dispatch(doImport(
                        'endpoint',
                        'https://raw.githubusercontent.com/AKSW/cubeviz.ontowiki/master/assets/serbia.n3'));
                }
            })
            .catch(err => {
                console.log(err.errors.toString());
            });
    };
}
