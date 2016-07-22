/*eslint no-unused-vars: 0*/
/*eslint no-debugger:0*/
/*eslint no-console: 0*/
/*eslint func-style: 0*/

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import List from '../components/lists/List.jsx';

class ChartSelection extends Component {

    onChange(index) {

    }

    render() {
        return (
            <List
                multiple={false}
                label="Charts"
                list={this.props.charts}
                value="0"
                onChange={this.onChange.bind(this)}/>
        );
    }
}

ChartSelection.propTypes = {
    charts: PropTypes.arrayOf(
        PropTypes.string.isRequired
    ).isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const {dataCubeReducer} = state;
    return {
        charts: dataCubeReducer.get('selectableChartsNames').toJS()
    };
}

export default connect(mapStateToProps)(ChartSelection);
