/*eslint func-style: 0*/
/*eslint complexity: 0*/

import {Map} from 'immutable';
import {
    CHANGE_IMPORT_SETTINGS,
    CHANGE_RDF_STORE,
    CHANGE_DATASETS,
    CHANGE_DATASET_INDEX
} from '../actions';
import {IMPORT_TYPE_DEFAULT} from '../api/import';
import DefaultDataCube from '../assets/DefaultDataCube';

const initialImportState = Map({
    importType: IMPORT_TYPE_DEFAULT,
    value: DefaultDataCube,
    dataSets: null,
    dataSetIndex: 0,
    rdfStore: null
});

function importReducer(state = initialImportState, action) {
    switch (action.type) {
    case CHANGE_IMPORT_SETTINGS:
        return state
            .set('importType', action.payload.importType)
            .set('value', action.payload.value);
    case CHANGE_RDF_STORE:
        return state.set('rdfStore', action.payload);
    case CHANGE_DATASETS:
        return state.set('dataSets', action.payload);
    case CHANGE_DATASET_INDEX:
        return state.set('dataSetIndex', action.pay);
    default:
        return state;
    }
}

export default importReducer;
