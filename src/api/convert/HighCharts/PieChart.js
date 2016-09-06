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

    createPieChart(dim, remainder, slice, dc) {
        const defaultMeasure = this.selectedComponents.get('measureComponent');

        const sum = slice.observations.reduce((s, o) => {
            const m = slice.getMeasureElementsFromObservation(o, List([defaultMeasure])).first();
            const val = this.toNumber(DataCube.getValue(m));
            return s + val;
        }, 0);

        const data = slice.observations.map(o => {
            const dimEl = slice.getDimensionElementsFromObservation(o, List([dim])).first();
            const restDimEls =
                dc.getDimensionElementsFromObservation(o)
                    .filter(dEl => DataCube.getUri(dEl) !== DataCube.getUri(dimEl));
            const restDimElsStr = '(' + restDimEls.reduce((str, restDimEl) => {
                return (str === '')
                    ? str + DataCube.getValue(dc.getLabel(restDimEl))
                    : ' ,' + str + DataCube.getValue(dc.getLabel(restDimEl));
            }, '') + ')';

            const m = slice.getMeasureElementsFromObservation(o, List([defaultMeasure])).first();
            const val = this.toNumber(DataCube.getValue(m));
            return {
                name: DataCube.getValue(slice.getLabel(dimEl)) + ' ' + restDimElsStr,
                y: (val / sum) * 100
            };
        });

        const title = this.createTitle(List([dim]));

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
            const remainder = this.dc.dimensions.filter(d => d.get('@id') !== dim.get('@id'));
            return this.createPieChart(dim, remainder, this.slice, this.dc);

        } else if (sed.size === 0 && med.size === 1) {
            const dim = med.get(0);
            const remainder = this.dc.dimensions.filter(d => d.get('@id') !== dim.get('@id'));
            return this.createPieChart(dim, remainder, this.slice, this.dc);
        } else if (sed.size === 1 && med.size === 1) {
            const dim = med.get(0);
            const remainder = List([sed.get(0)]);
            return this.createPieChart(dim, remainder, this.slice, this.dc);
        }
        throw new Error();
    }
}

export default PieChart;
