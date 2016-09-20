/*eslint no-unused-vars: 0*/
/*eslint no-console: 0*/
/*eslint no-debugger: 0*/
/*eslint func-style: 0*/
/*eslint complexity: 0*/

import Chart from '../Chart.js';
import ReactHighcharts from 'react-highcharts';
import HighchartsHeatmap from 'highcharts-heatmap';
HighchartsHeatmap(ReactHighcharts.Highcharts);
import React from 'react';
import {fromJS, List, Range} from 'immutable';
import DataCube from '../../DataCube.js';

class Heatmap extends Chart {

    // Source: https://gist.github.com/hu9o/f4e80ed4b036fd76c31ef33dc5b32601
    cartesianProduct(...arrays) {
        function _inner(...args) {
            if (arguments.length > 1) {
                const arr2 = args.pop(); // arr of arrs of elems
                const arr1 = args.pop(); // arr of elems
                return _inner(...args,
            arr1.map(e1 => arr2.map(e2 => [e1, ...e2]))
                .reduce((arr, e) => arr.concat(e), []));
            }
            return args[0];
        }
        return _inner(...arrays, [[]]);
    }

    //FIXME wrong index order of dimension elements for missing dimension elements in observations
    createHeatmap(dim1, dim2, slice, dc) {

        const selectedMeasure = this.selectedComponents.get('measureComponent');
        const selectedAttrEl = this.selectedComponents.get('attrComponentElement');

        const vals = slice.observations.map(o => {
            const m = slice.getMeasureElementsFromObservation(o, List([selectedMeasure])).first();
            const val = this.toNumber(DataCube.getValue(m));
            return val;
        });

        const dimEl1 = slice.getDimensionElements(dim1);
        const dimEl2 = slice.getDimensionElements(dim2);

        const t1 = Range(0, dimEl1.size).toJS();
        const t2 = Range(0, dimEl2.size).toJS();
        const indexes = fromJS(this.cartesianProduct(t1, t2));

        const data = indexes.zipWith((i, d) => i.push(d), vals).toJS();

        const title = this.createTitle(List([dim1, dim2]));

        const config = this.createDefaultConfig('heatmap', title);
        config.xAxis = {
            categories: this.createAxis(dimEl1).toJS(),
            title: null
        };
        config.yAxis = {
            categories: this.createAxis(dimEl2).toJS(),
            title: null
        };
        config.colorAxis = {
            min: 0,
            minColor: '#FFFFFF',
            maxColor: '#000000'
        };
        config.legend = {
            align: 'left',
            layout: 'vertical',
            margin: 0,
            verticalAlign: 'top',
            y: 25,
            symbolHeight: 280
        };
        config.series = [
            {
                borderWidth: 1,
                data,
                dataLabels: {
                    enabled: true,
                    color: '#000000'
                }
            }
        ];

        return (<ReactHighcharts config={config}/>);
    }

    render() {
        const sed = this.cubeVizResult.get('singleElementDimensions');
        const med = this.cubeVizResult.get('multiElementDimensions');

        if (sed.size === 2 && med.size === 0)
            return this.createHeatmap(sed.get(0), sed.get(1), this.slice, this.dc);
        else if (sed.size === 1 && med.size === 1)
            return this.createHeatmap(sed.get(0), med.get(0), this.slice, this.dc);
        else if (med.size === 2)
            return this.createHeatmap(med.get(0), med.get(1), this.slice, this.dc);

        throw new Error();
    }
}

export default Heatmap;
