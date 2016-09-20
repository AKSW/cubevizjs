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

class PieChart extends Chart {

    sum(obs, measure, slice) {
        const sum = obs.reduce((s, o) => {
            const m = slice.getMeasureElementsFromObservation(o, List([measure])).first();
            const val = this.toNumber(DataCube.getValue(m));
            return s + val;
        }, 0);
        return sum;
    }

    createPieChart(dim, remainder, slice, dc) {
        const defaultMeasure = this.selectedComponents.get('measureComponent');

        const sum = this.sum(slice.observations, defaultMeasure, slice);

        const dimEls = slice.getDimensionElements(dim);
        const data = dimEls.map(dimEl => {
            const obs = slice.getObservationsContainingDimEls(List([dimEl]));
            const val = this.sum(obs, defaultMeasure, slice);
            return {
                name: DataCube.getValue(DataCube.getLabel(dimEl)) +
                    ' (' + DataCube.getValue(DataCube.getLabel(dim)) + ')',
                y: (val / sum) * 100
            };
        });

        const title = this.createTitle(List([dim]).concat(remainder));

        const config = this.createDefaultConfig('pie', title);
        config.series = [
            {
                data: data.toJS()
            }
        ];
        config.tooltip = {
            pointFormat: '{point.percentage:.1f}%'
        };
        return (<ReactHighcharts config={config}/>);
    }

    render() {
        const sed = this.cubeVizResult.get('singleElementDimensions');
        const med = this.cubeVizResult.get('multiElementDimensions');
        if (sed.size + med.size > 2)
            throw new Error('Pie chart not appropriate for more than 2 dimensions');
        if (sed.size === 1 && med.size === 0) {
            const dim = sed.get(0);
            return this.createPieChart(dim, List(), this.slice, this.dc);

        } else if (sed.size === 0 && med.size === 1) {
            const dim = med.get(0);
            return this.createPieChart(dim, List(), this.slice, this.dc);
        } else if (sed.size === 1 && med.size === 1) {
            const dim = med.get(0);
            const remainder = List([sed.get(0)]);
            return this.createPieChart(dim, remainder, this.slice, this.dc);
        }
        throw new Error();
    }
}

export default PieChart;
