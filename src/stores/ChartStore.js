/*eslint no-unused-vars: 0*/
/*eslint no-console: 0*/
/*eslint no-debugger: 0*/

import Rxmq from 'ecc-messagebus';
import * as CubeViz from './CubeViz/CubeViz.js';

export const chartChannel = Rxmq.channel('chart');

chartChannel
.subject('chart.convertToChart')
.subscribe(chart => {

    const chartReact = CubeViz.displayChart(chart, chart.facetCube);
    chartChannel.subject('chart.display').onNext(chartReact);
});
