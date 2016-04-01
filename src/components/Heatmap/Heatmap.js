import React from 'react';
import Highcharts from 'highcharts';

require('highcharts/modules/heatmap')(Highcharts);
/*eslint-disable */


const options = {
    chart: {
        type: 'heatmap'
    },
    title: {
        text: 'Awesome title'
    },
// xAxis: {
// categories: ['Alexander', 'Marie', 'Maximilian', 'Sophia', 'Lukas', 'Maria', 'Leon', 'Anna', 'Tim', 'Laura']
// },

// yAxis: {
// categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
// title: null
// },
    colorAxis: {
        min: 0,
        minColor: '#FFFFFF',
        maxColor: '#000000'
    },
    legend: {
        align: 'left',
        layout: 'vertical',
        margin: 0,
        verticalAlign: 'top',
        y: 25,
        symbolHeight: 280
    },
    series: [{
        borderWidth: 1,
        dataLabels: {
            enabled: true,
            color: '#000000'}
    }]
}
/*eslint-enable */
const Heatmap = React.createClass({
    // When the DOM is ready, create the chart.
    componentDidMount() {
        // Set container which the chart should render to.

        options.series[0].data = this.props.data;

        this.chart = new Highcharts[this.props.type || 'Chart'](
            this.props.container,
            options
        );
    },
    //Destroy chart before unmount.
    componentWillUnmount() {
        this.chart.destroy();
    },
    //Create the div which the chart will be rendered to.
    render() {
        return React.createElement('div', {id: this.props.container});
    }
});
export default Heatmap;
