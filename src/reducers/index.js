/*eslint func-style: 0*/
/*eslint no-debugger: 0*/
/*eslint no-console: 0*/

// import {combineReducers} from 'redux;
import {combineReducers} from 'redux';
import {fromJS} from 'immutable';

import importReducer from './importReducer';
import {SHOW_POPOVER, SHOW_SETTINGS_MODAL, HIDE_SETTINGS_MODAL} from '../actions';


const initialMainState = fromJS({
    showPopover: false,
    popoverTitle: ''
});

export function mainReducer(state = initialMainState, action) {
    switch (action.type) {
    case SHOW_POPOVER:
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

const rootReducer = combineReducers({
    mainReducer,
    settingsReducer,
    importReducer
});

export default rootReducer;
