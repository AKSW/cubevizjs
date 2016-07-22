/*eslint func-style: 0*/
/*eslint no-console: 0*/
/*eslint no-debugger: 0*/
import {createAction} from 'redux-actions';
import {createNewDataCube} from './dataCubeActions.js';
import imprt, {IMPORT_TYPE_FILE_UPLOAD} from '../api/import';
import SparqlStore from '../SparqlStore.js';
import RemoteStore from '../RemoteStore.js';

export const SHOW_GLOBAL_POPOVER = 'SHOW_GLOBAL_POPOVER';

export const SHOW_SETTINGS_MODAL = 'SHOW_SETTINGS_MODAL';
export const HIDE_SETTINGS_MODAL = 'HIDE_SETTINGS_MODAL';

export const CHANGE_IMPORT_SETTINGS = 'CHANGE_IMPORT_SETTINGS';

export const CHANGE_DATASET = 'CHANGE_DATASET';
export const CHANGE_MEASURE = 'CHANGE_MEASURE';
export const CHANGE_CHART = 'CHANGE_CHART';


export const showGlobalPopover = createAction(SHOW_GLOBAL_POPOVER, (show, title) => ({show, title}));

export const showSettingsModal = createAction(SHOW_SETTINGS_MODAL, (modalType, anchorEl) => ({modalType, anchorEl}));
export const hideSettingsModal = createAction(HIDE_SETTINGS_MODAL);

export const changeImportSettings = createAction(CHANGE_IMPORT_SETTINGS, (importType, value) => {
    if (importType === IMPORT_TYPE_FILE_UPLOAD)
        return {importType, value: value.name};
    return {importType, value};
});

export const changeDataSet = createAction(CHANGE_DATASET);
export const changeMeasure = createAction(CHANGE_MEASURE);
export const changeChart = createAction(CHANGE_CHART);

export function createRdfStore({dataType, value}) {
    let store;
    if (dataType === 'triple')
        store = new SparqlStore(value);
    else
        store = new RemoteStore(value);

    return store.create();
}

export function importData(store) {
    return store.load()
        .then(s => s.import());
}

export function doImport(importType, value) {
    return dispatch => {
        return imprt({importType, value})
            .then(result => {
                dispatch(changeImportSettings(importType, value));
                dispatch(showGlobalPopover(true, 'Creating RDF Store'));
                return createRdfStore(result);
            }).then(store => {
                dispatch(showGlobalPopover(true, 'Importing Data'));
                return importData(store);
            }).then(data => {
                dispatch(showGlobalPopover(true, 'Creating Data Cube'));
                dispatch(createNewDataCube(data));
                dispatch(showGlobalPopover(false, ''));
            })
            .catch(err => {
                console.log(err);
                dispatch(showGlobalPopover(false, ''));
            });
    };
}
