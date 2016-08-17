/*eslint func-style: 0*/

import {Map} from 'immutable';
import {CHANGE_IMPORT_SETTINGS} from '../actions';
import {IMPORT_TYPE_DEFAULT} from '../api/import';
import DefaultDataCube from '../assets/DefaultDataCube';

const initialImportState = Map({
    importType: IMPORT_TYPE_DEFAULT,
    value: DefaultDataCube
});

function importReducer(state = initialImportState, action) {
    switch (action.type) {
    case CHANGE_IMPORT_SETTINGS:
        return state
            .set('importType', action.payload.importType)
            .set('value', action.payload.value);
    default:
        return state;
    }
}

export default importReducer;
