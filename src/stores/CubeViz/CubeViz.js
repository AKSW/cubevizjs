/*eslint func-style: [2, "declaration"]*/
/*eslint complexity: [2, 4]*/
/*eslint no-debugger:0*/
/*eslint no-unused-vars: 0*/
/*eslint no-console: 0*/

import Immutable from 'immutable';

import * as Rules from '../../rules/Rules.js';
import * as Util from '../../Util.js';
import {convert} from '../Converting/Converting.js';

const comparison = {
    name: 'comparison',
    //return {rank: number, visual: type}
    eval(dataCube) {//HERE

        const results = {/*complex: this.name, visuals: []*/};
        let visuals = Immutable.List();

        const heatmapRule = new Rules.HeatmapRule(2, 20, 2);
        const isSatisfiedHeatmap = heatmapRule.isSatisfiedBy(dataCube);

        if (isSatisfiedHeatmap.first()) {
            visuals = visuals.push(isSatisfiedHeatmap.last().merge({rank: 1, name: 'heatmap'}));
        }

        const selectedDimensionRule = new Rules.SelectedDimensionRule(2, 10);
        const isSatisfiedSelectedDim = selectedDimensionRule.isSatisfiedBy(dataCube);
        if (isSatisfiedSelectedDim.first()) {

            visuals = visuals.withMutations(v => {
                v.push(isSatisfiedSelectedDim.last().merge({rank: 2, name: 'pieChart'}));
                v.push(isSatisfiedSelectedDim.last().merge({rank: 2, name: 'barChart'}));
            });
        }
        //
        // const groupedStackedBarRule = new Rules.GroupedStackedBarRule(20);
        // const isSatisfiedGStackedBar = groupedStackedBarRule.isSatisfiedBy(dataCube);
        //
        // if (_.first(isSatisfiedGStackedBar)) {
        //     results.visuals.push(_.extend({rank: 0, name: 'groupedStackedBar'}, _.last(isSatisfiedGStackedBar)));
        // }

        return Immutable.Map({complex: 'comparison', visuals});
    }
};

const maxNumber = {
    name: 'maxNumber',

    eval(dataCube) {

        // const results = {complex: this.name, visuals: []};
        //
        // const heatmapRule = new Rules.HeatmapRule(2, 10, 2);
        // const isSatisfiedHeatmap = heatmapRule.isSatisfiedBy(dataCube);
        //
        // if (_.first(isSatisfiedHeatmap)) {
        //     results.visuals.push(_.extend({rank: 2, name: 'heatmap'}, _.last(isSatisfiedHeatmap)));
        // }
        //
        // return results;
    }
};

// Contexts

const testContext = {
    id: 0,
    name: 'Test Context',
    description: 'Test context. Contains multiple complexes.',
    complexes: [comparison/*,maxNumber*/]
};

export const Contexts = Immutable.fromJS([testContext]);

// Discards every observation point not in dimensions
function selectObservations(dimensions, dataCube) {

    const facetsDimElUris = dimensions.reduce((list, f) => {
        const s = f.get('dimensionElements').map(dimEl => dimEl.get('cvUri'));
        return list.push(s);
    }, Immutable.List()).flatten(true);

    return dataCube.get('obs').filter(obs => {
        const obsDimElUris = obs.get('cvDimensions').map(dimEl => dimEl.get('cvUri'));
        return obsDimElUris.every(uri => facetsDimElUris.contains(uri)); //TODO check if every or some
    });
}

//Returns list with dimensions and according dimension elements
function selectDimensions(dimEls, dataCube) {

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

export function createDataCube(selections, dataCube) {
    const dimensions = selectDimensions(selections, dataCube);
    const observations = selectObservations(dimensions, dataCube);

    return Immutable.Map().withMutations(map => map
        .set('dimensions', dimensions)
        .set('measures', dataCube.get('measures'))
        .set('obs', observations));
}

export function determineVisuals(context, dataCube) {

    const test = Contexts.first();
    return test.get('complexes').map(c => c.get('eval')(dataCube));
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
