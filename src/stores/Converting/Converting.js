/*eslint func-style: [2, "declaration"]*/
import _ from 'underscore';
import React from 'react';
import {PieChart} from 'react-d3';

function convertDataCube(visual, dataCube) {
    const converter = {
        // heatmap(v, dc) {
        //     throw new Error('heatmap');
        // },
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
