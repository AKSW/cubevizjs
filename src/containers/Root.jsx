/*eslint no-debugger: 0*/
/*eslint no-console: 0*/
/*eslint func-style: 0*/

import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import MainContainer from './Main.jsx';

function mapImmutableToPlain(reducersObj) {
    return Object.keys(reducersObj).reduce(function(previous, current) {
        const mapped = (reducersObj[current].toJS) ? reducersObj[current].toJS() : reducersObj[current];
        previous[current] = mapped;
        return previous;
    }, {});
}

const AppbarStyles = () => getMuiTheme(baseTheme);

const logger = createLogger({duration: true, stateTransformer: state => mapImmutableToPlain(state)});
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));

class Root extends Component {
    getChildContext() {
        return {muiTheme: getMuiTheme(baseTheme)};
    }
    render() {
        return (
            <MuiThemeProvider muiTheme={AppbarStyles()}>
                <Provider store={store}>
                    <MainContainer config={this.props.config}/>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

Root.childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
};

export default Root;
