/*eslint no-debugger: 0*/
/*eslint no-unused-vars: 0*/

import React, {PropTypes} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';

import List from './List.jsx';

const MultipleList = React.createClass({
    onChange(data) {
        this.props.selectedValues[data.identifier] = data.indexes;
    },
    render() {
        return (
            <Grid fluid={true}>
                <Row>
                    <Col>
                        {this.props.values.map((list, i) => {
                            return (
                                <List
                                key={i}
                                identifier={i}
                                multiple={true}
                                label={list.header}
                                list={list.elements}
                                value={this.props.selectedValues[i]}
                                onChange={this.onChange}/>
                            );
                        })}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <RaisedButton label="Ok"
                        primary={true}
                        onTouchTap={this.props.onAccept.bind(this, this.props.selectedValues)}/>
                    </Col>
                </Row>
            </Grid>
        );
    }
});

MultipleList.propTypes = {
};

export default MultipleList;
