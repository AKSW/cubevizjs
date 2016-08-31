/*eslint func-style: 0*/
/*eslint no-console: 0*/
/*eslint no-debugger: 0*/
import {fromJS} from 'immutable';
import {createAction} from 'redux-actions';
import {createNewDataCube, resetAllDataCubeState} from './dataCubeActions.js';
import imprt, {IMPORT_TYPE_FILE_UPLOAD} from '../api/import';
import SparqlStore from '../api/SparqlStore.js';
import RemoteStore from '../api/RemoteStore.js';

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

export function doImport(importType, value) {
    return dispatch => {
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
                dispatch(showGlobalPopover(false, ''));
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
    };
}

export function handleConfiguration(config) {
    return dispatch => {
        if (config.data_source &&
            config.data_source.value)
            dispatch(doImport('endpoint', config.data_source.value));
        else
            dispatch(doImport('default', 'default'));
    };
}
