/*eslint func-style: [2, "declaration"]*/
/*eslint complexity: [2, 4]*/

import _ from 'underscore';
import * as Rules from '../../rules/Rules.js';
import {convert} from '../Converting/Converting.js';

const comparison = {
    name: 'comparison',
    //return {rank: number, visual: type}
    eval(dataCube) {

        const results = {complex: this.name, visuals: []};

        const heatmapRule = Rules.HeatmapRule(dataCube);

        if (_.first(heatmapRule)) {
            results.visuals.push({rank: 1, visual: _.extend({name: 'heatmap'}, _.last(heatmapRule))});
        }

        // jedes DimensionsElement auf 1 nur eine Dimension darf mehrere Elemente haben
        // und Obs. Punkte 5 - 10
        //TODO consider dimension element count, because ratio matters

        const piaChartRule = Rules.PiaChartRule(dataCube);
        const inPieChartRange = new Rules.InRange(2, 10);

        if (inPieChartRange.isSatisfiedBy(dataCube.obs.length) && _.first(piaChartRule)) {
            results.visuals.push({rank: 2, visual: _.extend({name: 'pieChart'}, _.last(piaChartRule))});
        }

        return results;
    }
};

// const maxNumber = {
//     name: 'maxNumber',
//     eval(dataCube) {
//         return dataCube;
//     }
// };

// Contexts

const testContext = {
    id: 0,
    name: 'Test Context',
    description: 'Test context. Contains multiple complexes.',
    complexes: [comparison]
};

export const Complexes = [testContext];

//facets: {dim0: [dimEl0, dimEl1], dim1 ...}
function facetting(dataCube, facets) {
    return _.filter(dataCube.obs, obs => {
        return _.every(dataCube.dimensions, dim => { return _.contains(facets[dim], obs[dim]); });
    });
}

/*eslint-disable */
export function determineVisuals(dataCube, context, settings) {

/*eslint-enable */
    const facets = {year: ['2008', '2009'], country: ['England', 'Germany', 'Poland']};
    const facetCube = {obs: facetting(dataCube, facets)};
    facetCube.dimensions = dataCube.dimensions;
    _.extend(facetCube, facets);

    const results = _.chain(context.complexes)
        .map(c => { return c.eval(facetCube); })
        .sortBy('rank') //FIXME not working, map return nested array
        .first() //FIXME see above
        .value();

    return _.extend(results, {facetCube}); //TODO for all visual results
}
/*eslint-disable */
export function displayChart(visual, dataCube) {
  /*eslint-enable */
    return convert(visual, dataCube);
}

export function displayConfigureDimensions(dataCube) {

    return _.chain(dataCube.dimensions).map(dim => { return dataCube[dim]; })
        .flatten()
        .value();
}
