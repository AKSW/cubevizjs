/*eslint no-unused-vars: 0*/
/*eslint no-debugger:0*/
/*eslint no-console: 0*/
/*eslint func-style: 0*/

import React, {Component, PropTypes} from 'react';
import {fromJS} from 'immutable';

import {hideSettingsModal} from '../actions';
import MultipleList from '../components/lists/MultipleList.jsx';

class MultiSelection extends Component {

    action(selections) {
        throw new Error('Not implemented');
    }

    clearEmptySelections(selections) {
        return fromJS(selections).filter(selectedEls => selectedEls.size > 0).toJS();
    }

    onAccept(selections) {
        const cleared = this.clearEmptySelections(selections);
        this.props.dispatch(hideSettingsModal());
        const action = this.action(cleared);
        this.props.dispatch(action);
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

MultiSelection.propTypes = {
    allComponents: PropTypes.arrayOf(
        PropTypes.shape({
            header: PropTypes.string.isRequired,
            elements: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
        }).isRequired
    ).isRequired,
    selectedComponents: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default MultiSelection;
