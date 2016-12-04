import chai, {assert} from 'chai';
import chaiAsPromised from 'chai-as-promised';

import imprt, {IMPORT_TYPE_FILE_UPLOAD, IMPORT_TYPE_ENDPOINT, IMPORT_TYPE_DEFAULT} from '../src/api/import.js';
import cube from './assets/SatisfyHeatmapCube1.js'

chai.use(chaiAsPromised);


describe('Importing tests for file urls, files and endpoints', function() {

    it('should return default data cube.', function() {
        return assert.isFulfilled(imprt({importType: IMPORT_TYPE_DEFAULT}));
    });

    it('should return triples as string (endpoint is file url)', function() {
        return assert.isFulfilled(imprt({
            importType: IMPORT_TYPE_ENDPOINT,
            value: 'https://raw.githubusercontent.com/AKSW/cubeviz.ontowiki/master/assets/mortality.ttl'
        }).then(result => {
            assert.typeOf(result, 'object');
            assert.property(result, 'dataType');
            assert.strictEqual(result.dataType, 'triple');
            assert.property(result, 'value');
            assert.typeOf(result.value, 'string');
        }));
    });

    it('should not return triples as string (endpoint is not excisting file url)', function() {
        return assert.isRejected(imprt({
            importType: IMPORT_TYPE_ENDPOINT,
            value: 'https://not.excisting....mortality.ttl'
        }));
    });

    it('should return triples as string (endpoint is localhost address)', function() {
        return assert.isRejected(imprt({
            importType: IMPORT_TYPE_ENDPOINT,
            value: 'test'
        }));
    });

    it('should return an error (unknown import type)', function() {
        return assert.isRejected(imprt({
            importType: 'UNKOWN_IMPORT_TYPE',
            value: 'http://not.valid.url.ttl'
        }), /UNKOWN IMPORT TYPE ERROR/);
    });
});
