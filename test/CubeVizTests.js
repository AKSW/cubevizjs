import {assert} from 'chai';
import {fromJS} from 'immutable';

import * as CubeViz from '../src/api/cubeViz.js';

import cube1 from './assets/SatisfyHeatmapCube1.js';
import MultiAttrCube from './assets/MultiAttrCube.js';

import threeDimDataCube, {dcAlt} from './assets/3DimDataCube.js';

describe('CubeViz tests', function() {

    it('should return an empty chart result list', function() {
        const res = CubeViz.determineCharts(null, null).toJS();
        assert.isNotNull(res);
        assert.strictEqual(res.length, 0);
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

    it('should return cube with correct observation count of 3 observations (Selected dimEls from 2 of 3 dimensions)', function() {

        const dimSelection = [
          {
            "@id": "http://example.cubeviz.org/compare/mortalityEurope/Germany",
            "@type": [
              "http://example.cubeviz.org/compare/mortalityEurope/country"
            ]
          },
          {
            "@id": "http://example.cubeviz.org/compare/mortalityEurope/Y2000",
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

        const dc = CubeViz.createDataCube(fromJS(measureSelection), null, fromJS(dimSelection), threeDimDataCube);

        assert.strictEqual(dc.observations.size, 3);
        assert.strictEqual(dc.dimensions.size, 3);
        assert.strictEqual(dc.assignedDimEls.size, 3);

        assert.property(dc.assignedDimEls.toJS(), 'http://example.cubeviz.org/compare/mortalityEurope/country');
        assert.property(dc.assignedDimEls.toJS(), 'http://example.cubeviz.org/compare/mortalityEurope/year');
        assert.property(dc.assignedDimEls.toJS(), 'http://example.cubeviz.org/compare/mortalityEurope/gender');

        assert.isTrue(
            dc.assignedDimEls
            .get('http://example.cubeviz.org/compare/mortalityEurope/gender')
            .find(el => el.get('@id') === 'http://example.cubeviz.org/compare/mortalityEurope/Female') !== undefined);

        assert.isTrue(
            dc.assignedDimEls
            .get('http://example.cubeviz.org/compare/mortalityEurope/gender')
            .find(el => el.get('@id') === 'http://example.cubeviz.org/compare/mortalityEurope/Male') !== undefined);

        assert.isTrue(
            dc.assignedDimEls
            .get('http://example.cubeviz.org/compare/mortalityEurope/gender')
            .find(el => el.get('@id') === 'http://example.cubeviz.org/compare/mortalityEurope/Transgender') !== undefined);
    });

    // it('should return cube with correct observation count of 2 observations (Selected dimEls from 2 of 3 dimensions)', function() {
    //     const dimSelection = [
    //       {
    //         "@id": "http://example.cubeviz.org/compare/mortalityEurope/Germany",
    //         "@type": [
    //           "http://example.cubeviz.org/compare/mortalityEurope/country"
    //         ]
    //       },
    //       {
    //         "@id": "http://example.cubeviz.org/compare/mortalityEurope/Y2000",
    //         "@type": [
    //           "http://example.cubeviz.org/compare/mortalityEurope/year"
    //         ]
    //       }
    //     ];
    //
    //     const measureSelection =
    //     {
    //       "@id": "http://example.cubeviz.org/compare/mortalityEurope/value",
    //       "@type": [
    //         "http://purl.org/linked-data/cube#MeasureProperty"
    //       ],
    //       "http://www.w3.org/2000/01/rdf-schema#label": [
    //         {
    //           "@value": "deaths (CS)",
    //           "@language": "en"
    //         }
    //       ]
    //     };
    //
    //     const dc = CubeViz.createDataCube(fromJS(measureSelection), null, fromJS(dimSelection), dcAlt);
    //
    //     assert.strictEqual(dc.observations.size, 2);
    //     assert.strictEqual(dc.dimensions.size, 3);
    //     assert.strictEqual(dc.assignedDimEls.size, 3);
    //
    //     assert.property(dc.assignedDimEls.toJS(), 'http://example.cubeviz.org/compare/mortalityEurope/country');
    //     assert.property(dc.assignedDimEls.toJS(), 'http://example.cubeviz.org/compare/mortalityEurope/year');
    //     assert.property(dc.assignedDimEls.toJS(), 'http://example.cubeviz.org/compare/mortalityEurope/gender');
    //
    //     assert.isTrue(
    //         dc.assignedDimEls
    //         .get('http://example.cubeviz.org/compare/mortalityEurope/gender')
    //         .find(el => el.get('@id') === 'http://example.cubeviz.org/compare/mortalityEurope/Female') !== undefined);
    //
    //     assert.isTrue(
    //         dc.assignedDimEls
    //         .get('http://example.cubeviz.org/compare/mortalityEurope/gender')
    //         .find(el => el.get('@id') === 'http://example.cubeviz.org/compare/mortalityEurope/Male') !== undefined);
    //
    //     assert.isFalse(
    //         dc.assignedDimEls
    //         .get('http://example.cubeviz.org/compare/mortalityEurope/gender')
    //         .find(el => el.get('@id') === 'http://example.cubeviz.org/compare/mortalityEurope/Transgender') !== undefined);
    // });
});
