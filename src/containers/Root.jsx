/*eslint no-debugger: 0*/
/*eslint no-console: 0*/

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import MainContainer from './Main.jsx';

const AppbarStyles = () => getMuiTheme(baseTheme);

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default class Root extends Component {
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
