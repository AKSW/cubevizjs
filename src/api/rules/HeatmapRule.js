/*eslint func-style: [2, "declaration"]*/
/*eslint no-debugger:0*/
/*eslint no-unused-vars: 0*/

import Immutable, {List, Map} from 'immutable';

import Rule from './Rule.js';
import {SingleElementDimensionSpec, MultiElementDimensionSpec, ObservationsRangeSpec} from '../spec/BasicSpecs.js';
import ContainingObservationsSpec from '../spec/ContainingObservationsSpec.js';
import EvenlyDistributedSpec from '../spec/EvenlyDistributedSpec.js';

export default class HeatmapRule extends Rule {

    constructor() {
        super(
            Map({
                mandatory: List([
                    List([
                        {
                            spec: new SingleElementDimensionSpec(2).and(new MultiElementDimensionSpec(0)),
                            score: 1,
                            singleElementDimensions: new SingleElementDimensionSpec(),
                            multiElementDimensions: new MultiElementDimensionSpec()
                        },
                        {
                            spec: new SingleElementDimensionSpec(1).and(new MultiElementDimensionSpec(1)),
                            score: 2,
                            singleElementDimensions: new SingleElementDimensionSpec(),
                            multiElementDimensions: new MultiElementDimensionSpec()
                        },
                        {
                            spec: new MultiElementDimensionSpec(2),
                            score: 3,
                            singleElementDimensions: new SingleElementDimensionSpec(),
                            multiElementDimensions: new MultiElementDimensionSpec()
                        }
                    ]),
                    List([
                        {
                            spec: new ObservationsRangeSpec(1, 9),
                            score: 3
                        },
                        {
                            spec: new ObservationsRangeSpec(10, 15),
                            score: 2
                        },
                        {
                            spec: new ObservationsRangeSpec(16, 30),
                            score: 1
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
        return 'cvHeatmap';
    }
}
