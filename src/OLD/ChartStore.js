/*eslint no-unused-vars: 0*/
/*eslint no-console: 0*/
/*eslint no-debugger: 0*/

import Rxmq from 'ecc-messagebus';
import Immutable from 'immutable';

import * as CubeViz from '../CubeViz.js';

export const chartChannel = Rxmq.channel('chart');

chartChannel
.subject('chart.convertToChart')
.subscribe(data => {

    const chart = Immutable.fromJS(data.chart);
    const selectionCube = data.selectionCube;

    const chartReact = CubeViz.displayChart(chart, selectionCube);
    chartChannel.subject('chart.display').onNext(chartReact);
});
