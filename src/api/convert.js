/*eslint func-style: [2, "declaration"]*/
/*eslint react/no-multi-comp: 0*/
/*eslint no-debugger:0*/
/*eslint no-unused-vars:0*/
/*eslint no-console: 0*/

import React from 'react';
import Immutable, {Map, List, Range, fromJS} from 'immutable';

import DataCube from './DataCube';
import ReactHighcharts from 'react-highcharts';

function toNumber(val) {
    if (typeof val !== 'number') {
        console.log('Converting.js: Forcing value to be a number.');
        return parseFloat(val);
    }
    return val;
}

function createConfig(type, title) {
    return {
        chart: {
            type
        },
        title: {
            text: title
        }
    };
}

function createTitle(dim, dc) {
    return DataCube.getValue(dc.getLabel(dim));
}

/*eslint-disable*/
// Source: https://gist.github.com/hu9o/f4e80ed4b036fd76c31ef33dc5b32601
function cartesianProduct(...arrays) {
    function _inner(...args) {
        if (arguments.length > 1) {
            let arr2 = args.pop(); // arr of arrs of elems
            let arr1 = args.pop(); // arr of elems
            return _inner(...args,
        arr1.map(e1 => arr2.map(e2 => [e1, ...e2]))
            .reduce((arr, e) => arr.concat(e), []));
        } else {
            return args[0];
        }
    }
    return _inner(...arrays, [[]]);
}


function createHeatmap(dim1, dim2, slice, dc) {
    const vals = slice.observations.map(o => {
        const m = slice.getMeasure(o);
        const val = toNumber(DataCube.getValue(m));
        return val;
    });

    const dimEl1 = slice.getDimensionElements(dim1);
    const dimEl2 = slice.getDimensionElements(dim2);

    const t1 = Range(0, dimEl1.size).toJS();
    const t2 = Range(0, dimEl2.size).toJS();
    const indexes = fromJS(cartesianProduct(t1, t2));

    const data = indexes.zipWith((i, d) => i.push(d), vals).toJS();

    const title = 'Test';
    const config = createConfig('heatmap', title);
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
                color: '#000000'}
        }
    ];

    return (<ReactHighcharts config={config}/>);
}

function createPieChart(dim, remainder, slice, dc) {

    const sum = slice.observations.reduce((s, o) => {
        const m = slice.getMeasure(o);
        const val = toNumber(DataCube.getValue(m));
        return s + val;
    }, 0);

    const data = slice.observations.map(o => {
        const dimElUri = DataCube.getDimensionElementUri(dim, o);
        const dimEl = dc.getDimensionElement(DataCube.getUri(dimElUri));
        const restDimEls = dc.getDimElsFromObservation(o).filter(dEl => DataCube.getUri(dEl) !== DataCube.getUri(dimEl));
        const restDimElsStr = '(' + restDimEls.reduce((str, restDimEl) => {
            return (str === '')
                ? str + DataCube.getValue(dc.getLabel(restDimEl))
                : ' ,' + str + DataCube.getValue(dc.getLabel(restDimEl));
        }, '') + ')';

        const m = slice.getMeasure(o);
        const val = toNumber(DataCube.getValue(m));
        return {
            name: DataCube.getValue(slice.getLabel(dimEl)) + ' ' + restDimElsStr,
            y: (val / sum) * 100
        };
    });

    let title = createTitle(dim, dc);

    const config = createConfig('pie', title);
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

export function convert(visual, slice, dataCube) {

    const converter = {

        cvHeatmap(v, s, dc) {
            return null;

            const sed = v.get('singleElementDimensions');
            const med = v.get('multiElementDimensions');
            if (sed.size + med.size > 2)
                throw new Error('Heatmap not appropriate for more than 2 dimensions');
            if (sed.size === 1 && med.size === 0) {
                // const dim1 = sed.get(0);
                // const others = dc.dimensions.filter(d => d.get('@id') !== dim.get('@id'));

            } else if (sed.size === 2 && med.size === 0) {

            } else if (sed.size === 0 && med.size === 1) {

            } else if (sed.size === 0 && med.size === 2) {
                return createHeatmap(med.get(0), med.get(1), s, dc);
            }

            throw new Error();
        },
        cvPieChart(v, slce, dc) {

            const sed = v.get('singleElementDimensions');
            const med = v.get('multiElementDimensions');
            if (sed.size + med.size > 2)
                throw new Error('Pie chart not appropriate for more than 2 dimensions');
            if (sed.size === 1 && med.size === 0) {
                const dim = sed.get(0);
                const remainder = dc.dimensions.filter(d => d.get('@id') !== dim.get('@id'));
                return createPieChart(dim, remainder, slce, dc);

            } else if (sed.size === 0 && med.size === 1) {
                const dim = med.get(0);
                const remainder = dc.dimensions.filter(d => d.get('@id') !== dim.get('@id'));
                return createPieChart(dim, remainder, slce, dc);
            } else if (sed.size === 1 && med.size === 1) {
                const dim = med.get(0);
                const remainder = List([sed.get(0)]);
                return createPieChart(dim, remainder, slce, dc);
            }
            throw new Error();
        },

        barChart(v, dc) {
        }
    };

    if (converter[visual.get('name')])
        return converter[visual.get('name')](visual, slice, dataCube);

    throw new Error('Unkown chart type.');
}
/*eslint-enable*/
