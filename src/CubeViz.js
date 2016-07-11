/*eslint func-style: [2, "declaration"]*/
/*eslint complexity: [2, 4]*/
/*eslint no-debugger:0*/
/*eslint no-unused-vars: 0*/
/*eslint no-console: 0*/
/*eslint max-statements: 0*/

import Immutable, {List, Map} from 'immutable';

// import * as Rules from './rules/Rules.js';
import * as Util from './Util.js';
import {convert} from './Converting.js';
import DataCube from './DataCube.js';

function logUnSatisfiedRules(unSatisfiedRules, rules) {
    unSatisfiedRules.forEach((r, idx) => {
        if (r === undefined)
            console.log(rules.get(idx).first().rule);
    });
}

function logRules(satisfiedResult) {
    satisfiedResult.forEach((ruleSet, kind) => {
        console.log(kind);
        ruleSet.forEach(r => (r !== undefined) ? console.log(r.rule) : null);
    });
}

function isAccepted(satisfiedResult) {
    return satisfiedResult.get('mandatory').every(rule => rule);
}

const comparison = {
    name: 'comparison',
    eval(dataCube) {
        let visuals = List();

        const heatmapRules = null;
        const satisfiedHeatmapRules = heatmapRules.map(
            rulesSets => rulesSets.map(ruleSet => ruleSet.find(r => r.rule.isSatisfiedBy(dataCube)))
        );
        if (isAccepted(satisfiedHeatmapRules)) {
            console.log('Satisfied Heatmap rules: ');
            logRules(satisfiedHeatmapRules);

            //TODO REFACTOR Datacube handling
            //TODO Generalize process method for all rules

            let newDc = null;
            if (satisfiedHeatmapRules.get('optional').first() === undefined) {
                newDc = heatmapRules.get('optional').first().first().rule.process(dataCube);
                debugger;
            }

            const s = satisfiedHeatmapRules.get('mandatory').first().selectedDim(dataCube);
            const f = satisfiedHeatmapRules.get('mandatory').first().fixedDims(dataCube);
            visuals = visuals.withMutations(v => {
                v.push(Map({selectedDim: s, fixedDims: f}).merge({rank: 2, name: 'heatmap'}));
            });
        } else {
            console.log('UNSATISFIED Heatmap rules: ');
            logUnSatisfiedRules(satisfiedHeatmapRules, heatmapRules);
        }

        // const pieChartRules = Map({
        //     mandatory: List([
        //         List([
        //             // {
        //             //     rule: new Rules.IsSingleElementDimension(1).and(new Rules.IsMultiElementDimension(0)),
        //             //     score: 3,
        //             //     selectedDim: dc => dc.dimensions.first(),
        //             //     fixedDims: dc => List()
        //             // },
        //             // {
        //             //     rule: new Rules.IsSingleElementDimension(0).and(new Rules.IsMultiElementDimension(1)),
        //             //     score: 1,
        //             //     selectedDim: dc => dc.dimensions.first(),
        //             //     fixedDims: dc => List()
        //             // },
        //             {
        //                 rule: new Rules.IsSingleElementDimension(1).and(new Rules.IsMultiElementDimension(1)),
        //                 score: 1,
        //                 selectedDim: dc => dc.dimensions.find(dim => dc.getDimensionElements(dim).size > 1),
        //                 fixedDims: dc => dc.dimensions.filter(dim => dc.getDimensionElements(dim).size === 1)
        //             },
        //             // {
        //             //     rule: new Rules.IsSingleElementDimension('?')
        // .and(new Rules.IsMultiElementDimension('>1')),
        //             //     score: 0,
        //             // },
        //         ]),
        //         List([
        //             {
        //                 rule: new Rules.InObservationsRange(1, 9),
        //                 score: 1
        //             }
        //         ])
        //     ]),
        //     optional: List([
        //         List([
        //             {
        //                 rule: new Rules.IsContainingObservations(1),
        //                 score: 1
        //             }
        //         ])
        //     ])
        // });
        //
        // const satisfiedPieRules = pieChartRules.map(
        //     rulesSets => rulesSets.map(ruleSet => ruleSet.find(r => r.rule.isSatisfiedBy(dataCube)))
        // );
        // if (isAccepted(satisfiedPieRules)) {
        //     console.log('Satisfied PieChart (BarChart) rules: ');
        //     logRules(satisfiedPieRules);
        //
        //     const s = satisfiedPieRules.get('mandatory').first().selectedDim(dataCube);
        //     const f = satisfiedPieRules.get('mandatory').first().fixedDims(dataCube);
        //     visuals = visuals.withMutations(v => {
        //         v.push(Map({selectedDim: s, fixedDims: f}).merge({rank: 2, name: 'pieChart'}));
        //         v.push(Map({selectedDim: s, fixedDims: f}).merge({rank: 2, name: 'barChart'}));
        //     });
        // } else {
        //     console.log('UNSATISFIED PieChart (BarChart) rules: ');
        //     logUnSatisfiedRules(satisfiedPieRules, pieChartRules);
        // }
        return Immutable.Map({complex: 'comparison', visuals});
    }
};

const maxNumber = {
    name: 'maxNumber',

    eval(dataCube) {
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

export function determineVisuals(context, dataCube) {

    const test = Contexts.first();
    const result = test.get('complexes').map(c => c.get('eval')(dataCube));

    console.log('\nCubeViz: ');
    if (!result.some(res => res.get('visuals').size > 0))
        console.log('No rule could be satisfied. No visuals determined.');
    else
        console.log(result.toJS());
    console.log('\n');
    return result;
}
export function displayChart(visual, dataCube) {
    if (visual)
        return convert(visual, dataCube);
}

export function displayConfigureDimensions(dataCube) {
    return dataCube.assignedDimEls.map((dimEls, dimUri) => {
        const dim = dataCube.getDimensionFromUri(dimUri);
        return Map({dim, dimEls});
    }).toList();
}
