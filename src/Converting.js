/*eslint func-style: [2, "declaration"]*/
/*eslint react/no-multi-comp: 0*/
/*eslint no-debugger:0*/
/*eslint no-unused-vars:0*/
/*eslint no-console: 0*/

import React from 'react';
import Immutable, {Map, List} from 'immutable';

import * as Util from './Util.js';
import DataCube from './DataCube';

import Heatmap from './components/Charts/Heatmap.js';
import GroupedStackedBar from './components/Charts/GroupedStackedBar.js';

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

function createFixedDimsTitle(fixedDims, dc) {
    return fixedDims.reduce((str, dim) => {

        const dimStr = DataCube.getValue(dc.getLabel(dim));
        const dimElsStr = dc.getDimensionElements(dim).reduce(
            (s, dimEl) => {
                if (s.length !== 0)
                    return s + ', ' + DataCube.getValue(dc.getLabel(dimEl));
                return DataCube.getValue(dc.getLabel(dimEl));
            }, '');

        if (str.length !== 0)
            return str + ', ' + dimStr + ' (' + dimElsStr + ')';
        return dimStr + ' (' + dimElsStr + ')';
    }, '');
}

function createSelectedDimTitle(selectedDim, fixedDims, dc) {
    const selectedTitle = DataCube.getValue(dc.getLabel(selectedDim));
    const fixedTitle = createFixedDimsTitle(fixedDims, dc);

    return selectedTitle + ' with ' + fixedTitle;
}

function convertDataCube(visual, dataCube) {
    const converter = {

        heatmap(v, dc) {
            //FIXME axis
            const sorted = v.get('fixedDims').sortBy(dim => dc.getDimensionElements(dim).size).reverse(); //lowest last
            const map = sorted
                // gets all dimension elements in one list
                .map(dim => dc.getDimensionElements(dim))
                // gives all dimension elements an index
                .flatMap(dimEls => dimEls.map((dimEl, idx) => Map({
                    [DataCube.getUri(dimEl)]: Map({idx, object: dimEl
                })})))
                // reduces list to map
                .reduce((m, dimEl) => m.merge(dimEl), Map());
            const data = dc.observations.map(o => {
                const dimEls = dc.getDimElsFromObservation(o).flatten(1)
                    .map(dimEl => map.getIn([DataCube.getUri(dimEl), 'idx'])); //maps from dimEl to index

                const m = dc.getMeasure(o).first(); //TODO first
                const val = toNumber(DataCube.getValue(m));
                return dimEls.push(val);
            });

            const title = createFixedDimsTitle(sorted, dc);

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
                    data: data.toJS(),
                    dataLabels: {
                        enabled: true,
                        color: '#000000'}
                }
            ];
            config.colorAxis = {
                min: 0,
                minColor: '#FFFFFF',
                maxColor: '#000000'
            };
            config.xAxis = {
                categories: dc.getDimensionElements(sorted.get(0))
                    .map(dimEl => DataCube.getValue(dc.getLabel(dimEl)))
                    .toJS()
            };
            config.yAxis = {
                categories: dc.getDimensionElements(sorted.get(1))
                    .map(dimEl => DataCube.getValue(dc.getLabel(dimEl)))
                    .toJS()
            };
            return (<ReactHighcharts config={config}/>);
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
                    name: DataCube.getValue(dc.getLabel(dimEl)),
                    y: Math.round((val / sum) * 100)
                };
            });

            const title = createSelectedDimTitle(v.get('selectedDim'), v.get('fixedDims'), dc);

            const config = createConfig('pie', title);
            config.series = [
                {
                    data: data.toJS()
                }
            ];
            return (<ReactHighcharts config={config}/>);
        },
        groupedStackedBar(v, dc) {
            return (<GroupedStackedBar container="chart" />);
        },

        barChart(v, dc) {
            const yAxisLabel = 'Unit Label';
            const xAxisLabel = DataCube.getValue(dc.getLabel(v.get('selectedDim')));

            const title = createSelectedDimTitle(v.get('selectedDim'), v.get('fixedDims'), dc);

            const data = dc.getDimensionElements(v.get('selectedDim'))
                .map(dimEl => {
                    const values = dc.getObservations(dimEl).map(o => {
                        const m = dc.getMeasure(o).first(); //TODO first
                        const val = toNumber(DataCube.getValue(m));
                        return val;
                    });

                    return Map({
                        name: DataCube.getValue(dc.getLabel(dimEl)),
                        data: values
                    });
                });

            const config = createConfig('column', title);
            config.series = data.toJS();

            // config.xAxis = {
            //     title: {
            //         text: xAxisLabel
            //     }
            // };
            // config.yAxis = {
            //     title: {
            //         text: yAxisLabel
            //     }
            // };

            return (<ReactHighcharts config={config}/>);
        }
    };

    if (converter[visual.get('name')])
        return converter[visual.get('name')](visual, dataCube);

    throw new Error('Unkown chart type.');
}

export function convert(visual, dataCube) {
    return convertDataCube(visual, dataCube);
}
