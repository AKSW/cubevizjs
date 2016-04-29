/*eslint no-unused-vars: 0*/
/*eslint no-console: 0*/
/*eslint no-debugger: 0*/

import Rxmq from 'ecc-messagebus';
import Immutable from 'immutable';

import * as CubeViz from './CubeViz/CubeViz.js';

export const chartChannel = Rxmq.channel('chart');

chartChannel
.subject('chart.convertToChart')
.subscribe(data => {
    const converted = Immutable.fromJS(data);
    const chartReact = CubeViz.displayChart(converted.get('chart'), converted.get('selectionCube'));
    chartChannel.subject('chart.display').onNext(chartReact);
});
