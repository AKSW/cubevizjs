/*eslint no-unused-vars: 0*/
/*eslint no-console: 0*/
/*eslint no-debugger: 0*/
/*eslint func-style: 0*/

import Heatmap from './HighCharts/Heatmap.js';
import PieChart from './HighCharts/PieChart.js';
import ColumnChart from './HighCharts/ColumnChart.js';
import GroupedColumnChart from './HighCharts/GroupedColumnChart.js';
import StackedGroupedColumnChart from './HighCharts/StackedGroupedColumnChart.js';

/**
 * convert - Converts a cubeViz result object into a react chart class.
 *
 * @param  {type} cubeVizResult Contains: complex, name, score, isSatisfied,
 * singleElementDimensions and mulitElementDimensions
 * @param  {type} selectedComponents Contains selected dimension elements, attribute and measure
 * @param  {type} slice         Data selection
 * @param  {type} dc            Original data cube
 * @returns {type}               React chart
 */
function convert(cubeVizResult, selectedComponents, slice, dc) {
    const charts = {
        cvHeatmap: new Heatmap(cubeVizResult, selectedComponents, slice, dc),
        cvPieChart: new PieChart(cubeVizResult, selectedComponents, slice, dc),
        cvColumnChart: new ColumnChart(cubeVizResult, selectedComponents, slice, dc),
        cvGroupedColumnChart: new GroupedColumnChart(cubeVizResult, selectedComponents, slice, dc),
        cvStackedGroupedColumnChart: new StackedGroupedColumnChart(cubeVizResult, selectedComponents, slice, dc)
    };

    if (!charts[cubeVizResult.get('name')])
        throw new Error('Unkown chart type.');

    const chartClass = charts[cubeVizResult.get('name')];
    const chartReact = chartClass.render();
    return chartReact;
}

export default convert;
