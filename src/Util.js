/*eslint func-style: 0*/
/*eslint no-unused-vars: 0*/
/*eslint no-debugger: 0*/

// Data handling utility methods
import Immutable from 'immutable';

function isUndefined(obj) {
    return obj === undefined;
}

export function keep(collection, fn) {
    return collection.map(fn)
        .filterNot(el => { return isUndefined(el); });
}

export function getDimensionElements(dimension, dataCube) {

    return keep(dataCube.get('dimensions'), dim => {
        if (dim.get('cvUri') === dimension.get('cvUri')) {
            return dim.get('dimensionElements');
        }
    });
}

export function getDimensionElement(dimension, observationPoint) {
    return observationPoint.get('cvDimensions')
        .find(dimEl => dimEl.get('cvAccordingDimension') === dimension.get('cvUri'));
}

// Returns dimension for dimension element
export function getDimension(dimensionElement, dataCube) {
    const results = keep(dataCube.get('dimensions'), dim => {
        if (dim.get('cvUri') === dimensionElement.get('cvAccordingDimension')) {
            return dim;
        }
    });

    return results.first();
}

export function getMeasure(measurement, dataCube) {
    return dataCube.get('measures')
        .find(m => m.get('cvUri') === measurement.get('cvAccordingMeasurement'));
}

export function getDefaultMeasurement(observationPoint) {
    return observationPoint.get('cvMeasures').first();
}
