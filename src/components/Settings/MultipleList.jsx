/*eslint no-debugger: 0*/
/*eslint no-unused-vars: 0*/

import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import RaisedButton from 'material-ui/lib/raised-button';

import List from './List.jsx';

const MultipleList = React.createClass({
    getInitialState() {
        return {
            selections: {}
        };
    },
    onChange(data) {
        this.state.selections[data.identifier] = data.indexes;
    },
    onTouch() {
        this.props.onChange(this.state.selections);
    },
    render() {
        return (
            <Grid fluid={true}>
                <Row>
                    <Col>
                        {this.props.lists.map((list, i) => {
                            return (
                                <List
                                key={i}
                                identifier={i}
                                multiple={true}
                                label={list.header}
                                list={list.elements}
                                onChange={this.onChange}/>
                            );
                        })}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <RaisedButton label="Ok" primary={true} onTouchTap={this.onTouch}/>
                    </Col>
                </Row>
            </Grid>
        );
    }
});

export default MultipleList;
