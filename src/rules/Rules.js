/*eslint func-style: [2, "declaration"]*/
import {SpecificationSync as Specification} from 'specification';
import _ from 'underscore';

export function IsEqual(num) {
    this.num = num;
}

// function GreaterThan(num) {
//     this.num = num;
// }

export function InRange(a, b) {
    this.a = a;
    this.b = b;
}

function dimElementCount(dim, obs) {
    return _.countBy(obs, o => { return o[dim]; });
}

export function PiaChartRule(dataCube) {

    const counts = _.chain(dataCube.dimensions)
        .map(dim => {
            return {[dim]: _.keys(dimElementCount(dim, dataCube.obs)).length};
        })
        .reduce((obj, c) => { return _.extend(obj, c); }, {})
        .value();

    const max = _.max(counts);
    const isOnlyMax = _.countBy(counts)[max] === 1;
    const isValid = _.chain(counts)
        .filter(c => { return c < max; })
        .every(c => { return c === 1; })
        .value();

    if (isOnlyMax && isValid) {
        const selectedDim = _.findKey(counts, value => { return value === max; });
        const fixedDims = _.filter(dataCube.dimensions, dim => { return dim !== selectedDim; });

        return [true, {selectedDim, fixedDims}];
    }

    return [false];
}
// // Make it a subclass of SpecificationSync base class.
// GreaterThan.prototype = Object.create(Specification);
// // Implement the 'isSatisfiedBy' method.
// GreaterThan.prototype.isSatisfiedBy = function(n) {
//     return (n > this.num);
// };

IsEqual.prototype = Object.create(Specification);
IsEqual.prototype.isSatisfiedBy = function(n) {
    return (n === this.num);
};

InRange.prototype = Object.create(Specification);
InRange.prototype.isSatisfiedBy = function(n) {
    return (n >= this.a && n <= this.b);
};
