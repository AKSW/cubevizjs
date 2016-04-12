/*eslint func-style: [2, "declaration"]*/
/*eslint complexity: [2, 4]*/
/*eslint no-debugger:0*/

import _ from 'underscore';
import * as Rules from '../../rules/Rules.js';
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
    return _.filter(dataCube.obs, obs => {
        return _.every(dataCube.dimensions, dim => { return _.contains(facets[dim], obs[dim]); });
    });
}

// Returns dimension for dimension element
function getDimension(dimEl, dataCube) {
    return _.chain(dataCube.dimensions)
        .map(dim => {
            if (_.contains(dataCube[dim], dimEl)) {
                return dim;
            }
            return null;
        })
        .filter(kv => {return !_.isNull(kv);})
        .first()
        .value();
}

// Returns facets ({dim0: [dimEl0, dimEl1], dim1 ...}) for selected dimension elements
function enrichFacets(dimEls, dataCube) {
    return _.chain(dimEls)
        .map(dimEl => { return {[getDimension(dimEl, dataCube)]: dimEl}; })
        .reduce((obj, kv) => {
            const key = _.first(_.keys(kv)); //_.contains(_.keys(obj), key)
            const value = _.first(_.values(kv));
            if (obj[key]) {
                const el = obj[key];
                el.push(value);
                obj[key] = el;
                return obj;
            }
            return _.extend(obj, {[key]: [value]});
        }, {})
        .value();
}

/*eslint-disable */
export function determineVisuals(dataCube, context, settings) {
/*eslint-enable */
    const facets = enrichFacets(settings, dataCube);
    const facetObs = {obs: facetting(dataCube, facets)};
    facetObs.dimensions = dataCube.dimensions;
    const facetCube = _.extend(facetObs, facets);

    const results = _.map(context.complexes, c => { return c.eval(facetCube); });

    return _.extend(results, {facetCube});
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
