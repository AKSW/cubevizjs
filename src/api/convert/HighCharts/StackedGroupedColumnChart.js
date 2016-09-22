/*eslint no-unused-vars: 0*/
/*eslint no-console: 0*/
/*eslint no-debugger: 0*/
/*eslint func-style: 0*/
/*eslint complexity: 0*/

import Chart from '../Chart.js';
import DataCube from '../../DataCube.js';
import {List} from 'immutable';
import ReactHighcharts from 'react-highcharts';
import React from 'react';

export default class StackedGroupedColumnChart extends Chart {

    createChart(dims) {
        // const defaultMeasure = this.selectedComponents.get('measureComponent');
        //
        // const dimElsCategories = this.slice.getDimensionElements(dims.first());
        // const dimElsSeries = this.slice.getDimensionElements(dims.get(1));
        // const dimElsStacked = this.slice.getDimensionElements(dims.get(2));
        //
        // const title = this.createTitle(dims);
        //
        // const config = this.createDefaultConfig('column', title);
        //
        // config.xAxis = {
        //     categories: dimElsCategories.map(dimEl => DataCube.getValue(DataCube.getLabel(dimEl))).toJS()
        // };
        // config.yAxis = this.createYAxis();
        //
        // config.series = dimElsSeries.map((dimElSeries, idx) => {
        //     const name = DataCube.getValue(DataCube.getLabel(dimElSeries));
        //
        //     let combinedDimEls = List();
        //     let stack = null;
        //     if (dimElsStacked.has(idx)) {
        //         combinedDimEls = List([dimElsStacked.get(idx)]);
        //         stack = DataCube.getValue(DataCube.getLabel(dimElsStacked.get(idx)));
        //     }
        //
        //     const data = dimElsCategories.flatMap(dimElCategories => {
        //
        //         combinedDimEls = combinedDimEls.concat(List([dimElSeries, dimElCategories]));
        //
        //         return this.slice.getObservationsContainingDimEls(combinedDimEls).
        //             map(o => {
        //                 const m = this.slice.getMeasureElementsFromObservation(o, List([defaultMeasure])).first();
        //                 const val = this.toNumber(DataCube.getValue(m));
        //                 return val;
        //             }).toJS();
        //
        //     }).toJS();
        //     return {name, stack, data};
        // }).toJS();
        //
        // return (<ReactHighcharts config={config}/>);
    }

    render() {
        const sed = this.cubeVizResult.get('singleElementDimensions');
        const med = this.cubeVizResult.get('multiElementDimensions');
        if (sed.size + med.size > 3)
            throw new Error('Stacked grouped column chart not appropriate for more than 3 dimensions');

        return this.createChart(med.concat(sed));
    }
}
