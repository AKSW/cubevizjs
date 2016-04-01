/*eslint func-style: [2, "declaration"]*/
/*eslint react/no-multi-comp: 0*/

import _ from 'underscore';
import React from 'react';
import {PieChart} from 'react-d3';
import Heatmap from '../../components/Heatmap/Heatmap.js';

//TODO refactor to util components
// function dimElementCount(dim, obs) {
//     return _.countBy(obs, o => { return o[dim]; });
// }

function convertDataCube(visual, dataCube) {
    const converter = {

        heatmap(v, dc) {

            const map =
            _.chain(dc.dimensions)
            .map(dim => { // gets all dimension elements in one array
                return dc[dim];
            })
            //gives all dimension elements an index
            .map(dimEls => { return _.map(dimEls, (dimEl, index) => {return {[dimEl]: index}; }); })
            .flatten() // flattens array
            .reduce((m, obj) => { return _.extend(m, obj); }, {}) // creates single object
            .value();

            const data = _.map(dc.obs, o => {
                const dimEls =
                _.chain(dc.dimensions)
                .map(dim => { return o[dim]; }) //gets all dimension elements for observation point
                .map(dimEl => { return map[dimEl]; }) //maps from dim El to index
                .value();

                dimEls.push(o.value);
                return dimEls;
            });
            //TODO axis
            return(<Heatmap container="chart" data={data}/>);
        },
        pieChart(v, dc) {
            const sum = _.reduce(dc.obs, (s, o) => { return s + o.value; }, 0);
            const data = _.map(dc.obs, o => {
                return {label: o[v.selectedDim], value: Math.round((o.value / sum) * 100)};
            });

            return (<PieChart
                      data={data}
                      width={400}
                      height={400}
                      radius={100}
                      innerRadius={20}
                      sectorBorderColor="white"
                      title="Pie Chart"
                      />);
        },
        // barStackChart(v, dc) {
        //     throw new Error('barStackChart');
        // }
    };

    if (converter[visual.name]) {
        return converter[visual.name](visual, dataCube);
    }

    throw new Error('Unkown chart type.');
}

export function convert(visual, dataCube) {
    return convertDataCube(visual, dataCube);
}

export function dimensionElements(dimension, dataCube) {
    return _.map(dataCube.obs, o => { return o[dimension]; });
}

export function allDimensionElements(dimensions, dataCube) {
    return _.map(dimensions, dim => { return dimensionElements(dim, dataCube); });
}
