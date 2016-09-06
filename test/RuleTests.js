import {assert} from 'chai';

import HeatmapRule from '../src/api/rules/HeatmapRule.js';
import PieChartRule from '../src/api/rules/PieChartRule.js'

import DataCube from '../src/api/DataCube.js';
import SparqlStore from '../src/api/SparqlStore.js';

import cube1 from './assets/SatisfyHeatmapCube1.js';
import cube2 from './assets/SatisfyHeatmapCube2.js';
import cube3 from './assets/SatisfyHeatmapCube3.js';
import cube4 from './assets/SatisfyHeatmapCube4.js';

import cube5 from './assets/SatisfyPieChartCube1.js';


describe('Heatmap rule tests', function() {

    it('should not been satisfied by emtpy data cube.', function() {
        const dc = DataCube.empty();
        const r = new HeatmapRule();
        assert.isFalse(r.isSatisfiedBy(dc));
        assert.strictEqual(r.getScore(dc), 0);
        assert.strictEqual(r.getSingleElementDimensions(dc).size, 0);
        assert.strictEqual(r.getMultiElementDimensions(dc).size, 0);
    });

    it('should been satisfied with cube1 (higher score)', function() {
        const r = new HeatmapRule();
        assert.isTrue(r.isSatisfiedBy(cube1));
        assert.strictEqual(r.getScore(cube1), 6);
        assert.strictEqual(r.getSingleElementDimensions(cube1).size, 1);
        assert.strictEqual(r.getMultiElementDimensions(cube1).size, 1);
    });

    it('should been satisfied with cube4 (highest score)', function() {
        const r = new HeatmapRule();
        assert.isTrue(r.isSatisfiedBy(cube4));
        assert.strictEqual(r.getScore(cube4), 7);
        assert.strictEqual(r.getSingleElementDimensions(cube4).size, 0);
        assert.strictEqual(r.getMultiElementDimensions(cube4).size, 2);
    });

    it('should not been satisfied with cube2 (no observations)', function() {
        const r = new HeatmapRule();
        assert.isFalse(r.isSatisfiedBy(cube2));
        assert.strictEqual(r.getScore(cube2), 0);
        assert.strictEqual(r.getSingleElementDimensions(cube2).size, 0);
        assert.strictEqual(r.getMultiElementDimensions(cube2).size, 0);
    });

    it('should not been satisfied with cube3 (just one SED)', function() {
        const r = new HeatmapRule();
        assert.isFalse(r.isSatisfiedBy(cube3));
        assert.strictEqual(r.getScore(cube3), 0);
        assert.strictEqual(r.getSingleElementDimensions(cube3).size, 0);
        assert.strictEqual(r.getMultiElementDimensions(cube3).size, 0);
    });
});

describe('Pie chart rule tests', function() {

    it('should not been satisfied by emtpy data cube.', function() {
        const dc = DataCube.empty();
        const r = new PieChartRule();
        assert.isFalse(r.isSatisfiedBy(dc));
        assert.strictEqual(r.getScore(dc), 0);
        assert.strictEqual(r.getSingleElementDimensions(dc).size, 0);
        assert.strictEqual(r.getMultiElementDimensions(dc).size, 0);
    });

    it('should not been satisfied with cube2 (no observations)', function() {
        const r = new PieChartRule();
        assert.isFalse(r.isSatisfiedBy(cube2));
        assert.strictEqual(r.getScore(cube2), 0);
        assert.strictEqual(r.getSingleElementDimensions(cube2).size, 0);
        assert.strictEqual(r.getMultiElementDimensions(cube2).size, 0)
    });

    it('should been satisfied with cube1 (highest score)', function() {
        const r = new PieChartRule();
        assert.isTrue(r.isSatisfiedBy(cube1));
        assert.strictEqual(r.getScore(cube1), 7);
        assert.strictEqual(r.getSingleElementDimensions(cube1).size, 1);
        assert.strictEqual(r.getMultiElementDimensions(cube1).size, 1);
    });

    it('should not been satisfied with cube4 (2 multi element dimensions)', function() {
        const r = new PieChartRule();
        assert.isFalse(r.isSatisfiedBy(cube4));
        assert.strictEqual(r.getScore(cube4), 0);
        assert.strictEqual(r.getSingleElementDimensions(cube4).size, 0);
        assert.strictEqual(r.getMultiElementDimensions(cube4).size, 0);
    });

    it('should been satisfied with cube5 (low score)', function() {
        const r = new PieChartRule();
        assert.isTrue(r.isSatisfiedBy(cube5));
        assert.strictEqual(r.getScore(cube5), 5);
        assert.strictEqual(r.getSingleElementDimensions(cube5).size, 1);
        assert.strictEqual(r.getMultiElementDimensions(cube5).size, 0);
    });

});
