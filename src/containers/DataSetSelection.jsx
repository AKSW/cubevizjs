/*eslint no-unused-vars: 0*/
/*eslint no-debugger:0*/
/*eslint no-console: 0*/
/*eslint func-style: 0*/

import React from 'react';
import {connect} from 'react-redux';

import Selection from './Selection.jsx';

class DataSetSelection extends Selection {

    action(index) {
        // return changeSelectedChart(index);
    }
}

function mapStateToProps(state) {
    const {dataCubeReducer} = state;
    return {
        list: [],
        index: 0,
        label: 'Dataset'
    };
}

export default connect(mapStateToProps)(DataSetSelection);
