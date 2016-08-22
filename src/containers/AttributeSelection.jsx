/*eslint no-unused-vars: 0*/
/*eslint no-debugger:0*/
/*eslint no-console: 0*/
/*eslint func-style: 0*/

import React from 'react';
import {connect} from 'react-redux';

// import {changeSelectedComponents} from '../actions/dataCubeActions.js';

import MultiSelection from './MultiSelection.jsx';

class AttributeSelection extends MultiSelection {

    action(selection) {
        // return changeSelectedComponents(selection);
    }
}

function mapStateToProps(state) {
    const {dataCubeReducer} = state;
    return {
        selectedComponents: [],
        allComponents: (dataCubeReducer.get('dataCube'))
            ? dataCubeReducer.get('selectableComponents').attrComponentElements
            : []
    };
}

export default connect(mapStateToProps)(AttributeSelection);
