/*eslint func-style: [2, "declaration"]*/
/*eslint complexity: [2, 4]*/
/*eslint no-debugger:0*/
/*eslint no-unused-vars: 0*/
/*eslint no-console: 0*/
/*eslint max-statements: 0*/

import Immutable, {List, Map} from 'immutable';

import HeatmapRule from './rules/HeatmapRule.js';
import PieChartRule from './rules/PieChartRule.js';
import ColumnChartRule from './rules/ColumnChartRule.js';
import GroupedColumnChartRule from './rules/GroupedColumnChartRule.js';
import StackedGroupedColumnChartRule from './rules/StackedGroupedColumnChartRule.js';
import DataCube from './DataCube.js';

const comparison = {
    name: 'comparison',
    eval(dataCube) {
        const rules = List([
            new PieChartRule(),
            new HeatmapRule(),
            new ColumnChartRule(),
            new GroupedColumnChartRule(),
            new StackedGroupedColumnChartRule()
        ]);

        const charts = rules.map(rule => {

            return Map({
                complex: 'comparison',
                name: rule.getName(),
                score: rule.getScore(dataCube),
                isSatisfied: rule.isSatisfiedBy(dataCube),
                singleElementDimensions: rule.getSingleElementDimensions(dataCube),
                multiElementDimensions: rule.getMultiElementDimensions(dataCube),
                satisfied: rule.getSatisfiedRules(dataCube).map(r => r.spec).toJS(),
                notSatisfied: rule.getNotsatisfiedRules(dataCube).map(r => r.spec).toJS()
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

function containsDimEl(dimEl, dimEls) {
    return dimEls.find(dEl => dEl.get('@id') === dimEl.get('@id')) !== undefined;
}

// Discards every observation points not in dimensionElement selecion
function selectObservations(dimensionsElements, measure, attribute, attrEl, dataCube) {
    return dataCube.observations
        .filter(o => dimensionsElements.every((dimEls, dimUri) => {
            return dimEls.some(dimEl => {
                const dim = dataCube.getComponentFromUri(dataCube.dimensions, dimUri);
                const dimensionEls = dataCube.getDimensionElementsFromObservation(o, List([dim]));

                return containsDimEl(dimEl, dimensionEls);
            });
        }))
        .filter(o => {
            const measureEls = dataCube.getMeasureElementsFromObservation(o, List([measure]));
            if (measureEls
                && measureEls.size > 0
                && measureEls.every(m => m !== undefined))
                return true;
            return false;
        })
        .filter(o => {
            if (!attribute)
                return true;

            const attributeEls = dataCube.getAttributeElementsFromObservation(o, List([attribute]));
            if (attributeEls.size === 0)
                return false;

            return attributeEls.find(aEl => aEl.get('@id') === attrEl.get('@id'));
        });
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

function fillDimensions(dimensions, selectedDimElements, dc) {

    const missingDimensions = dc.dimensions.filter(dim => {
        return dimensions.find(d => DataCube.getUri(d) === DataCube.getUri(dim)) === undefined;
    });

    const missingDimEls = missingDimensions
        .flatMap(dim => dc.getDimensionElements(dim));
        // .filter(dimEl => dc.getObservationsContainingDimEls(List([dimEl])).size > 0);

    const filledDimensions = dimensions.concat(missingDimensions);
    const filledDimEls = selectedDimElements.concat(missingDimEls);

    // const dimensionsMap = dc.assignDimEls(filledDimEls, filledDimensions);
    // console.log(JSON.stringify(dimensionsMap.toJS()));

    // dimensionsMap
    //     .filter((dimEls, dimUri) => {})
    //     .filter(o => dimensionsElements.every((dimEls, dimUri) => {
    //         return dimEls.some(dimEl => {
    //             const dim = dataCube.getComponentFromUri(dataCube.dimensions, dimUri);
    //             const dimensionEls = dataCube.getDimensionElementsFromObservation(o, List([dim]));
    //
    //             return containsDimEl(dimEl, dimensionEls);
    //         });
    //     }))

    return {filledDimensions, filledDimEls};
}

export function createDataCube(selectedMeasure, selectedAttrElement, selectedDimElements, dataCube) {

    const attribute = dataCube.getAttribute(selectedAttrElement);

    let dimensionElements = selectedDimElements;
    let dimensions = selectDimensions(dimensionElements, dataCube);

    if (dimensions.size < dataCube.dimensions.size) {
        const {filledDimensions, filledDimEls} = fillDimensions(dimensions, dimensionElements, dataCube);
        dimensions = filledDimensions;
        dimensionElements = filledDimEls;
    }

    const dimensionsMap = dataCube.assignDimEls(dimensionElements, dimensions);
    const observations = selectObservations(dimensionsMap, selectedMeasure, attribute, selectedAttrElement, dataCube);

    const dc = dataCube.createDataCube(dimensionElements, dimensions, observations);
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
            //TODO implement replacement with higher scored duplicant rules
            return res.push(chartlist)
                .flatten(1)
                .sortBy(chrt => chrt.get('score'))
                .reverse();
        }, List());
    return charts;
}
