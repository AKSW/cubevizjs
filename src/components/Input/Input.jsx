/*eslint no-debugger: 0*/

import Immutable from 'immutable';

const Result = Immutable.fromJS({
    dimensions: [
        {
            cvUri: 'http://dim/1',
            cvNiceLabel: 'country',
            dimensionElements: [
                {
                    cvUri: 'http://dim/1/element/1',
                    cvAccordingDimension: 'http://dim/1',
                    cvNiceLabel: 'germany'
                },
                {
                    cvUri: 'http://dim/1/element/2',
                    cvAccordingDimension: 'http://dim/1',
                    cvNiceLabel: 'england'
                }
            ]
        },
        {
            cvUri: 'http://dim/2',
            cvNiceLabel: 'year',
            dimensionElements: [
                {
                    cvUri: 'http://dim/2/element/1',
                    cvAccordingDimension: 'http://dim/2',
                    cvNiceLabel: '2001'
                },
                {
                    cvUri: 'http://dim/2/element/2',
                    cvAccordingDimension: 'http://dim/2',
                    cvNiceLabel: '2002'
                }
            ]
        },
    ],
    measures: [
        {
            cvUri: 'http://measure/1',
            cvNiceLabel: 'number of deaths'
        },
        {
            cvUri: 'http://measure/2',
            cvNiceLabel: 'number of births'
        }
    ],
    obs: [
        {
            cvDimensions: [
                {
                    cvUri: 'http://dim/2/element/1',
                    cvAccordingDimension: 'http://dim/2',
                    cvNiceLabel: '2001'
                },
                {
                    cvUri: 'http://dim/1/element/2',
                    cvAccordingDimension: 'http://dim/1',
                    cvNiceLabel: 'england'
                }
            ],
            cvMeasures: [
                {
                    cvAccordingMeasurement: 'http://measure/1',
                    cvValue: '80000'
                },
                {
                    cvAccordingMeasurement: 'http://measure/2',
                    cvValue: '30000'
                }
            ]
        },
        {
            cvDimensions: [
                {
                    cvUri: 'http://dim/2/element/2',
                    cvAccordingDimension: 'http://dim/2',
                    cvNiceLabel: '2002'
                },
                {
                    cvUri: 'http://dim/1/element/2',
                    cvAccordingDimension: 'http://dim/1',
                    cvNiceLabel: 'england'
                }
            ],
            cvMeasures: [
                {
                    cvAccordingMeasurement: 'http://measure/1',
                    cvValue: '80000'
                },
                {
                    cvAccordingMeasurement: 'http://measure/2',
                    cvValue: '30000'
                }
            ]
        },
        {
            cvDimensions: [
                {
                    cvUri: 'http://dim/2/element/1',
                    cvAccordingDimension: 'http://dim/2',
                    cvNiceLabel: '2001'
                },
                {
                    cvUri: 'http://dim/1/element/1',
                    cvAccordingDimension: 'http://dim/1',
                    cvNiceLabel: 'deutschland'
                }
            ],
            cvMeasures: [
                {
                    cvAccordingMeasurement: 'http://measure/1',
                    cvValue: '10000'
                },
                //
                // Lücken mit leerwerten füllen ?
                //
            ]
        },
    ]
});

export default Result;
