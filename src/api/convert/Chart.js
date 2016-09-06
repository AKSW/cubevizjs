/*eslint no-unused-vars: 0*/
/*eslint no-console: 0*/
/*eslint no-debugger: 0*/
/*eslint func-style: 0*/

import DataCube from '../DataCube.js';

class Chart {

    createDefaultConfig(type, title) {
        return {
            chart: {
                type
            },
            title: {
                text: title
            }
        };
    }

    constructor(cubeVizResult, selectedComponents, slice, dc) {
        this.cubeVizResult = cubeVizResult;
        this.selectedComponents = selectedComponents;
        this.slice = slice;
        this.dc = dc;
    }

    toNumber(val) {
        if (typeof val !== 'number') {
            console.log('Converting.js: Forcing value to be a number.');
            return parseFloat(val);
        }
        return val;
    }

    createTitle(dims) {
        const selectedMeasure = this.selectedComponents.get('measureComponent');
        const selectedAttrEl = this.selectedComponents.get('attrComponentElement');
        const measureString = DataCube.getValue(DataCube.getLabel(selectedMeasure));
        const attrElString = (selectedAttrEl)
            ? ' in ' + DataCube.getValue(DataCube.getLabel(selectedAttrEl))
            : '';

        const dimsString = dims.reduce((str, dim, idx) => {
            let dimString = DataCube.getValue(DataCube.getLabel(dim));
            if (idx < dims.size - 1)
                dimString += ' and ';
            return str + ' ' + dimString;
        }, '');

        const title = measureString + ' from ' +
            dimsString + ' ' +
            attrElString;
        return title;
    }

    render() {

    }
}

export default Chart;
