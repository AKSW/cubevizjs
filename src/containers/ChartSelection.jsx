/*eslint no-unused-vars: 0*/
/*eslint no-debugger:0*/
/*eslint no-console: 0*/
/*eslint func-style: 0*/

import React from 'react';
import {connect} from 'react-redux';

import {changeSelectedChart} from '../actions/dataCubeActions.js';

import Selection from './Selection.jsx';

class ChartSelection extends Selection {

    action(index) {
        return changeSelectedChart(index);
    }
}

function mapStateToProps(state) {
    const {dataCubeReducer} = state;
    return {
        list: dataCubeReducer.get('selectableChartsNames').toJS(),
        index: dataCubeReducer.get('selectedChartIdx'),
        label: 'Chart'
    };
}

export default connect(mapStateToProps)(ChartSelection);
