/*eslint no-unused-vars: 0*/
/*eslint no-debugger:0*/
/*eslint no-console: 0*/
/*eslint func-style: 0*/

import React from 'react';
import {connect} from 'react-redux';
import DataCube from '../api/DataCube.js';
import Selection from './Selection.jsx';

import {dataSetSelectionChanged} from '../actions';

class DataSetSelection extends Selection {

    action(index) {
        return dataSetSelectionChanged(index);
    }
}

function mapStateToProps(state) {
    const {importReducer} = state;
    return {
        list: importReducer.get('dataSets')
            .map(ds => DataCube.getValue(DataCube.getLabel(ds, 'en'))).toJS(),
        index: importReducer.get('dataSetIndex'),
        label: 'Dataset'
    };
}

export default connect(mapStateToProps)(DataSetSelection);
