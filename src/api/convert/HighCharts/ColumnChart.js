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

export default class ColumnChart extends Chart {

    createColumnChart(dim, remainder, slice, dc) {
        const defaultMeasure = this.selectedComponents.get('measureComponent');

        const dimEls = slice.getDimensionElements(dim);

        const titleDims = (remainder) ? List([dim, remainder]) : List([dim]);
        const title = this.createTitle(titleDims);

        const remainderTitle = (remainder)
        ? DataCube.getValue(DataCube.getLabel(slice.getDimensionElements(remainder).first()))
        : '';

        const config = this.createDefaultConfig('column', title);

        config.yAxis = this.createYAxis();
        config.tooltip = {
            pointFormat: remainderTitle
        };
        config.series = dimEls.map(dimEl => {
            const name = DataCube.getValue(DataCube.getLabel(dimEl));

            const data = slice.getObservationsContainingDimEls(List([dimEl]))
                .map(o => {
                    const m = slice.getMeasureElementsFromObservation(o, List([defaultMeasure])).first();
                    const val = this.toNumber(DataCube.getValue(m));
                    return val;
                }).toJS();
            return {name, data};
        }).toJS();

        return (<ReactHighcharts config={config}/>);
    }

    render() {
        const sed = this.cubeVizResult.get('singleElementDimensions');
        const med = this.cubeVizResult.get('multiElementDimensions');
        if (sed.size + med.size > 2)
            throw new Error('Basic column chart not appropriate for more than 2 dimensions');
        if (sed.size === 1 && med.size === 0) {
            const dim = sed.get(0);
            return this.createColumnChart(dim, null, this.slice, this.dc);
        } else if (sed.size === 0 && med.size === 1) {
            const dim = med.get(0);
            return this.createColumnChart(dim, null, this.slice, this.dc);
        } else if (sed.size === 1 && med.size === 1) {
            const dim = med.get(0);
            const remainder = sed.get(0);
            return this.createColumnChart(dim, remainder, this.slice, this.dc);
        }
        throw new Error();
    }
}
