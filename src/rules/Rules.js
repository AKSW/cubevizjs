/*eslint func-style: [2, "declaration"]*/
/*eslint max-params: 0*/
/*eslint no-debugger:0*/
/*eslint no-unused-vars: 0*/

//TODO rewrite in ES6

import {SpecificationSync as Specification} from 'specification';
import _ from 'underscore';
import Immutable from 'immutable';
import {keep} from '../Util.js';

function dimElsFromObsForDim(dim, obs) {
    return obs.reduce((list, o) => {
        const dimEls = keep(o.get('cvDimensionElements'), el => {
            if (el.get('cvAccordingDimension') === dim.get('cvUri')) {
                return el;
            }
        });
        return list.push(dimEls);
    }, Immutable.List()).flatten(true);
}

function dimElementCount(dim, obs) {
    const dimEls = dimElsFromObsForDim(dim, obs);
    return dimEls.countBy(dimEl => dimEl.get('cvUri'));
}

export function IsEqual(num) {
    this.num = num;
}

IsEqual.prototype = Object.create(Specification);
IsEqual.prototype.isSatisfiedBy = function(n) {
    return (n === this.num);
};

// function GreaterThan(num) {
//     this.num = num;
// }

export function InRange(a, b) {
    this.a = a;
    this.b = b;
}

InRange.prototype = Object.create(Specification);
InRange.prototype.isSatisfiedBy = function(n) {
    return (n >= this.a && n <= this.b);
};

function IsEvenlyDistributed() {
}

IsEvenlyDistributed.prototype = Object.create(Specification);
IsEvenlyDistributed.prototype.isSatisfiedBy = function(dataCube) {

    const isEvenlyDistributed = dataCube.get('dimensions')
    .map(dim => {
        const counts = dimElementCount(dim, dataCube.get('obs'));
        const isUniq = _.uniq(_.values(counts.toJS())).length === 1; //TODO implement in Immutable js
        return isUniq;
    })
    .every(u => u);
    return isEvenlyDistributed;
};

// a: interval start
// b: interval end
// e: dim equal
export function HeatmapRule(a, b, e) {
    this.a = a;
    this.b = b;
    this.e = e;
}

HeatmapRule.prototype = Object.create(Specification);
HeatmapRule.prototype.isSatisfiedBy = function(dataCube) {
    const inHeatmapRange = new InRange(this.a, this.b); //type Obs
    const isEqualHeatmapDim = new IsEqual(this.e); //type Dim
    const isEvenlyDistributed = new IsEvenlyDistributed();

  // das ist eine regel
    if (inHeatmapRange.isSatisfiedBy(dataCube.get('obs').size) &&
        isEqualHeatmapDim.isSatisfiedBy(dataCube.get('dimensions').size) &&
        isEvenlyDistributed.isSatisfiedBy(dataCube)) {
        return Immutable.fromJS([true, {fixedDims: dataCube.get('dimensions')}]);
    }

    return Immutable.List([false]);
};

export function SelectedDimensionRule(a, b) {
    this.a = a;
    this.b = b;
}

// jedes DimensionsElement auf 1 nur eine Dimension darf mehrere Elemente haben
// und Obs. Punkte 5 - 10
//TODO consider dimension element count, because ratio matters
SelectedDimensionRule.prototype = Object.create(Specification);
SelectedDimensionRule.prototype.isSatisfiedBy = function(dataCube) {

    const counts = dataCube.get('dimensions')
        .map(dim => Immutable.Map({
            // counts dimEl and maps them to dim
            [dim.get('cvUri')]: dimElementCount(dim, dataCube.get('obs')).keySeq().size
        }))
        // reduces to single object from list
        .reduce((map, c) => map.merge(c), Immutable.Map());

    const max = counts.max();
    const isOnlyMax = counts.valueSeq().count(c => c === max) === 1;
    const isValid = counts
        .filter(c => c < max)
        .every(c => c === 1);


    const inRange = new InRange(this.a, this.b);

    if (isOnlyMax && isValid && inRange.isSatisfiedBy(dataCube.get('obs').size)) {
        const selectedDimUri = counts.findKey(value => value === max);

        const selectedDim = dataCube.get('dimensions').find(dim => dim.get('cvUri') === selectedDimUri);
        const fixedDims = dataCube.get('dimensions').filter(dim => dim.get('cvUri') !== selectedDimUri);

        return Immutable.fromJS([true, {selectedDim, fixedDims}]);
    }

    return Immutable.List([false]);
};

// n: valid observation count
export function GroupedStackedBarRule(n) {
    this.n = n;
}
GroupedStackedBarRule.prototype = Object.create(Specification);
GroupedStackedBarRule.prototype.isSatisfiedBy = function(dataCube) {

    //TODO: dimensionelemente müssen gleich sein

    const inRange = new InRange(1, this.n);
    const isValid = dataCube.dimensions.length === 2;

    if (isValid && inRange.isSatisfiedBy(dataCube.obs.length)) {
        const selectedDim = dataCube.dimensions[0];
        const groupDim = dataCube.dimensions[1];

        return [true, {selectedDim, groupDim}];
    }

    return [false];
};
// // Make it a subclass of SpecificationSync base class.
// GreaterThan.prototype = Object.create(Specification);
// // Implement the 'isSatisfiedBy' method.
// GreaterThan.prototype.isSatisfiedBy = function(n) {
//     return (n > this.num);
// };
