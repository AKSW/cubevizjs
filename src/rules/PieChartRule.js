/*eslint func-style: [2, "declaration"]*/
/*eslint no-debugger:0*/
/*eslint no-unused-vars: 0*/

import Immutable, {List, Map} from 'immutable';

import Rule from './Rule.js';
import {SingleElementDimensionSpec, MultiElementDimensionSpec, ObservationsRangeSpec} from '../spec/BasicSpecs.js';
import ContainingObservationsSpec from '../spec/ContainingObservationsSpec.js';
import EvenlyDistributedSpec from '../spec/EvenlyDistributedSpec.js';

export default class PieChartRule extends Rule {
    constructor() {
        super(
            Map({
                mandatory: List([
                    List([
                        {
                            spec: new SingleElementDimensionSpec(1).and(new MultiElementDimensionSpec(0)),
                            score: 1,
                            selectedDim: dc => dc.dimensions.first(),
                            fixedDims: dc => List()
                        },
                        {
                            spec: new SingleElementDimensionSpec(0).and(new MultiElementDimensionSpec(1)),
                            score: 3,
                            selectedDim: dc => dc.dimensions.first(),
                            fixedDims: dc => List()
                        },
                        {
                            spec: new SingleElementDimensionSpec(1).and(new MultiElementDimensionSpec(1)),
                            score: 3,
                            selectedDim: dc => dc.dimensions.find(dim => dc.getDimensionElements(dim).size > 1),
                            fixedDims: dc => dc.dimensions.filter(dim => dc.getDimensionElements(dim).size === 1)
                        }
                    ]),
                    List([
                        {
                            spec: new ObservationsRangeSpec(1, 9),
                            score: 3
                        },
                        {
                            spec: new ObservationsRangeSpec(10, 100),
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
        return 'cvPieChart';
    }
}
