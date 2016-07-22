/*eslint no-unused-vars: 0*/
/*eslint no-debugger:0*/
/*eslint no-console: 0*/
/*eslint func-style: 0*/

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {hideSettingsModal} from '../actions';
import {changeSelectedComponents} from '../actions/dataCubeActions.js';

// import {doImport} from '../actions';
import MultipleList from '../components/lists/MultipleList.jsx';

class DataSelection extends Component {

    onAccept(selections) {
        this.props.dispatch(hideSettingsModal());
        this.props.dispatch(changeSelectedComponents(selections));
    }

    render() {
        return (
            <MultipleList
                values={this.props.allComponents}
                selectedValues={this.props.selectedComponents}
                onAccept={this.onAccept.bind(this)}/>
        );
    }
}

DataSelection.propTypes = {
    allComponents: PropTypes.arrayOf(
        PropTypes.shape({
            header: PropTypes.string.isRequired,
            elements: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
        }).isRequired
    ).isRequired,
    selectedComponents: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};


function mapStateToProps(state) {
    const {dataCubeReducer, selectionReducer} = state;
    return {
        selectedComponents: selectionReducer.get('selectedComponents'),
        allComponents: (dataCubeReducer.get('dataCube'))
            ? dataCubeReducer.get('selectableComponents')
            : []
    };
}

export default connect(mapStateToProps)(DataSelection);
