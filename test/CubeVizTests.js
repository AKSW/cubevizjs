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
        assert.strictEqual(res.length, 4);
        assert.strictEqual(res[0].name, 'cvColumnChart');
        assert.strictEqual(res[1].name, 'cvPieChart');
        assert.strictEqual(res[2].name, 'cvHeatmap');
        assert.strictEqual(res[3].name, 'cvGroupedColumnChart')
    });

    it('should return data cube with observations which contain only one attribute', function() {
        const dimSelection = [
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

        const measureSelection =
        {
          "@id": "http://example.cubeviz.org/compare/mortalityEurope/value",
          "@type": [
            "http://purl.org/linked-data/cube#MeasureProperty"
          ],
          "http://www.w3.org/2000/01/rdf-schema#label": [
            {
              "@value": "deaths (CS)",
              "@language": "en"
            }
          ]
      };

        const attrElSelection =
        {
            '@id': 'http://example.cubeviz.org/compare/mortalityEurope/unit1/el1',
            '@type': [
                'http://example.cubeviz.org/compare/mortalityEurope/unit1'
            ]
        };

        const dc = CubeViz.createDataCube(fromJS(measureSelection), fromJS(attrElSelection), fromJS(dimSelection), MultiAttrCube);
        assert.isTrue(dc.observations.size === 1);
        assert.isTrue(dc.observations
            .get(0)
            .get('http://example.cubeviz.org/compare/mortalityEurope/unit1').first()
            .get('@id') === 'http://example.cubeviz.org/compare/mortalityEurope/unit1/el1');
    });
});
