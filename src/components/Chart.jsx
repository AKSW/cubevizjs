import React from 'react';

import {chartChannel} from '../stores/ChartStore.js';

const Chart = React.createClass({
    getInitialState() {
        return {chart: null};
    },

    componentWillMount() {

        chartChannel
            .subject('chart.display')
            .subscribe(chart => {
                this.setState({chart});
            });
    },

    render() {
        return(
            <div>{this.state.chart}</div>
        );
    }
});

export default Chart;
