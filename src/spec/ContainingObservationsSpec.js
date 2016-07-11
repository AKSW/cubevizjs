/*eslint func-style: [2, "declaration"]*/
/*eslint no-debugger:0*/
/*eslint no-unused-vars: 0*/

import Immutable, {List, Map} from 'immutable';

import {CompositeSpecification} from 'ts-specification';
import {ProcessingSpec} from './BasicSpecs.js';
import DataCube from '../DataCube.js';

export default class ContainingObservationsSpec extends ProcessingSpec {
    constructor(min) {
        super();
        this.min = min;
        this.invalidDimEls = List();
        this.isSatisfied = false;
    }

    process(dc) {
        if (this.isSatisfied) return dc;
        //FIXME only works for 2 dims
        const nullObservations = this.invalidDimEls.flatMap(dimEl => {
            const dim = dc.getDimension(dimEl);
            const dimsToExtend = dc.dimensions.filter(d => d.get('@id') !== dim.get('@id'));
            const dimElsToExtend = dimsToExtend.flatMap(d => dc.getDimensionElements(d));
            const obs = dimElsToExtend.map(dEl => {
                return Immutable.fromJS({
                    '@id': 'http://cubeviz.org/null/observation/'
                        + dimEl.get('@id').split('/').pop() + '/' + dEl.get('@id').split('/').pop(),
                    '@type': ['http://purl.org/linked-data/cube#Observation'],
                    [dim.get('@id')]: [{'@id': dimEl.get('@id')}],
                    [dc.getDimension(dEl).get('@id')]: [{'@id': dEl.get('@id')}],
                    [dc.defaultMeasureProperty.get('@id')]: [{'@value': '0.0'}]
                });
            });
            return obs;
        });
        dc.observations = dc.observations.concat(nullObservations);
        return dc;
    }

    isSatisfiedBy(dc) {

        this.invalidDimEls = dc.getAllDimensionElements().filter(dimEl => {
            const obs = dc.getObservations(dimEl);
            return obs.size < this.min;
        });

        this.isSatisfied = this.invalidDimEls.size === 0;
        return this.isSatisfied;
    }
}
