import {assert} from 'chai';
import {fromJS} from 'immutable';

import * as CubeViz from '../src/api/cubeViz.js';

import cube1 from './assets/SatisfyHeatmapCube1.js';
import MultiAttrCube from './assets/MultiAttrCube.js';

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

    it('should return data cube with observations which contain only one attribute', function() {
        const selection = [
          {
            "@id": "http://example.cubeviz.org/compare/mortalityEurope/Germany",
            "@type": [
              "http://example.cubeviz.org/compare/mortalityEurope/country"
            ]
          },
          {
            "@id": "http://example.cubeviz.org/compare/mortalityEurope/Y2001",
            "@type": [
              "http://example.cubeviz.org/compare/mortalityEurope/year"
            ]
          }
        ];

        const dc = CubeViz.createDataCube(fromJS(selection), MultiAttrCube);
        assert.isTrue(dc.observations.size === 1);
        assert.isTrue(dc.observations
            .get(0)
            .get('http://example.cubeviz.org/compare/mortalityEurope/unit1').first()
            .get('@id') === 'http://example.cubeviz.org/compare/mortalityEurope/unit1/el1');
    });
});
