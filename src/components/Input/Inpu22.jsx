const Result = {
    attributes: [
        {
            "__cv_uri": "http://attribute/1",
            "__cv_niceLabel": "in thousand"
        }
    ],
    measures: [
        {
            "__cv_uri": "http://measure/1",
            "__cv_niceLabel": "number of deaths"
        },
        {
            "__cv_uri": "http://measure/2",
            "__cv_niceLabel": "number of births"
        }
    ],
    dimensions: [
        {
            __cv_uri: "http://dim/1",
            dimensionElements: [
                {
                    "__cv_uri": "http://dim/1/element/1",
                    "__cv_niceLabel": "germany"
                },
                {
                    "__cv_uri": "http://dim/1/element/2",
                    "__cv_niceLabel": "england"
                }
            ]
        },
        {
            __cv_uri: "http://dim/2",
            dimensionElements: [
                {
                    "__cv_uri": "http://dim/2/element/1",
                    "__cv_niceLabel": "2001"
                }
            ]
        },
    ]
    obs: [
        {
            __cv_dimensions: [
                {
                    "__cv_uri": "http://dim/2/element/1",
                    __cv_accordingDimension: "http://dim/2",
                    "__cv_niceLabel": "2001"
                },
                {
                    "__cv_uri": "http://dim/1/element/2",
                    __cv_accordingDimension: "http://dim/1",
                    "__cv_niceLabel": "england"
                }
            ],
            __cv_measures: [
                {
                    "__cv_accordingMeasurement": "http://measure/1",
                    "__cv_value": "80.000"
                },
                {
                    "__cv_accordingMeasurement": "http://measure/2",
                    "__cv_value": "30.000"
                }
            ],
            __cv_attributes: [
                {
                    "__cv_accordingAttribte": "http://attribute/1"
                }
            ],
        },
        {
            __cv_dimensions: [
                {
                    "__cv_uri": "http://dim/2/element/1",
                    __cv_accordingDimension: "http://dim/2",
                    "__cv_niceLabel": "2001"
                },
                {
                    "__cv_uri": "http://dim/1/element/2",
                    __cv_accordingDimension: "http://dim/1",
                    "__cv_niceLabel": "deutschland"
                }
            ],
            __cv_measures: [
                {
                    "__cv_accordingMeasurement": "http://measure/1",
                    "__cv_value": "10.000"
                },
                //
                // Lücken mit leerwerten füllen
                //
            ],
            __cv_attributes: [
            ],
        },
    ]
};

export default Result;
