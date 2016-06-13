/*eslint func-style: [2, "declaration"]*/
/*eslint max-params: 0*/
/*eslint no-debugger:0*/
/*eslint no-unused-vars: 0*/

//TODO rewrite in ES6

import {SpecificationSync as Specification} from 'specification';
import _ from 'underscore';
import Immutable from 'immutable';

import {keep} from '../Util.js';
import DataCube from '../DataCube.js';

function dimElementCount(dim, obs) {

    const dimEls = obs.map(o => DataCube.getDimensionElementUri(dim, o).first()); //TODO is always array?
    return dimEls.countBy(dimEl => DataCube.getUri(dimEl));
}

function dimensionsConstraint(dimElSizeConstraint, dimCountConstraint, dc) {
    const filtered = dc.dimensions.filter(dim => {
        const dimEls = dc.getDimensionElements(dim);
        return dimElSizeConstraint(dimEls.size);
    });

    return dimCountConstraint(filtered.size);
}

export function IsSingleElementDimension(num) {
    this.num = num;
}

IsSingleElementDimension.prototype = Object.create(Specification);
IsSingleElementDimension.prototype.isSatisfiedBy = function(dc) {
    return dimensionsConstraint(dimElSize => dimElSize === 1, dimCount => dimCount === this.num, dc);
};

export function IsMultiElementDimension(num) {
    this.num = num;
}

IsMultiElementDimension.prototype = Object.create(Specification);
IsMultiElementDimension.prototype.isSatisfiedBy = function(dc) {
    return dimensionsConstraint(dimElSize => dimElSize > 1, dimCount => dimCount === this.num, dc);
};

export function IsMultiElementDimensionBiggerThan(num) {
    this.num = num;
}

IsMultiElementDimensionBiggerThan.prototype = Object.create(Specification);
IsMultiElementDimensionBiggerThan.prototype.isSatisfiedBy = function(dc) {
    return dimensionsConstraint(dimElSize => dimElSize > 1, dimCount => this.num > dimCount, dc);
};

export function InObservationsRange(a, b) {
    this.a = a;
    this.b = b;
}

InObservationsRange.prototype = Object.create(Specification);
InObservationsRange.prototype.isSatisfiedBy = function(dc) {
    return (dc.observations.size >= this.a && dc.observations.size <= this.b);
};

export function IsEvenlyDistributed() {
}

IsEvenlyDistributed.prototype = Object.create(Specification);
IsEvenlyDistributed.prototype.isSatisfiedBy = function(dc) {

    const isEvenlyDistributed = dc.dimensions
        .map(dim => {
            const counts = dimElementCount(dim, dc.observations);
            const isUniq = _.uniq(_.values(counts.toJS())).length === 1; //TODO implement in Immutable js
            return isUniq;
        })
        .every(u => u);
    return isEvenlyDistributed;
};

export function IsContainingObservations(min) {
    this.min = min;
}

IsContainingObservations.prototype = Object.create(Specification);
IsContainingObservations.prototype.isSatisfiedBy = function(dc) {

    return dc.getAllDimensionElements().every(dimEl => {
        const obs = dc.getObservations(dimEl);
        return obs.size >= this.min;
    });
};
