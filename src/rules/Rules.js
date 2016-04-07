/*eslint func-style: [2, "declaration"]*/
/*eslint max-params: 0*/
import {SpecificationSync as Specification} from 'specification';
import _ from 'underscore';

function dimElementCount(dim, obs) {
    return _.countBy(obs, o => { return o[dim]; });
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
    const isEvenlyDistributed = _.chain(dataCube.dimensions)
        .map(dim => {
            const counts = dimElementCount(dim, dataCube.obs);
            const isUniq = _.uniq(_.values(counts)).length === 1;

            return isUniq;
        }).every(u => { return u; }).value();
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
    if (inHeatmapRange.isSatisfiedBy(dataCube.obs.length) &&
        isEqualHeatmapDim.isSatisfiedBy(dataCube.dimensions.length) &&
        isEvenlyDistributed.isSatisfiedBy(dataCube)) {
        return [true, {fixedDims: dataCube.dimensions}];
    }

    return [false];
};

export function PieChartRule(a, b) {
    this.a = a;
    this.b = b;
}

// jedes DimensionsElement auf 1 nur eine Dimension darf mehrere Elemente haben
// und Obs. Punkte 5 - 10
//TODO consider dimension element count, because ratio matters
PieChartRule.prototype = Object.create(Specification);
PieChartRule.prototype.isSatisfiedBy = function(dataCube) {
    const counts =
        _.chain(dataCube.dimensions)
          .map(dim => {
              return {[dim]: _.keys(dimElementCount(dim, dataCube.obs)).length};
          })
          .reduce((obj, c) => { return _.extend(obj, c); }, {})
          .value();

    const max = _.max(counts);
    const isOnlyMax = _.countBy(counts)[max] === 1;// das ist eine regel
    const isValid = _.chain(counts)// das ist eine regel
        .filter(c => { return c < max; })
        .every(c => { return c === 1; })
        .value();

    const inPieChartRange = new InRange(this.a, this.b);

    if (isOnlyMax && isValid && inPieChartRange.isSatisfiedBy(dataCube.obs.length)) {
        const selectedDim = _.findKey(counts, value => { return value === max; });
        const fixedDims = _.filter(dataCube.dimensions, dim => { return dim !== selectedDim; });

        return [true, {selectedDim, fixedDims}];
    }

    return [false];
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
