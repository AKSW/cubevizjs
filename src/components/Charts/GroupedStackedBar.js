import React from 'react';
import Highcharts from 'highcharts';
/*eslint-disable */
const options = {
        chart: {
            type: 'column'
        },

        title: {
            text: 'Total fruit consumtion, grouped by gender'
        },

        xAxis: {
            categories: ['2009', '2010']
        },

        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'Number of fruits'
            }
        },

        tooltip: {
            formatter: function () {
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y + '<br/>' +
                    'Total: ' + this.point.stackTotal;
            }
        },

        plotOptions: {
            column: {
                stacking: 'normal'
            }
        },

        series: [{
            name: 'England',
            data: [5, 3],
            stack: 'country'
        }, {
            name: 'Germany',
            data: [3, 4],
            stack: 'country'
        }, {
            name: 'Poland',
            data: [2, 5],
            stack: 'country'
        }]
    };
    /*eslint-enable */
const GroupedStackedBar = React.createClass({
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
export default GroupedStackedBar;
