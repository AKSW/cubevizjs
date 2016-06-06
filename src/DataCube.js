/*eslint no-unused-vars: 0*/
/*eslint no-console: 0*/
/*eslint no-debugger: 0*/
/*eslint func-style: 0*/
/*eslint max-params: 0*/
/*eslint complexity: 0*/

import * as Constants from './Constants.js';
import Immutable, {fromJS} from 'immutable';
import {keep, isUndefined} from './Util.js';

class DataCube {


    /**
     * constructor - description
     *
     * @param  {JSON} data object like:
     * Object { defaultLanguage: "en",
     *          dataset: Object,
     *          dataStructureDefinition: Object,
     *          defaultMeasureProperty: Object,
     *          dimensions: Array[n],
     *          dimensionElements: Object,
     *          observations: Array[n]}
     * @return {type}      description
     *
     */

    constructor(data) {
        if (!data) return;

        this.defaultLanguage = data.defaultLanguage;
        this.dataset = fromJS(data.dataset);
        this.dataStructureDefinition = fromJS(data.dataStructureDefinition);
        this.defaultMeasureProperty = fromJS(data.defaultMeasureProperty);
        this.dimensions = fromJS(data.dimensions);
        this.assignedDimEls = fromJS(data.dimensionElements);
        this.observations = fromJS(data.observations);
        this.log();
    }

    log() {
        console.log('\nDataCube created');
        console.log('\n');
        console.log('DefaultLanguage: ' + this.defaultLanguage);
        console.log('Dataset:');
        console.log(this.dataset.toJS());
        console.log('dataStructureDefinition:');
        console.log(this.dataStructureDefinition.toJS());
        console.log('Dimensions:');
        console.log(this.dimensions.toJS());
        console.log('All dimension elements: ');
        console.log(this.getAllDimensionElements().toJS());
        console.log('Observations: ');
        console.log(this.observations.toJS());
        console.log('Default measure property');
        console.log(this.defaultMeasureProperty.toJS());
    }


    /**
     * createDataCube - Creates new data cube from selected data.
     *
     * @param  {List} selections   Selected dimension elements
     * @param  {List} dimensions   Selected dimensions
     * @param  {List} observations observation points which fit in the above selections.
     * @return {DataCube}              description
     * @todo Maybe adjust ds and dsd properly befor putting them into the new data cube.
     * @todo Refactor dimensionElements creation and delete method afterwards
     */
    createDataCube(selections, dimensions, observations) {
        const dimensionElements = this.assignDimEls(selections, dimensions);

        return new DataCube({
            defaultLanguage: this.defaultLanguage,
            dataset: this.dataset.toJS(),
            dataStructureDefinition: this.dataStructureDefinition.toJS(),
            defaultMeasureProperty: this.defaultMeasureProperty.toJS(),
            dimensions,
            dimensionElements: dimensionElements.toJS(),
            observations
        });
    }

    assignDimEls(selections, dimensions) {
        return dimensions.toMap().flatMap(dim => {
            const dimElUris = this.assignedDimEls.get(dim.get('@id'))
                .map(dimEl => dimEl.get('@id'));
            const selectedDimEls = selections.filter(s => dimElUris.contains(s.get('@id')));
            return Immutable.Map({[dim.get('@id')]: selectedDimEls});
        });
    }

    getDimension(dimEl) {
        const dimUri = this.assignedDimEls.findKey(dimEls => dimEls.find(el => el.get('@id') === dimEl.get('@id')));
        return this.dimensions.find(dim => dim.get('@id') === dimUri);
    }

    getDimensionElement(uri) {
        return this.getAllDimensionElements().find(dimEl => dimEl.get('@id') === uri);
    }

    getDimensionElements(dim) {
        return this.assignedDimEls.get(dim.get('@id'));
    }

    getDimElsFromObservation(observation) {
        return DataCube.getDimElsFromObservation(this.dimensions, observation);
    }

    getAllObservations() {
        return this.observations;
    }

    getObservations(dimEl) {
        return this.observations.filter(o => DataCube.observationContainsDimEl(o, dimEl));
    }

    getAllDimensionElements() {
        return this.assignedDimEls.reduce((list, v, k) => list.push(v), Immutable.List()).flatten(1);
    }

    getLabel(obj) {
        return DataCube.getLabel(obj, this.defaultLanguage);
    }

    getMeasure(obj) {
        return DataCube.getMeasure(this.defaultMeasureProperty, obj);
    }


    static getType(doc, type) {
        //TODO is get('@type') always list?
        return doc.filter(tri => {
            const t = tri.get('@type');
            if (t) return t.find(el => el === type);
            return false;
        });
    }

    static getLabel(obj, lang) {

        const labelUri = Immutable.fromJS(Constants.LabelUris)
            .find(uri => obj.get(uri));
        if (labelUri) {
            const labels = obj.get(labelUri);
            const language = labels.find(l => l.get('@language') === lang);
            if (language)
                return language;
            return labels.first();
        }

        throw new Error('DataCube: No Label Property');
    }

    static getUri(obj) {
        return obj.get('@id');
    }

    static getMeasure(measureProperty, obj) {
        return obj.get(measureProperty.get('@id'));
    }

    static getValue(obj) {
        const value = obj.get('@value');
        if (value) {
            //TODO Implement other types
            const type = obj.get('@type');

            if (isUndefined(type)) return value;

            if (type === Constants.FloatUri)
                return parseFloat(value);

            throw new Error('DataCube: Object has unkown type');
        }

        throw new Error('DataCube: Object has no value');
    }

    static empty() {
        return new DataCube(null);
    }

    static observationContainsDimEl(dimUri, dimEl, obs) {
        const objects = obs.get(dimUri);
        if (objects) {
            const contains = objects.find(obj => obj.get('@id') === dimEl.get('@id'));
            return !isUndefined(contains);
        }
        return false;
    }

    static getDimensionElementUri(dimension, observation) {
        return observation.get(dimension.get('@id'));
    }

    //IMPORTANT change to getDimensionElementURI
    static getDimElsFromObservation(dimensions, observation) {
        return dimensions.map(dim => DataCube.getDimensionElementUri(dim, observation));
    }
}

export default DataCube;
