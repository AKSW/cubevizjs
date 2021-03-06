/*eslint func-style: 0*/
/*eslint no-debugger: 0*/
/*eslint no-console: 0*/
/*eslint complexity: 0*/

// import {combineReducers} from 'redux;
import {combineReducers} from 'redux';
import {Map} from 'immutable';

import importReducer from './importReducer';
import dataCubeReducer from './dataCubeReducer';
import {
    SHOW_GLOBAL_POPOVER,
    SHOW_SETTINGS_MODAL,
    HIDE_SETTINGS_MODAL,
    ADD_NEW_LINE_TO_LOG_BOX,
    CHANGE_LOG_BOX_VISIBILITY,
    CHANGE_USER_CONFIG
} from '../actions';


const initialMainState = Map({
    showPopover: false,
    popoverTitle: '',
    logBoxText: '',
    logBoxVisible: false,
    userConfiguration: {}
});

export function mainReducer(state = initialMainState, action) {
    switch (action.type) {
    case SHOW_GLOBAL_POPOVER:
        return state
            .set('showPopover', action.payload.show)
            .set('popoverTitle', action.payload.title);
    case ADD_NEW_LINE_TO_LOG_BOX:
        return state.set('logBoxText', state.get('logBoxText').concat('\n' + action.payload + '\n'));
    case CHANGE_LOG_BOX_VISIBILITY:
        return state.set('logBoxVisible', action.payload);
    case CHANGE_USER_CONFIG:
        return state.set('userConfiguration', action.payload);
    default:
        return state;
    }
}

const initialSettingsState = Map({
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
    importReducer,
    dataCubeReducer
});

export default rootReducer;
