/*eslint no-debugger: 0*/
/*eslint no-console: 0*/

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

// import CubeVizApp from '../components/CubeVizApp.jsx';
import MainContainer from './Main.jsx';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <MainContainer config={this.props.config}/>
            </Provider>
        );
    }
}
