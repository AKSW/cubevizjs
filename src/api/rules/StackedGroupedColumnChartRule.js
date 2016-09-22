/*eslint func-style: [2, "declaration"]*/
/*eslint no-debugger:0*/
/*eslint no-unused-vars: 0*/

import Immutable, {List, Map} from 'immutable';

import Rule from './Rule.js';
import {SingleElementDimensionSpec, MultiElementDimensionSpec, ObservationsRangeSpec} from '../spec/BasicSpecs.js';
import ContainingObservationsSpec from '../spec/ContainingObservationsSpec.js';
import EvenlyDistributedSpec from '../spec/EvenlyDistributedSpec.js';

export default class StackedGroupedColumnChartRule extends Rule {

    constructor() {
        super(
            Map({
                mandatory: List([
                    List([
                        {
                            spec: new MultiElementDimensionSpec(3).and(new SingleElementDimensionSpec(0)),
                            score: 3,
                            singleElementDimensions: new SingleElementDimensionSpec(),
                            multiElementDimensions: new MultiElementDimensionSpec()
                        },
                        {
                            spec: new MultiElementDimensionSpec(2).and(new SingleElementDimensionSpec(1)),
                            score: 3,
                            singleElementDimensions: new SingleElementDimensionSpec(),
                            multiElementDimensions: new MultiElementDimensionSpec()
                        },
                        {
                            spec: new MultiElementDimensionSpec(1).and(new SingleElementDimensionSpec(2)),
                            score: 3,
                            singleElementDimensions: new SingleElementDimensionSpec(),
                            multiElementDimensions: new MultiElementDimensionSpec()
                        },
                        {
                            spec: new MultiElementDimensionSpec(0).and(new SingleElementDimensionSpec(3)),
                            score: 3,
                            singleElementDimensions: new SingleElementDimensionSpec(),
                            multiElementDimensions: new MultiElementDimensionSpec()
                        }
                    ]),
                    List([
                        {
                            spec: new ObservationsRangeSpec(1, 500),
                            score: 3
                        }
                    ])
                ]),
                optional: List([
                    List([
                        {
                            spec: new ContainingObservationsSpec(1),
                            score: 1
                        }
                    ])
                ])
            })
        );
    }

    getName() {
        return 'cvStackedGroupedColumnChart';
    }
}
