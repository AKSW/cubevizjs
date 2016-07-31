/*eslint no-unused-vars: 0*/
/*eslint no-debugger:0*/
/*eslint no-console: 0*/
/*eslint func-style: 0*/

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {convert} from '../api/convert.js';

class Chart extends Component {
    render() {
        return (<div>{this.props.chart}</div>);
    }
}

Chart.propTypes = {
};

function mapStateToProps(state) {
    const {dataCubeReducer} = state;
    return {
        chart: (dataCubeReducer.get('selectedChart'))
            ? convert(
                dataCubeReducer.get('selectedChart'),
                dataCubeReducer.get('slice'),
                dataCubeReducer.get('dataCube'))
            : null
    };
}

export default connect(mapStateToProps)(Chart);
