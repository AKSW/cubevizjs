import React from 'react';
import {Input} from 'react-bootstrap';

const Facets = React.createClass({
    onChange() {
        this.props.onFacetsChange(this.refs.input.getValue());
    },
    render() {
        return(
            <Input ref="input" type="select" label="Facets" onChange={this.onChange} multiple>
              {this.props.facets.map(function(facet, i) {
                  return(<option key={i} value={i}>{facet}</option>);
              })}
            </Input>
        );
    }
});

export default Facets;
