/*eslint func-style: [2, "declaration"]*/
/*eslint complexity: [2, 4]*/
/*eslint no-debugger:0*/
/*eslint no-unused-vars: 0*/
/*eslint no-console: 0*/
/*eslint max-statements: 0*/

import Immutable, {List, Map} from 'immutable';

import HeatmapRule from './rules/HeatmapRule.js';
import PieChartRule from './rules/PieChartRule.js';
// import {convert} from './Converting.js';
import DataCube from './DataCube.js';

const comparison = {
    name: 'comparison',
    eval(dataCube) {
        const rules = List([new HeatmapRule(), new PieChartRule()]);
        const charts = rules.map(rule => {

            //TODO implement singleElementDimensions and multiElementDimensions method

            return Map({
                complex: 'comparison',
                name: rule.getName(),
                score: rule.getScore(dataCube),
                isSatisfied: rule.isSatisfiedBy(dataCube),
                singleElementDimensions: [],
                multiElementDimensions: []
            });
        });

        return charts;
    }
};

// Contexts

const testContext = {
    name: 'Test Context',
    description: 'Test context. Contains multiple complexes.',
    complexes: [comparison]
};

const Contexts = Immutable.fromJS([testContext]);

// Discards every observation point not in dimensions
// dimensionsMap: {dimension: dim, dimEls: [...]}
function selectObservations(dimensionsMap, dataCube) {
    return dataCube.getAllObservations().
        filter(o => dimensionsMap.every((dimEls, dimUri) => {
            return dimEls.some(dimEl => DataCube.observationContainsDimEl(dimUri, dimEl, o));
        }));
}

//Returns list with dimensions and according dimension elements
function selectDimensions(dimEls, dataCube) {

    return dimEls.reduce((list, dimEl) => {
        const dim = dataCube.getDimension(dimEl);

        if (list.find(d => d.get('@id') === dim.get('@id')))
            return list;

        return list.push(dim);
    }, Immutable.List());
}

export function createDataCube(selections, dataCube) {
    const dimensions = selectDimensions(selections, dataCube);
    const dimensionsMap = dataCube.assignDimEls(selections, dimensions);
    const observations = selectObservations(dimensionsMap, dataCube);
    const dc = dataCube.createDataCube(selections, dimensions, observations);
    return dc;
}


/**
 * determineCharts - Determines possible charts to use
 * in a specific context. A context is a set of multiple rules predefined by CubeViz or
 * defined by the user
 *
 * @param  {type} context description
 * @param  {type} dc      description
 * @return {type}         description
 */
export function determineCharts(context, dc) {
    const ctx = (context) ? context : Contexts.first();

    if (!dc)
        return List([]);
    const charts = ctx.get('complexes')
        .map(complex => complex.get('eval')(dc))
        .reduce((res, chartlist) => {
            //TODO implement replacement with higher scored rules
            return res.push(chartlist)
                .flatten(1)
                .sortBy(chrt => chrt.get('score'))
                .reverse();
        }, List());
    return charts;
}

export function displayChart(visual, dataCube) {
    // if (visual)
    //     return convert(visual, dataCube);
}

export function displayConfigureDimensions(dataCube) {
    return dataCube.assignedDimEls.map((dimEls, dimUri) => {
        const dim = dataCube.getDimensionFromUri(dimUri);
        return Map({dim, dimEls});
    }).toList();
}
