/*eslint func-style: [2, "declaration"]*/
/*eslint no-debugger:0*/
/*eslint no-unused-vars: 0*/

import {CompositeSpecification} from 'ts-specification';

export class SingleElementDimensionSpec extends CompositeSpecification {

    constructor(num) {
        super();
        this.num = num;
    }

    /**
     * dimensionsConstraint - Applies the contstrains dimElSizeConstraint and dimCountConstraint
     * to all dimension elements from every dimension in the data cube.
     *
     * @param  {boolean} dimElSizeConstraint Constrain to valid the dimension elements size.
     * @param  {boolean} dimCountConstraint  Constrain to valid the dimensions size.
     * @param  {DataCube} dc                  description
     * @return {boolean}                     description
     */
    dimensionsConstraint(dimElSizeConstraint, dimCountConstraint, dc) {
        const filtered = dc.dimensions.filter(dim => {
            const dimEls = dc.getDimensionElements(dim);
            return dimElSizeConstraint(dimEls.size);
        });

        return dimCountConstraint(filtered.size);
    }

    /**
     * isSatisfiedBy - Satisfies if the number of dimensions is equal to this.num
     * and the size of dimension elements from every dimension is equal to one.
     *
     * @param  {type} dc description
     * @return {type}    description
     */
    isSatisfiedBy(dc) {
        return this.dimensionsConstraint(dimElSize => dimElSize === 1, dimCount => dimCount === this.num, dc);
    }
}
export class MultiElementDimensionSpec extends SingleElementDimensionSpec {

    constructor(num) {
        super();
        this.num = num;
    }

    /**
     * isSatisfiedBy - Satisfies if the number of dimensions is smaller than this.num
     * and the size of dimension elements from every dimension is bigger than one.
     *
     * @param  {type} dc description
     * @return {type}    description
     */
    isSatisfiedBy(dc) {
        return this.dimensionsConstraint(dimElSize => dimElSize > 1, dimCount => dimCount === this.num, dc);
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
}

export class ProcessingSpec extends CompositeSpecification {

    process(dc) {
        throw new Error('Do not call function from ProcessingSpec base class');
    }

    isSatisfiedBy(dc) {
        throw new Error('Do not call function from ProcessingSpec base class');
    }
}
