/*eslint no-debugger: 0*/
/*eslint no-console: 0*/

import React from 'react';
import {Input} from 'react-bootstrap';

const List = React.createClass({
    getInitialState() {
        return {value: this.props.value};
    },
    onChange() {
        if (this.props.identifier !== undefined) {
            this.props.onChange({
                identifier: this.props.identifier,
                indexes: this.refs.input.getValue()
            });
        } else {
            this.props.onChange(this.refs.input.getValue());
        }

        this.setState({value: this.refs.input.getValue()});
    },
    render() {
        return (
            <Input
                ref="input"
                type="select"
                label={this.props.label}
                onChange={this.onChange}
                multiple={this.props.multiple}
                value={this.state.value}>
              {this.props.list.map(function(el, i) {
                  return (<option key={i} value={i}>{el}</option>);
              })}
            </Input>
        );
    }
});

export default List;
