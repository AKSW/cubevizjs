import chai, {assert} from 'chai';
import _ from 'underscore';

import DataCube from '../src/DataCube.js'

describe('Basic data cube tests', function() {

    it('should create an empty data cube', function() {
        const dc = DataCube.empty();

        assert.isNotNull(dc);
        assert.property(dc, 'defaultLanguage');
        assert.property(dc, 'dataset');
        assert.property(dc, 'dataStructureDefinition');
        assert.property(dc, 'defaultMeasureProperty');
        assert.property(dc, 'dimensions');
        assert.property(dc, 'assignedDimEls');
        assert.property(dc, 'observations');

        assert.isTrue(dc.defaultLanguage === '');
        assert.isTrue(_.isEmpty(dc.dataset.toJS()));
        assert.isTrue(_.isEmpty(dc.dataStructureDefinition.toJS()));
        assert.isTrue(_.isEmpty(dc.defaultMeasureProperty.toJS()));
        assert.isTrue(_.isEmpty(dc.dimensions.toJS()));
        assert.isTrue(_.isEmpty(dc.assignedDimEls.toJS()));
        assert.isTrue(_.isEmpty(dc.observations.toJS()));
    });
});
