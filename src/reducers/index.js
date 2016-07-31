/*eslint func-style: 0*/
/*eslint no-debugger: 0*/
/*eslint no-console: 0*/

// import {combineReducers} from 'redux;
import {combineReducers} from 'redux';
import {fromJS, Map} from 'immutable';

import importReducer from './importReducer';
import dataCubeReducer from './dataCubeReducer';
import {
    SHOW_GLOBAL_POPOVER,
    SHOW_SETTINGS_MODAL,
    HIDE_SETTINGS_MODAL,
    CHANGE_SELECTED_COMPONENTS
} from '../actions';


const initialMainState = fromJS({
    showPopover: false,
    popoverTitle: ''
});

export function mainReducer(state = initialMainState, action) {
    switch (action.type) {
    case SHOW_GLOBAL_POPOVER:
        return state
            .set('showPopover', action.payload.show)
            .set('popoverTitle', action.payload.title);
    default:
        return state;
    }
}

const initialSettingsState = fromJS({
    modalType: null,
    anchorEl: null,
});

export function settingsReducer(state = initialSettingsState, action) {
    switch (action.type) {
    case SHOW_SETTINGS_MODAL:
        return state
            .set('modalType', action.payload.modalType)
            .set('anchorEl', action.payload.anchorEl);
    case HIDE_SETTINGS_MODAL:
        return state
            .set('modalType', null)
            .set('anchorEl', null);
    default:
        return state;
    }
}

const initialSelectionState = Map({
    selectedComponents: {} //Maps {dim1: dimEls, dim2: dimEls}
});

export function selectionReducer(state = initialSelectionState, action) {
    switch (action.type) {
    case CHANGE_SELECTED_COMPONENTS:
        return state.set('selectedComponents', action.payload);
    default:
        return state;
    }
}

const rootReducer = combineReducers({
    mainReducer,
    settingsReducer,
    importReducer,
    selectionReducer,
    dataCubeReducer
});

export default rootReducer;
