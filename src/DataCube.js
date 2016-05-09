/*eslint no-unused-vars: 0*/
/*eslint no-console: 0*/
/*eslint no-debugger: 0*/
/*eslint func-style: 0*/
/*eslint max-params: 0*/
/*eslint complexity: 0*/

import * as Constants from './Constants.js';
import Immutable from 'immutable';
import {keep, isUndefined} from './Util.js';

class DataCube {

    //doc is an immutable datastructur (immutable.js)
    //in jsonld format
    constructor(doc) {
        this.doc = doc;

        this.defaultLanguage = 'en';
        this.dimensions = this.getAllDimensions();
        this.allDimensionElements = this.dimensions.flatMap(dim => this.getDimensionElements(dim));
        this.observations = this.getAllObservations();
        this.defaultMeasureProperty = this.doc.find(t => t.get('@type').first() === Constants.MeasurePropertyUri);
    }

    //TODO implement complex creation
    createDataCube(selections, dimensions, observations) {
        const dimEls = selections;
        const noDims = keep(this.doc, t => {
            if (t.get('@type').first() !== Constants.DimensionPropertyUri) {
                return t;
            }
        });
        const noDimEls = noDims.filter(t => {
            const dimension = dimensions.find(dim => dim.get('@id') === t.get('@type').first());
            if (dimension) {
                if (dimEls.find(el => t.get('@id') === el.get('@id'))) {
                    return true;
                }
                return false;
            }
            return true;
        });
        const noObs = keep(noDimEls, t => {
            if (t.get('@type').first() !== Constants.ObservationUri) {
                return t;
            }
        });

        const final = noObs.concat(dimensions).concat(observations);
        return new DataCube(final);
    }

    getAllDimensions() {
        return DataCube.getType(this.doc, Constants.DimensionPropertyUri);
    }

    getDimension(dimEl) {
        return this.dimensions.find(dim => dim.get('@id') === dimEl.get('@type').first());
    }

    getDimensionElement(uri) {
        return this.allDimensionElements.find(dimEl => dimEl.get('@id') === uri);
    }

    getDimensionElements(dim) {
        return DataCube.getType(this.doc, dim.get('@id'));
    }

    getDimElsFromObservation(observation) {
        return DataCube.getDimElsFromObservation(this.dimensions, observation);
    }

    getAllObservations() {
        return DataCube.getType(this.doc, Constants.ObservationUri);
    }

    getObservations(dimEl) {
        return this.observations.filter(o => DataCube.observationContainsDimEl(o, dimEl));
    }

    getLabel(obj) {
        return DataCube.getLabel(obj, this.defaultLanguage);
    }

    getMeasure(obj) {
        return DataCube.getMeasure(this.defaultMeasureProperty, obj);
    }


    static getType(doc, type) {
        //TODO is get('@type') always list?
        return doc.filter(t => t.get('@type').first() === type);
    }

    static getLabel(obj, lang) {
        if (obj.get(Constants.LabelUri)) {
            const labels = obj.get(Constants.LabelUri);
            return labels.find(l => l.get('@language') === lang);
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

            if (isUndefined(type)) {
                return value;
            }

            if (type === Constants.FloatUri) {
                return parseFloat(value);
            }

            throw new Error('DataCube: Object has unkown type');
        }

        throw new Error('DataCube: Object has no value');
    }

    static empty() {
        return new DataCube(Immutable.Map());
    }

    static observationContainsDimEl(obs, dimEl) {
        const objects = obs.get(dimEl.get('@type').first());
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
