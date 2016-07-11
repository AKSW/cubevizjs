/*eslint func-style: [2, "declaration"]*/
/*eslint no-debugger:0*/
/*eslint no-unused-vars: 0*/

import Immutable, {List, Map} from 'immutable';

import Rule from './Rule.js';
import {SingleElementDimensionSpec, MultiElementDimensionSpec, ObservationsRangeSpec} from '../spec/BasicSpecs.js';
import ContainingObservationsSpec from '../spec/ContainingObservationsSpec.js';

export default class HeatmapRule extends Rule {

    constructor() {
        super(
            Map({
                mandatory: List([
                    List([
                        // {
                        //     rule: new Rules.IsSingleElementDimension(1).and(new Rules.IsMultiElementDimension(0)),
                        //     score: 3,
                        // },
                        {
                            spec: new SingleElementDimensionSpec(2).and(new MultiElementDimensionSpec(0)),
                            score: 3,
                            selectedDim: dc => Map(),
                            fixedDims: dc => dc.dimensions
                        },
                        // {
                        //     rule: new Rules.IsMultiElementDimension(1),
                        //     score: 2,
                        // },
                        {
                            spec: new MultiElementDimensionSpec(2),
                            score: 1,
                            selectedDim: dc => Map(),
                            fixedDims: dc => dc.dimensions
                        }
                    ]),
                    // List([
                    //     {
                    //         rule: new Rules.IsEvenlyDistributed(),
                    //         score: 1
                    //     }
                    // ]),
                    List([
                        {
                            spec: new ObservationsRangeSpec(1, 9),
                            score: 1
                        },
                        {
                            spec: new ObservationsRangeSpec(10, 15),
                            score: 2
                        },
                        {
                            spec: new ObservationsRangeSpec(16, 30),
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
}
