/*eslint func-style: [2, "declaration"]*/
/*eslint no-debugger:0*/
/*eslint no-unused-vars: 0*/

import {CompositeSpecification} from 'ts-specification';

export class SingleElementDimensionSpec extends CompositeSpecification {

    constructor(num) {
        super();
        this.num = num;
    }

    constraint() {
        return dimElSize => dimElSize === 1;
    }
    /**
     * dimensionsConstraint - Applies the contstraint dimElSizeConstraint
     * to all dimension elements from every dimension in the data cube.
     *
     * @param  {boolean} dimElSizeConstraint Constraint function to validate the dimension elements size.
     * @param  {DataCube} dc Data cube
     * @return {Immutable.List} List of dimensions which have satisfied the dimElSizeConstraint.
     */
    dimensionsConstraint(dimElSizeConstraint, dc) {
        const filtered = dc.dimensions.filter(dim => {
            const dimEls = dc.getDimensionElements(dim);
            return dimElSizeConstraint(dimEls.size);
        });

        return filtered;
    }

    /**
     * isSatisfiedBy - Satisfies if the number of dimensions is equal to this.num
     * and the size of dimension elements from every dimension is equal to one.
     *
     * @param  {type} dc description
     * @return {type}    description
     */
    isSatisfiedBy(dc) {
        const dims = this.dimensionsConstraint(this.constraint(), dc);
        return dims.size === this.num;
    }

    toString() {
        return 'single element dimension (' + this.num + ')';
    }
}
export class MultiElementDimensionSpec extends SingleElementDimensionSpec {

    constructor(num) {
        super();
        this.num = num;
    }

    constraint() {
        return dimElSize => dimElSize > 1;
    }

    /**
     * isSatisfiedBy - Satisfies if the number of dimensions is smaller than this.num
     * and the size of dimension elements from every dimension is bigger than one.
     *
     * @param  {type} dc description
     * @return {type}    description
     */
    isSatisfiedBy(dc) {
        const dims = this.dimensionsConstraint(this.constraint(), dc);
        return dims.size === this.num;
    }

    toString() {
        return 'multi element dimension (' + this.num + ')';
    }
}

export class ObservationsRangeSpec extends CompositeSpecification {

    constructor(a, b) {
        super();
        this.a = a;
        this.b = b;
    }

    /**
     * isSatisfiedBy - Satisfies if the number of observation points lies between this.a and this.b.
     *
     * @param  {type} dc description
     * @return {type}    description
     */
    isSatisfiedBy(dc) {
        return (dc.observations.size >= this.a && dc.observations.size <= this.b);
    }

    toString() {
        return 'observation range (' + this.a + ', ' + this.b + ')';
    }
}

export class ProcessingSpec extends CompositeSpecification {

    process(dc) {
        throw new Error('Do not call function from ProcessingSpec base class');
    }

    isSatisfiedBy(dc) {
        throw new Error('Do not call function from ProcessingSpec base class');
    }
}
