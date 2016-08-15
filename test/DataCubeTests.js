import chai, {assert} from 'chai';
import _ from 'underscore';
import {fromJS} from 'immutable';

import DataCube from '../src/api/DataCube.js'

const defaultAttributes =
[
    {
        "@id": "http://example.cubeviz.org/compare/populationEurope/unit",
        "@type": [
            "http://purl.org/linked-data/cube#AttributeProperty"
        ],
        "http://www.w3.org/2000/01/rdf-schema#label": [
            {
                "@value": "population count"
            }
        ]
    }
];

describe('Basic data cube tests', function() {

    it('should create an empty data cube', function() {
        const dc = DataCube.empty();

        assert.isNotNull(dc);
        assert.property(dc, 'defaultLanguage');
        assert.property(dc, 'dataset');
        assert.property(dc, 'dataStructureDefinition');
        assert.property(dc, 'measures');
        assert.property(dc, 'dimensions');
        assert.property(dc, 'attributes');
        assert.property(dc, 'attributesElements');
        assert.property(dc, 'assignedDimEls');
        assert.property(dc, 'observations');

        assert.isTrue(dc.defaultLanguage === '');
        assert.isTrue(_.isEmpty(dc.dataset.toJS()));
        assert.isTrue(_.isEmpty(dc.dataStructureDefinition.toJS()));
        assert.isTrue(_.isEmpty(dc.measures.toJS()));
        assert.isTrue(_.isEmpty(dc.dimensions.toJS()));
        assert.isTrue(_.isEmpty(dc.attributes.toJS()));
        assert.isTrue(_.isEmpty(dc.attributesElements.toJS()));
        assert.isTrue(_.isEmpty(dc.assignedDimEls.toJS()));
        assert.isTrue(_.isEmpty(dc.observations.toJS()));
    });

});
