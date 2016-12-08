import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {assert} from 'chai';

import {handleConfiguration} from '../src/actions/index.js';
const middlewares = [thunk] // add your middlewares like `redux-thunk`


describe('Action tests', function() {
    it('', function() {
        assert.isTrue(true);
    })
});
