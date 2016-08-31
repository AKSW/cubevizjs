/*eslint no-unused-vars: 0*/
/*eslint no-debugger:0*/
/*eslint no-console: 0*/
/*eslint func-style: 0*/

import React from 'react';
import {connect} from 'react-redux';

import {changeSelectedComponentIndex} from '../actions/dataCubeActions.js';

import MultiSelection from './MultiSelection.jsx';

class DataSelection extends MultiSelection {

    action(selection) {
        return changeSelectedComponentIndex('dimComponentElements', selection);
    }
}

function mapStateToProps(state) {
    const {dataCubeReducer} = state;
    return {
        selectedComponents: dataCubeReducer.getIn(['selectedComponentsIndex', 'dimComponentElements']),
        allComponents: (dataCubeReducer.get('dataCube'))
            ? dataCubeReducer.get('selectableComponents').dimComponentElements
            : []
    };
}

export default connect(mapStateToProps)(DataSelection);
