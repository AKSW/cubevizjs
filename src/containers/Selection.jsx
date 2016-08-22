/*eslint no-unused-vars: 0*/
/*eslint no-debugger:0*/
/*eslint no-console: 0*/
/*eslint func-style: 0*/

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import List from '../components/lists/List.jsx';

class Selection extends Component {

    action(index) {
        throw new Error('Not implemented');
    }

    onChange(index) {
        const action = this.action(index);
        this.props.dispatch(action);
    }

    render() {
        return (
            <List
                multiple={false}
                label={this.props.label}
                list={this.props.list}
                value={this.props.index}
                onChange={this.onChange.bind(this)}/>
        );
    }
}

Selection.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.string.isRequired
    ).isRequired,
    index: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default Selection;
