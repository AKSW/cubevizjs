/*eslint no-unused-vars: 0*/
/*eslint no-debugger:0*/
/*eslint no-console: 0*/
/*eslint func-style: 0*/

import React from 'react';
import {connect} from 'react-redux';

import Selection from './Selection.jsx';

class MeasureSelection extends Selection {

    action(index) {
        // return changeSelectedChart(index);
    }
}

function mapStateToProps(state) {
    const {dataCubeReducer} = state;
    return {
        list: dataCubeReducer.get('selectableComponents').measureComponents,
        index: 0,
        label: 'Measures'
    };
}

export default connect(mapStateToProps)(MeasureSelection);
