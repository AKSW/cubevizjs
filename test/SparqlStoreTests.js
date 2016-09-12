import chai, {assert} from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

import noDatasetCube from './assets/NoDatasetCube.js';
import noDsdCube from './assets/NoDsdCube.js';
import noDimsCube from './assets/NoDimsCube.js';
import noMeasureCube from './assets/NoMeasureCube.js';
import noObservationsCube from './assets/NoObservationsCube.js';
import defaultTestCube from './assets/DefaultDataCube.js';
import measureDimCube from './assets/MeasureDimCube.js';
import SparqlStore from '../src/api/SparqlStore.js'

function assertType(expectedType, types) {
    const type = types.find(t => t === expectedType);
    assert.isFalse(type === undefined);
}

function test(store, expects, hooks, description) {
    describe(description, function() {

        let s = null;

        beforeEach(function() {
            s = store;
            return hooks.beforeEach(s);
        })

        expects.forEach(function(expected) {
            it(expected.message, function() {
                return expected.assert(s);
            });
        });
    });
}

test(new SparqlStore(null), [
        {
            assert: store => assert.isRejected(store.load()),
            message: 'should NOT load the store before create was called'
        },
        {
            assert: store => assert.isRejected(store.create().then(s => s.load())),
            message: 'should NOT create and NOT load the store'
        },
        {
            assert: store => assert.isRejected(store.create()),
            message: 'should NOT create the store'
        }
    ], { beforeEach: store => store }, 'Creation tests for null input for ' + SparqlStore.name);
test(new SparqlStore(defaultTestCube), [
        {
            assert: store => assert.isRejected(store.load()),
            message: 'should NOT load the store before create was called'
        },
        {
            assert: store => assert.isFulfilled(store.create().then(s => s.load())),
            message: 'should create and load the store'
        },
        {
            assert: store => assert.isFulfilled(store.create()),
            message: 'should create the store'
        }
    ], { beforeEach: store => store },'Creation tests for default test data cube for ' + SparqlStore.name);

test(new SparqlStore(defaultTestCube), [
    {
        assert: store => assert.isFulfilled(store.getDatasets()).then(datasets => {
            assert.typeOf(datasets, 'array');
            assert.lengthOf(datasets, 1);
            const dataset = datasets[0];
            assert.equal(dataset['@id'], 'http://example.cubeviz.org/compare/mortalityEurope/dataset');
            assert.property(dataset, '@type');
            assertType('http://purl.org/linked-data/cube#DataSet', dataset['@type']);
        }),
        message: 'should retrieve DATASET'
    },
    {
        assert: store => assert.isFulfilled(store.getDsd({'@id': 'http://example.cubeviz.org/compare/mortalityEurope/dataset' })).then(dsds => {
            assert.typeOf(dsds, 'array');
            assert.lengthOf(dsds, 1);
            const dsd = dsds[0];
            assert.equal(dsd['@id'], 'http://example.cubeviz.org/compare/mortalityEurope/dsd');
            assert.property(dsd, '@type');
            assertType('http://purl.org/linked-data/cube#DataStructureDefinition', dsd['@type']);
        }),
        message: 'should retrieve DSD'
    },
    {
        assert: store => assert.isFulfilled(store.getCs({'@id': 'http://example.cubeviz.org/compare/mortalityEurope/dsd'})).then(css => {
            assert.typeOf(css, 'array');
            assert.lengthOf(css, 4);
            css.forEach(cs => assertType('http://purl.org/linked-data/cube#ComponentSpecification', cs['@type']));
        }),
        message: 'should retrieve CSs'
    },
    {
        assert: store => assert.isFulfilled(store.getDimensions({'@id': 'http://example.cubeviz.org/compare/mortalityEurope/dataset' }, {'@id': 'http://example.cubeviz.org/compare/mortalityEurope/dsd'})).then(dims => {
            assert.typeOf(dims, 'array');
            assert.lengthOf(dims, 2);
            dims.forEach(dim => assertType('http://purl.org/linked-data/cube#DimensionProperty', dim['@type']));
        }),
        message: 'should retrieve dimensions'
    },
    {
        assert: store => assert.isFulfilled(store.getMeasures({'@id': 'http://example.cubeviz.org/compare/mortalityEurope/dataset' }, {'@id': 'http://example.cubeviz.org/compare/mortalityEurope/dsd'})).then(measures => {
            assert.typeOf(measures, 'array');
            assert.lengthOf(measures, 1);
            assertType('http://purl.org/linked-data/cube#MeasureProperty', measures[0]['@type']);
        }),
        message: 'should retrieve measure'
    },
    {
        assert: store => assert.isFulfilled(store.getAttributes({'@id': 'http://example.cubeviz.org/compare/mortalityEurope/dataset' }, {'@id': 'http://example.cubeviz.org/compare/mortalityEurope/dsd'})).then(attributes => {
            assert.typeOf(attributes, 'array');
            assert.lengthOf(attributes, 1);
            assertType('http://purl.org/linked-data/cube#AttributeProperty', attributes[0]['@type']);
            assert.isTrue(attributes[0]['@id'] === 'http://example.cubeviz.org/compare/mortalityEurope/unit');
        }),
        message: 'should retrieve attributes'
    },
    {
        assert: store => {
            [{'@id': 'http://example.cubeviz.org/compare/mortalityEurope/country', l: 2}, {'@id': 'http://example.cubeviz.org/compare/mortalityEurope/year', l: 13}].forEach(dim => {
                assert.isFulfilled(store.getDimElements(dim, {'@id': 'http://example.cubeviz.org/compare/mortalityEurope/dataset' })).then(dimEls => {
                    assert.typeOf(dimEls, 'array');
                    assert.lengthOf(dimEls, dim.l);
                    dimEls.forEach(el => assertType(dim['@id'], el['@type']));
                });
            });
        },
        message: 'should retrieve all dimension elements'
    },
    {
        assert: store => assert.isFulfilled(store.getObservations({'@id': 'http://example.cubeviz.org/compare/mortalityEurope/dataset' })).then(obs => {
            assert.typeOf(obs, 'array');
            assert.lengthOf(obs, 26);
            obs.forEach(o => assertType('http://purl.org/linked-data/cube#Observation', o['@type']));
        }),
        message: 'should retrieve all observations'
    }
], { beforeEach: store => store.create().then(s => s.load()) }, 'Retrieval tests for default test data cube for ' + SparqlStore.name);

test(new SparqlStore(noDatasetCube), [
    {
        assert: store => assert.isRejected(store.import(), /NO DATASET FOUND VALIDATION ERROR/),
        message: 'should not import data cube'
    }
], { beforeEach: store => store.create().then(s => s.load()) }, 'Complete import test for cube with no dataset for ' + SparqlStore.name);

test(new SparqlStore(noDsdCube), [
    {
        assert: store => assert.isRejected(store.import(), /NO DSD FOUND VALIDATION ERROR/),
        message: 'should not import data cube'
    }
], { beforeEach: store => store.create().then(s => s.load()) }, 'Complete import test for cube with no dsd for ' + SparqlStore.name);

test(new SparqlStore(noDimsCube), [
    {
        assert: store => assert.isRejected(store.import(), /NO DIMENSIONS FOUND VALIDATION ERROR/),
        message: 'should not import data cube'
    }
], { beforeEach: store => store.create().then(s => s.load()) }, 'Complete import test for cube with no dimensions for ' + SparqlStore.name);

test(new SparqlStore(noMeasureCube), [
    {
        assert: store => assert.isRejected(store.import(), /NO MEASURE FOUND VALIDATION ERROR/),
        message: 'should not import data cube'
    }
], { beforeEach: store => store.create().then(s => s.load()) }, 'Complete import test for cube with no measurement for ' + SparqlStore.name);

test(new SparqlStore(noObservationsCube), [
    {
        assert: store => assert.isRejected(store.import(), /NO DIMENSION ELEMENTS FOUND VALIDATION ERROR/),
        message: 'should not import data cube'
    }
], { beforeEach: store => store.create().then(s => s.load()) }, 'Complete import test for cube with no observation points for ' + SparqlStore.name);

test(new SparqlStore(defaultTestCube), [
    {
        assert: store => assert.isFulfilled(store.import()),
        message: 'should import data cube'
    }
], { beforeEach: store => store.create().then(s => s.load()) }, 'Complete import test for default test cube for ' + SparqlStore.name);

test(new SparqlStore(defaultTestCube), [
        {
            assert: store => assert.isFulfilled(store.import()).then(result => {
                assert.isNotNull(result);
                assert.property(result, 'defaultLanguage');
                assert.property(result, 'dataset');
                assert.property(result, 'dataStructureDefinition');
                assert.property(result, 'measures');
                assert.property(result, 'dimensions');
                assert.property(result, 'attributes');
                assert.property(result, 'dimensionElements');
                assert.property(result, 'observations');

                assert.typeOf(result.defaultLanguage, 'string');
                assert.typeOf(result.dataset, 'object');
                assert.typeOf(result.dataStructureDefinition, 'object');
                assert.typeOf(result.measures, 'array');
                assert.typeOf(result.dimensions, 'array');
                assert.typeOf(result.attributes, 'array');
                assert.typeOf(result.dimensionElements, 'object');
                assert.typeOf(result.observations, 'array');

                assert.strictEqual(result.defaultLanguage, 'en');
                assert.strictEqual(result.dataset['@id'], 'http://example.cubeviz.org/compare/mortalityEurope/dataset');
                assert.strictEqual(result.dataStructureDefinition['@id'], 'http://example.cubeviz.org/compare/mortalityEurope/dsd');
                assert.strictEqual(result.measures.length, 1);
                assert.strictEqual(result.dimensions.length, 2);
                assert.strictEqual(result.attributes.length, 1);

                assert.property(result.dimensionElements, 'http://example.cubeviz.org/compare/mortalityEurope/country');
                assert.property(result.dimensionElements, 'http://example.cubeviz.org/compare/mortalityEurope/year');

                assert.strictEqual(result.dimensionElements['http://example.cubeviz.org/compare/mortalityEurope/country'].length, 2);
                assert.strictEqual(result.dimensionElements['http://example.cubeviz.org/compare/mortalityEurope/year'].length, 13);

                assert.strictEqual(result.observations.length, 26);
            }),
            message: 'should return complete result with correct types'
        },
    ], { beforeEach: store => store.create().then(s => s.load()) }, 'Tests for the import result for ' + SparqlStore.name);

test(new SparqlStore(measureDimCube), [
            {
                assert: store => assert.isFulfilled(store.import()).then(result => {

                    assert.lengthOf(result.measures, 2);
                    assert.lengthOf(result.dimensions, 2);
            }),
                message: 'should return complete result with multiple measures from measure dimension'
            },
        ], { beforeEach: store => store.create().then(s => s.load()) }, 'Tests for the import result for ' + SparqlStore.name);
