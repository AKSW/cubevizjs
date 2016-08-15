/*eslint no-unused-vars: 0*/
/*eslint no-console: 0*/
/*eslint no-debugger: 0*/
/*eslint func-style: 0*/
/*eslint max-params: 0*/
/*eslint complexity: 0*/

import * as Constants from '../Constants.js';
import Immutable, {fromJS, Map, List} from 'immutable';

class DataCube {


    /**
     * constructor - description
     *
     * @param  {JSON} data object like:
     * Object { defaultLanguage: "en",
     *          dataset: Object,
     *          dataStructureDefinition: Object,
     *          measures: Array[n],
     *          attributes: Array[n],
     *          attributesElements: Object,
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
        this.dimensions = fromJS(data.dimensions);
        this.measures = fromJS(data.measures);
        this.measureElements = null;
        this.assignedDimEls = fromJS(data.dimensionElements);
        this.attributes = fromJS(data.attributes);
        this.attributesElements = fromJS(data.attributesElements);
        this.observations = fromJS(data.observations);
        this.log();
    }

    log() {
        console.log('\nIn-memory dataCube created');
        console.log('\n');
        console.log('DefaultLanguage: ' + this.defaultLanguage);
        console.log('Dataset:');
        console.log(this.dataset.toJS());
        console.log('Data structure definition:');
        console.log(this.dataStructureDefinition.toJS());
        console.log('Dimension(s):');
        console.log(this.dimensions.toJS());
        console.log('Measure(s)');
        console.log(this.measures.toJS());
        console.log('All dimension elements: ');
        console.log(this.getAllDimensionElements().toJS());
        console.log('All attribute elements: ');
        console.log(this.attributesElements.toJS());
        console.log('Observations: ');
        console.log(this.observations.toJS());
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
            measures: this.measures.toJS(),
            dimensions,
            dimensionElements: dimensionElements.toJS(),
            attributes: this.attributes.toJS(),
            attributesElements: this.attributesElements.toJS(),
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

    getDimensionFromUri(dimUri) {
        return this.dimensions.find(dim => dim.get('@id') === dimUri);
    }

    getDimension(dimEl) {
        const dimUri = this.assignedDimEls.findKey(dimEls => dimEls.find(el => el.get('@id') === dimEl.get('@id')));
        return this.getDimensionFromUri(dimUri);
    }

    getDimensionElement(uri) {
        return this.getAllDimensionElements().find(dimEl => dimEl.get('@id') === uri);
    }

    getDimensionElements(dim) {
        return this.assignedDimEls.get(dim.get('@id'));
    }

    getObservationsContainingDimEl(dimEl) {
        return this.observations.filter(o => {
            const dimUri = DataCube.getUri(this.getDimension(dimEl));
            const objects = o.get(dimUri);
            if (objects)
                return objects.find(obj => obj.get('@id') === dimEl.get('@id')) !== undefined;
            return false;
        });
    }

    getAllDimensionElements() {
        return this.assignedDimEls.reduce((list, v, _) => list.push(v), Immutable.List()).flatten(1);
    }

    getLabel(obj) {
        return DataCube.getLabel(obj, this.defaultLanguage);
    }

    getMeasureElementsFromObservation(ob, measures = this.measures) {
        const res = measures.map(comp => {
            const value = this.getComponentElementFromObservation(ob, comp);
            return value;
        });
        return res;
    }

    getAttributeElementsFromObservation(ob, attributes = this.attributes) {
        const res = this.getComponentsElementFromObservation(ob, this.attributesElements, attributes);
        return res;
    }

    getDimensionElementsFromObservation(ob, dimensions = this.dimensions) {
        const res = this.getComponentsElementFromObservation(ob, this.assignedDimEls, dimensions);
        return res;
    }

    getComponentElementFromObservation(ob, comp) {
        return ob.get(comp.get('@id')).first();
    }

    getComponentsElementFromObservation(ob, componentElements, components) {
        if (!components)
            return List();
        return components.map(comp => {
            const elUri = this.getComponentElementFromObservation(ob, comp);
            const elements = this.getComponentElements(componentElements, comp);
            return elements.find(el => el.get('@id') === elUri.get('@id'));
        });
    }

    getComponentElements(els, comp) {
        return els.get(comp.get('@id'));
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
        return Map({'@value': DataCube.getUri(obj).match(/([^\/]*)\/*$/)[1]});
        //http://stackoverflow.com/a/36741635
    }

    static getUri(obj) {
        return obj.get('@id');
    }

    static getValue(obj) {
        const value = obj.get('@value');
        if (value) {
            const type = obj.get('@type');

            if (type === undefined) return value;

            if (type === Constants.FloatUri ||
                type === Constants.DoubleUri ||
                type === Constants.DecimalUri)
                return parseFloat(value);

            throw new Error('DataCube: Object has unkown type');
        }

        throw new Error('DataCube: Object has no value');
    }

    static empty() {
        const dc = new DataCube(null);

        dc.defaultLanguage = '';
        dc.dataset = fromJS({});
        dc.dataStructureDefinition = fromJS({});
        dc.measures = fromJS([]);
        dc.dimensions = fromJS([]);
        dc.attributes = fromJS([]);
        dc.attributesElements = fromJS({});
        dc.assignedDimEls = fromJS([]);
        dc.observations = fromJS([]);

        return dc;
    }
}

export default DataCube;
