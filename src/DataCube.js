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


    /**
     * constructor - DataCube ....
     * Can only handle jsonld response from store.
     *
     * @param  {type} store description
     * @return {type}       description
     */
    constructor(store) {

        this.store = store;
        this.defaultLanguage = 'en';
    }

    log() {
        console.log('\nDataCube created');
        console.log('\n');
        console.log('DefaultLanguage: ' + this.defaultLanguage);
        console.log('Dimensions:');
        console.log(this.dimensions.toJS());
        console.log('All dimension elements: ');
        console.log(this.allDimensionElements.toJS());
        console.log('Observations: ');
        console.log(this.observations.toJS());
        console.log('Default measure property');
        console.log(this.defaultMeasureProperty.toJS());
    }

    start() {
        if (this.store) {
            return this.store.getDatasets()
            .then(ds => {
                if (ds.length === 0) return Promise.reject('No datasets found.');
                this.ds = ds[0];
                return this.store.getDsd(ds[0]);
            })
            .then(dsd => {
                if (dsd.length === 0) return Promise.reject('No dsd found.');
                this.dsd = dsd[0];
                const promises =
                    [this.store.getDimensions(this.ds, this.dsd), this.store.getMeasure(this.ds, this.dsd)];
                return Promise.all(promises);
            })
            .then(res => {
                if (res[1].length === 0) return Promise.reject('No measures found.');
                if (res[0].length === 0) return Promise.reject('No dimensions found.');
                this.defaultMeasureProperty = Immutable.fromJS(res[1][0]);
                this.dimensions = Immutable.fromJS(res[0]);
                const promises = res[0]
                    .map(dim => this.store.getDimElements(dim, this.ds));
                return Promise.all(promises);
            })
            .then(dimEls => {
                this.allDimensionElements = Immutable.fromJS(dimEls).flatten(1);
                if (this.allDimensionElements.size === 0) return Promise.reject('No dimEls found.');
                return this.store.getObservations(this.ds);
            })
            .then(obs => {
                if (obs.length === 0) return Promise.reject('No observations found.');
                this.observations = Immutable.fromJS(obs);
                this.log();
            })
            .catch(console.log);
        }

        return Promise.reject(new Error('Store is not initialized.'));
    }

    //TODO implement complex creation
    createDataCube(selections, dimensions, observations) {
        const dimEls = selections;
        const noDims = keep(this.doc, t => {
            if (t.get('@type').first() !== Constants.DimensionPropertyUri)
                return t;
        });
        const noDimEls = noDims.filter(t => {
            const dimension = dimensions.find(dim => dim.get('@id') === t.get('@type').first());
            if (dimension) {
                if (dimEls.find(el => t.get('@id') === el.get('@id')))
                    return true;
                return false;
            }
            return true;
        });
        const noObs = keep(noDimEls, t => {
            if (t.get('@type').first() !== Constants.ObservationUri)
                return t;
        });

        const final = noObs.concat(dimensions).concat(observations);
        return new DataCube(final);
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
        return doc.filter(tri => {
            const t = tri.get('@type');
            if (t) return t.find(el => el === type);
            return false;
        });
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
