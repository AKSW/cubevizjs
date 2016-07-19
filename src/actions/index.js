/*eslint func-style: 0*/
/*eslint no-console: 0*/
/*eslint no-debugger: 0*/
import {createAction} from 'redux-actions';
import imprt, {IMPORT_TYPE_FILE_UPLOAD} from '../api/import';

export const SHOW_SETTINGS_MODAL = 'SHOW_SETTINGS_MODAL';
export const HIDE_SETTINGS_MODAL = 'HIDE_SETTINGS_MODAL';

export const CHANGE_IMPORT_SETTINGS = 'CHANGE_IMPORT_SETTINGS';

export const SHOW_POPOVER = 'SHOW_POPOVER';

export const CHANGE_DATASET = 'CHANGE_DATASET';
export const CHANGE_DATA_SELECTION = 'CHANGE_DATA_SELECTION';
export const CHANGE_MEASURE = 'CHANGE_MEASURE';
export const CHANGE_CHART = 'CHANGE_CHART';

export const showSettingsModal = createAction(SHOW_SETTINGS_MODAL, (modalType, anchorEl) => ({modalType, anchorEl}));
export const hideSettingsModal = createAction(HIDE_SETTINGS_MODAL);

export const changeImportSettings = createAction(CHANGE_IMPORT_SETTINGS, (importType, value) => {
    if (importType === IMPORT_TYPE_FILE_UPLOAD)
        return {importType, value: value.name};
    return {importType, value};
});

export const showPopover = createAction(SHOW_POPOVER, (show, title) => ({show, title}));

export function doImport(importType, value) {
    return dispatch => {
        dispatch(showPopover(true, 'Importing'));
        return imprt({importType, value})
            .then(result => {
                dispatch(changeImportSettings(importType, value));
                // TODO dispatch to rdf store
                console.log(result);
                dispatch(showPopover(false, ''));
            })
            .catch(err => console.log(err));
    };
}

export const changeDataSet = createAction(CHANGE_DATASET);
export const changeDataSelection = createAction(
    CHANGE_DATA_SELECTION,
    (indexes, subindexes) => ({indexes, subindexes})
);
export const changeMeasure = createAction(CHANGE_MEASURE);
export const changeChart = createAction(CHANGE_CHART);
