/*eslint no-unused-vars: 0*/
/*eslint no-debugger:0*/
/*eslint no-console: 0*/
/*eslint func-style: 0*/

import React from 'react';
import {connect} from 'react-redux';

import Selection from './Selection.jsx';
import {changeSelectedComponentIndex} from '../actions/dataCubeActions.js';

class MeasureSelection extends Selection {

    action(index) {
        return changeSelectedComponentIndex('measureComponents', index);
    }
}

function mapStateToProps(state) {
    const {dataCubeReducer} = state;
    return {
        list: dataCubeReducer.get('selectableComponents').measureComponents,
        index: dataCubeReducer.getIn(['selectedComponentsIndex', 'measureComponents']),
        label: 'Measures'
    };
}

export default connect(mapStateToProps)(MeasureSelection);
