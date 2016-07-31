import {assert} from 'chai';

import * as CubeViz from '../src/api/cubeViz.js';

import cube1 from './assets/SatisfyHeatmapCube1.js';

describe('CubeViz tests', function() {

    it('should return an empty chart result list', function() {
        const res = CubeViz.determineCharts(null, null).toJS();
        assert.isNotNull(res);
        assert.strictEqual(res.length, 0);
    });

    it('should return a chart result list', function() {
        const res = CubeViz.determineCharts(null, cube1).toJS();
        assert.isNotNull(res);
        assert.strictEqual(res.length, 2);
        assert.strictEqual(res[0].name, 'cvPieChart');
        assert.strictEqual(res[1].name, 'cvHeatmap');
    });
});
