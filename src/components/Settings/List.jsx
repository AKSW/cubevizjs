/*eslint no-debugger: 0*/

import React from 'react';
import {Input} from 'react-bootstrap';

const List = React.createClass({
    onChange() {
        this.props.onChange({
            identifier: this.props.identifier,
            indexes: this.refs.input.getValue()
        });
    },
    render() {
        return (
            <Input
                ref="input"
                type="select"
                label={this.props.label}
                onChange={this.onChange}
                multiple={this.props.multiple}>
              {this.props.list.map(function(el, i) {
                  return (<option key={i} value={i}>{el}</option>);
              })}
            </Input>
        );
    }
});

export default List;
