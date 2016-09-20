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
        const title = this.createTitle(List([dim]).concat(remainder));

        const config = this.createDefaultConfig('column', title);

        config.xAxis = {
            categories: dimEls.map(dimEl => DataCube.getValue(DataCube.getLabel(dimEl))).toJS()
        };

        config.yAxis = this.createYAxis();

        config.series = [
            {
                data: slice.observations.map(o => {
                    const m = slice.getMeasureElementsFromObservation(o, List([defaultMeasure])).first();
                    const val = this.toNumber(DataCube.getValue(m));
                    return val;
                }).toJS()
            }
        ];

        return (<ReactHighcharts config={config}/>);
    }

    //FIXME wrong sed = 1 med = 0 representation
    render() {
        const sed = this.cubeVizResult.get('singleElementDimensions');
        const med = this.cubeVizResult.get('multiElementDimensions');
        if (sed.size + med.size > 2)
            throw new Error('Basic column chart not appropriate for more than 2 dimensions');
        if (sed.size === 1 && med.size === 0) {
            const dim = sed.get(0);
            return this.createColumnChart(dim, List(), this.slice, this.dc);
        } else if (sed.size === 0 && med.size === 1) {
            const dim = med.get(0);
            return this.createColumnChart(dim, List(), this.slice, this.dc);
        } else if (sed.size === 1 && med.size === 1) {
            const dim = med.get(0);
            const remainder = List([sed.get(0)]);
            return this.createColumnChart(dim, remainder, this.slice, this.dc);
        }
        throw new Error();
    }
}
