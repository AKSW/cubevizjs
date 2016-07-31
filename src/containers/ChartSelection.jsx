/*eslint no-unused-vars: 0*/
/*eslint no-debugger:0*/
/*eslint no-console: 0*/
/*eslint func-style: 0*/

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {changeSelectedChart} from '../actions/dataCubeActions.js';

import List from '../components/lists/List.jsx';

class ChartSelection extends Component {

    onChange(index) {
        this.props.dispatch(changeSelectedChart(index));
    }

    render() {
        return (
            <List
                multiple={false}
                label="Charts"
                list={this.props.charts}
                value={this.props.index}
                onChange={this.onChange.bind(this)}/>
        );
    }
}

ChartSelection.propTypes = {
    charts: PropTypes.arrayOf(
        PropTypes.string.isRequired
    ).isRequired,
    index: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const {dataCubeReducer} = state;
    return {
        charts: dataCubeReducer.get('selectableChartsNames').toJS(),
        index: dataCubeReducer.get('selectedChartIdx')
    };
}

export default connect(mapStateToProps)(ChartSelection);
