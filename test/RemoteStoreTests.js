import chai, {assert} from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

import noDatasetCube from './assets/NoDatasetCube.js';
import noDsdCube from './assets/NoDsdCube.js';
import noDimsCube from './assets/NoDimsCube.js';
import noMeasureCube from './assets/NoMeasureCube.js';
import noObservationsCube from './assets/NoObservationsCube.js';
import defaultTestCube from './assets/DefaultDataCube.js';

import RemoteStore from '../src/api/RemoteStore.js';

const defaultTestCubeUrl = 'http://dockerhost:8890/sparql';

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

test(new RemoteStore(null), [
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
    ], { beforeEach: store => store }, 'Creation tests for null input for ' + RemoteStore.name);

test(new RemoteStore(defaultTestCube), [
        {
            assert: store => assert.isFulfilled(store.load()),
            message: 'should load the store before create was called'
        },
        {
            assert: store => assert.isFulfilled(store.create().then(s => s.load())),
            message: 'should create and load the store'
        },
        {
            assert: store => assert.isFulfilled(store.create()),
            message: 'should create the store'
        }
    ], { beforeEach: store => store },'Creation tests for default test data cube for ' + RemoteStore.name);

// test(new RemoteStore(defaultTestCubeUrl), [
//     {
//         assert: store => assert.isFulfilled(store.getDatasets()).then(datasets => {
//             assert.typeOf(datasets, 'array');
//             assert.lengthOf(datasets, 1);
//             const dataset = datasets[0];
//             assert.equal(dataset['@id'], 'http://example.cubeviz.org/compare/mortalityEurope/dataset');
//             assert.property(dataset, '@type');
//             assertType('http://purl.org/linked-data/cube#DataSet', dataset['@type']);
//         }),
//         message: 'should retrieve DATASET'
//     },
//     {
//         assert: store => assert.isFulfilled(store.getDsd({'@id': 'http://example.cubeviz.org/compare/mortalityEurope/dataset' })).then(dsds => {
//             assert.typeOf(dsds, 'array');
//             assert.lengthOf(dsds, 1);
//             const dsd = dsds[0];
//             assert.equal(dsd['@id'], 'http://example.cubeviz.org/compare/mortalityEurope/dsd');
//             assert.property(dsd, '@type');
//             assertType('http://purl.org/linked-data/cube#DataStructureDefinition', dsd['@type']);
//         }),
//         message: 'should retrieve DSD'
//     },
//     {
//         assert: store => assert.isFulfilled(store.getCs({'@id': 'http://example.cubeviz.org/compare/mortalityEurope/dsd'})).then(css => {
//             assert.typeOf(css, 'array');
//             assert.lengthOf(css, 4);
//             css.forEach(cs => assertType('http://purl.org/linked-data/cube#ComponentSpecification', cs['@type']));
//         }),
//         message: 'should retrieve CSs'
//     },
//     {
//         assert: store => assert.isFulfilled(store.getDimensions({'@id': 'http://example.cubeviz.org/compare/mortalityEurope/dataset' }, {'@id': 'http://example.cubeviz.org/compare/mortalityEurope/dsd'})).then(dims => {
//             assert.typeOf(dims, 'array');
//             assert.lengthOf(dims, 2);
//             dims.forEach(dim => assertType('http://purl.org/linked-data/cube#DimensionProperty', dim['@type']));
//         }),
//         message: 'should retrieve dimensions'
//     },
//     {
//         assert: store => assert.isFulfilled(store.getMeasure({'@id': 'http://example.cubeviz.org/compare/mortalityEurope/dataset' }, {'@id': 'http://example.cubeviz.org/compare/mortalityEurope/dsd'})).then(measures => {
//             assert.typeOf(measures, 'array');
//             assert.lengthOf(measures, 1);
//             assertType('http://purl.org/linked-data/cube#MeasureProperty', measures[0]['@type']);
//         }),
//         message: 'should retrieve measure'
//     },
//     {
//         assert: store => {
//             [{'@id': 'http://example.cubeviz.org/compare/mortalityEurope/country', l: 2}, {'@id': 'http://example.cubeviz.org/compare/mortalityEurope/year', l: 13}].forEach(dim => {
//                 assert.isFulfilled(store.getDimElements(dim, {'@id': 'http://example.cubeviz.org/compare/mortalityEurope/dataset' })).then(dimEls => {
//                     assert.typeOf(dimEls, 'array');
//                     assert.lengthOf(dimEls, dim.l);
//                     dimEls.forEach(el => assertType(dim['@id'], el['@type']));
//                 });
//             });
//         },
//         message: 'should retrieve all dimension elements'
//     },
//     {
//         assert: store => assert.isFulfilled(store.getObservations({'@id': 'http://example.cubeviz.org/compare/mortalityEurope/dataset' })).then(obs => {
//             assert.typeOf(obs, 'array');
//             assert.lengthOf(obs, 27);
//             obs.forEach(o => assertType('http://purl.org/linked-data/cube#Observation', o['@type']));
//         }),
//         message: 'should retrieve all observations'
//     }
// ], { beforeEach: store => store.create().then(s => s.load()) }, 'Retrieval tests for default test data cube for ' + RemoteStore.name);
