/*eslint func-style: 0*/
/*eslint no-unused-vars: 0*/
/*eslint no-debugger: 0*/

// Data handling utility methods
import _ from 'underscore';
import Immutable from 'immutable';

function keep(collection, fn) {
    return collection.map(fn)
        .filterNot(el => { return _.isUndefined(el); });
}

export function getDimensionElements(dimension, dataCube) {

    return keep(dataCube.get('dimensions'), dim => {
        if (dim.get('cvUri') === dimension.get('cvUri')) {
            return dim.get('dimensionElements');
        }
    });
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
