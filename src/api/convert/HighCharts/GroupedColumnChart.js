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

export default class GroupedColumnChart extends Chart {

    createChart(dims) {

        const defaultMeasure = this.selectedComponents.get('measureComponent');
        const sortedDims = this.sortDimension(dims);

        const dimElsCategories = this.slice.getDimensionElements(sortedDims.first());
        const dimElsSeries = this.slice.getDimensionElements(sortedDims.get(1));

        const title = this.createTitle(sortedDims);

        const config = this.createDefaultConfig('column', title);

        config.xAxis = {
            categories: dimElsCategories.map(dimEl => DataCube.getValue(DataCube.getLabel(dimEl))).toJS()
        };
        config.yAxis = this.createYAxis();

        config.series = dimElsSeries.map(dimElSeries => {
            const name = DataCube.getValue(DataCube.getLabel(dimElSeries));
            const data = dimElsCategories.flatMap(dimElCategories => {
                return this.slice.getObservationsContainingDimEls(List([dimElCategories, dimElSeries])).
                    map(o => {
                        const m = this.slice.getMeasureElementsFromObservation(o, List([defaultMeasure])).first();
                        const val = this.toNumber(DataCube.getValue(m));
                        return val;
                    }).toJS();
            }).toJS();
            return {name, data};
        }).toJS();

        return (<ReactHighcharts config={config}/>);
    }

    render() {
        const sed = this.cubeVizResult.get('singleElementDimensions');
        const med = this.cubeVizResult.get('multiElementDimensions');
        if (sed.size + med.size > 2)
            throw new Error('Grouped column chart not appropriate for more than 2 dimensions');

        if (sed.size === 0 && med.size === 2)
            return this.createChart(med);
        throw new Error();
    }
}
