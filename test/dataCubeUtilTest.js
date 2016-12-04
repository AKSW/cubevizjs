import chai, {assert} from 'chai';
import {List} from 'immutable';
import {mapUriToindex, mapUrisToindexes} from '../src/api/util/dataCubeUtil.js';

import satisfyHeatmapCube1 from './assets/SatisfyHeatmapCube1.js';

describe('Testing uri mapping to index in Data Cube component', function() {
    it('should correctly map measure to corresponding index', function() {
        assert.strictEqual(mapUriToindex('http://example.cubeviz.org/compare/mortalityEurope/value', satisfyHeatmapCube1.measures), 0);
    });

    it('should return -1 because measure does not exist', function() {
        assert.strictEqual(mapUriToindex('http://example.cubeviz.org/compare/mortalityEurope/not', satisfyHeatmapCube1.measures), -1);
    });

    it('should correctly map dimension elements to corresponding indexes', function() {
        //console.log(satisfyHeatmapCube1.assignedDimEls.toJS());
        assert.deepEqual(mapUrisToindexes([
            'http://example.cubeviz.org/compare/mortalityEurope/Germany',
            'http://example.cubeviz.org/compare/mortalityEurope/Y2000',
            'http://example.cubeviz.org/compare/mortalityEurope/Y2001'
        ], satisfyHeatmapCube1.assignedDimEls), {0: ['0'], 1: ['0', '1']});
    });

    it('should return empty map because a uri does not exist', function() {
        //console.log(satisfyHeatmapCube1.assignedDimEls.toJS());
        assert.deepEqual(mapUrisToindexes([
            'http://example.cubeviz.org/compare/mortalityEurope/Germany',
            'http://example.cubeviz.org/compare/mortalityEurope/Y2000',
            'http://example.cubeviz.org/compare/mortalityEurope/Y2002'
        ], satisfyHeatmapCube1.assignedDimEls), {});
    });

    it('should return empty map because no attribute exists', function() {
        //console.log(satisfyHeatmapCube1.assignedDimEls.toJS());
        assert.deepEqual(mapUrisToindexes([
            'http://not/here'
        ], satisfyHeatmapCube1.attributesElements), {});
    });

    it('should return -1 because no measure exists', function() {
        //console.log(satisfyHeatmapCube1.assignedDimEls.toJS());
        assert.strictEqual(mapUriToindex('http://not/here', List()), -1);
    });
});
