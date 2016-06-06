/*eslint func-style: [2, "declaration"]*/
/*eslint react/no-multi-comp: 0*/
/*eslint no-debugger:0*/
/*eslint no-unused-vars:0*/
/*eslint no-console: 0*/

import React from 'react';
import Immutable, {Map} from 'immutable';

import * as Util from './Util.js';
import DataCube from './DataCube';

import {PieChart, BarChart} from 'react-d3';
import Heatmap from './components/Charts/Heatmap.js';
import GroupedStackedBar from './components/Charts/GroupedStackedBar.js';

function toNumber(val) {
    if (typeof val !== 'number') {
        console.log('Converting.js: Forcing value to be a number.');
        return parseFloat(val);
    }
    return val;
}

function convertDataCube(visual, dataCube) {
    const converter = {

        heatmap(v, dc) {

            const map = dc.dimensions
                // gets all dimension elements in one list
                .map(dim => dc.getDimensionElements(dim))
                // gives all dimension elements an index
                .flatMap(dimEls => dimEls.map((dimEl, idx) => Map({
                    [DataCube.getUri(dimEl)]: Map({idx, object: dimEl
                })})))
                // reduces list to map
                .reduce((m, dimEl) => m.merge(dimEl), Map());
            const data = dc.observations
                .map(o => {
                    const dimEls = dc.getDimElsFromObservation(o).flatten(1) //TODO flatten()
                        .map(dimEl => map.getIn([DataCube.getUri(dimEl), 'idx'])); //maps from dimEl to index

                    const m = dc.getMeasure(o).first(); //TODO first
                    const val = toNumber(DataCube.getValue(m));
                    return dimEls.push(val);
                });

            //TODO axis
            return (<Heatmap container="chart" data={data.toJS()}/>);
        },
        pieChart(v, dc) {

            const sum = dc.observations.reduce((s, o) => {
                const m = dc.getMeasure(o).first(); //TODO first
                const val = toNumber(DataCube.getValue(m));

                return s + val;
            }, 0);

            const data = dc.observations.map(o => {
                //TODO first
                const dimElUri = DataCube.getDimensionElementUri(v.get('selectedDim'), o).first();
                const dimEl = dc.getDimensionElement(DataCube.getUri(dimElUri));

                const m = dc.getMeasure(o).first(); //TODO first
                const val = toNumber(DataCube.getValue(m));
                return {
                    label: DataCube.getValue(dc.getLabel(dimEl)),
                    value: Math.round((val / sum) * 100)
                };
            });
            //TODO Title
            return (<PieChart
                      data={data.toJS()}
                      width={400}
                      height={400}
                      radius={100}
                      innerRadius={20}
                      sectorBorderColor="white"
                      title="Pie Chart"
                      />);
        },
        groupedStackedBar(v, dc) {
            return (<GroupedStackedBar container="chart" />);
        },

        barChart(v, dc) {
            // const m = dc.getMeasure(dc.observations.first()).first(); //TODO first
            const yAxisLabel = 'Unit Label';
            // const yAxisLabel = Util.getMeasure(
            //     Util.getDefaultMeasurement(dc.get('obs').first()), dc)
            //     .get('cvNiceLabel');
            const xAxisLabel = DataCube.getValue(dc.getLabel(v.get('selectedDim')));

            const data = dc.observations.map(o => {

                //TODO first
                const dimElUri = DataCube.getDimensionElementUri(v.get('selectedDim'), o).first();
                const dimEl = dc.getDimensionElement(DataCube.getUri(dimElUri));

                const m = dc.getMeasure(o).first(); //TODO first
                const val = toNumber(DataCube.getValue(m));

                return {
                    x: DataCube.getValue(dc.getLabel(dimEl)),
                    y: val
                };
            });

            const barData = [
                {name: 'Series A', values: data.toJS()}
            ];

            return (
                <BarChart
                data={barData}
                width={400}
                height={400}
                fill={'#3182bd'}
                yAxisLabel={yAxisLabel}
                xAxisLabel={xAxisLabel}
                />
            );
        }
    };

    if (converter[visual.get('name')])
        return converter[visual.get('name')](visual, dataCube);

    throw new Error('Unkown chart type.');
}

export function convert(visual, dataCube) {
    return convertDataCube(visual, dataCube);
}
