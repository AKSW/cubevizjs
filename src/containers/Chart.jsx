/*eslint no-unused-vars: 0*/
/*eslint no-debugger:0*/
/*eslint no-console: 0*/
/*eslint func-style: 0*/

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

class Chart extends Component {
    render() {
        return (
            this.props.chart
        );
    }
}

Chart.propTypes = {
};

function mapStateToProps(state) {
    const {dataCubeReducer} = state;
    return {
        chart: null
    };
}

export default connect(mapStateToProps)(Chart);
