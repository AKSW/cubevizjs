/*eslint func-style: [2, "declaration"]*/
/*eslint complexity: [2, 4]*/
/*eslint no-debugger:0*/
/*eslint no-unused-vars: 0*/
/*eslint no-console: 0*/
/*eslint max-nested-callbacks: [2, 4]*/

import Immutable from 'immutable';
import _ from 'underscore';
import * as Rules from '../../rules/Rules.js';
import * as Util from '../../Util.js';
import {convert} from '../Converting/Converting.js';

const comparison = {
    name: 'comparison',
    //return {rank: number, visual: type}
    eval(dataCube) {

        const results = {complex: this.name, visuals: []};

        const heatmapRule = new Rules.HeatmapRule(2, 20, 2);
        const isSatisfiedHeatmap = heatmapRule.isSatisfiedBy(dataCube);

        if (_.first(isSatisfiedHeatmap)) {
            results.visuals.push(_.extend({rank: 1, name: 'heatmap'}, _.last(isSatisfiedHeatmap)));
        }

        const selectedDimensionRule = new Rules.SelectedDimensionRule(2, 10);
        const isSatisfiedPie = selectedDimensionRule.isSatisfiedBy(dataCube);
        if (_.first(isSatisfiedPie)) {
            results.visuals.push(_.extend({rank: 2, name: 'pieChart'}, _.last(isSatisfiedPie)));
            results.visuals.push(_.extend({rank: 2, name: 'barChart'}, _.last(isSatisfiedPie)));
        }

        const groupedStackedBarRule = new Rules.GroupedStackedBarRule(20);
        const isSatisfiedGStackedBar = groupedStackedBarRule.isSatisfiedBy(dataCube);

        if (_.first(isSatisfiedGStackedBar)) {
            results.visuals.push(_.extend({rank: 0, name: 'groupedStackedBar'}, _.last(isSatisfiedGStackedBar)));
        }

        return results;
    }
};

const maxNumber = {
    name: 'maxNumber',

    eval(dataCube) {

        const results = {complex: this.name, visuals: []};

        const heatmapRule = new Rules.HeatmapRule(2, 10, 2);
        const isSatisfiedHeatmap = heatmapRule.isSatisfiedBy(dataCube);

        if (_.first(isSatisfiedHeatmap)) {
            results.visuals.push(_.extend({rank: 2, name: 'heatmap'}, _.last(isSatisfiedHeatmap)));
        }

        return results;
    }
};

// Contexts

const testContext = {
    id: 0,
    name: 'Test Context',
    description: 'Test context. Contains multiple complexes.',
    complexes: [comparison, maxNumber]
};

export const Complexes = [testContext];

//facets: {dim0: [dimEl0, dimEl1], dim1 ...}
// Discards every observation point not in facets
function facetting(dataCube, facets) {
    //TODO: use some or every? means: use oberservation point if contains some dimensions
    //in selected Data or every dimension
    const t = dataCube.get('obs').filter(obs => {
        return dataCube.get('dimensions').every(dim => {
            const dimElUris = dim.get('dimensionElements').map(dimEl => dimEl.get('cvUri'));
            const facetdimElUris = facets.reduce((list, f) => {
                const s = f.get('dimensionElements').map(dimEl => dimEl.get('cvUri'));
                return list.push(s);
            }, Immutable.List()).flatten(true);
            return dimElUris.some(dimEL => facetdimElUris.contains(dimEL));
            // return !_.isUndefined(facets.find(f => {}));
            //FIXME do not check for equel dimension check if dimensionelement
            //from obs point is contained by dimensionelements from facets
        });
    });

    debugger;
    // return _.filter(dataCube.obs, obs => {
    //     return _.every(dataCube.dimensions, dim => { return _.contains(facets[dim], obs[dim]); });
    // });
}

// Returns facets ({dim0: [dimEl0, dimEl1], dim1 ...}) for selected dimension elements
function enrichFacets(dimEls, dataCube) {

    return dimEls.map(dimEl => { // maps selcted dimEl to dim
        const dim = Util.getDimension(dimEl, dataCube);
        return dim.remove('dimensionElements').set('dimensionElements', Immutable.List([dimEl]));
    }).reduce((list, dim) => { // combines multiple dimEls to according dim
        const index = list.findIndex(d=> d.get('cvUri') === dim.get('cvUri'));
        if (index !== -1) {
            const concat = list.get(index).get('dimensionElements').concat(dim.get('dimensionElements'));
            return list.update(index, d => {
                return d.remove('dimensionElements').set('dimensionElements', concat);
            });
        }
        return list.push(dim);
    }, Immutable.List());
}

function createDataCube(selections, dataCube) {
    const facets = enrichFacets(selections, dataCube);
    const facetObs = {obs: facetting(dataCube, facets)};
    facetObs.dimensions = dataCube.dimensions;
    const facetCube = _.extend(facetObs, facets);
}

/*eslint-disable */
export function determineVisuals(dataCube, context, selections) {
/*eslint-enable */

    const selectionCube = createDataCube(selections, dataCube);
    const results = _.map(context.complexes, c => { return c.eval(selectionCube); });

    return _.extend(results, {selectionCube});
}
/*eslint-disable */
export function displayChart(visual, dataCube) {
  /*eslint-enable */
    return convert(visual, dataCube);
}

export function displayConfigureDimensions(dataCube) {

    return dataCube.get('dimensions')
        .flatMap(dim => { return Util.getDimensionElements(dim, dataCube).flatten(true); });
}

// // Returns dimension for dimension element
// function getDimension(dimEl, dataCube) {
//     return _.chain(dataCube.dimensions)
//         .map(dim => {
//             if (_.contains(dataCube[dim], dimEl)) {
//                 return dim;
//             }
//             return null;
//         })
//         .filter(kv => {return !_.isNull(kv);})
//         .first()
//         .value();
// }
