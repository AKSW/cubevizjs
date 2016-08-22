/*eslint no-debugger: 0*/
/*eslint no-console: 0*/
/*eslint func-style: 0*/
/*eslint camelcase: 0*/

import React, {Component, PropTypes} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';

import {handleConfiguration} from '../actions';

import Settings from './Settings.jsx';
import Chart from './Chart.jsx';
import Popover from 'material-ui/Popover';
import CircularProgress from 'material-ui/CircularProgress';

const contentStyle = {
    marginTop: '100px',
    padding: 50,
    textAlign: 'center',
    fontSize: 'medium'
};

class Main extends Component {
    componentDidMount() {
        this.props.dispatch(handleConfiguration(this.props.config));
    }

    render() {
        return (
            <div id="cubevizapp" className="cubevizapp">
                <Grid>
                  <Row>
                      <Col md={12}><Settings /></Col>
                  </Row>
                  <Row>
                      <Col md={12}>
                          <span>Demo application,
                              please use the console for detailed output.</span>
                      </Col>
                  </Row>
                  <Row>
                      <Col md={12}>
                          <Chart />
                      </Col>
                  </Row>
                </Grid>
                <Popover
                    open={this.props.showPopover}
                    anchorEl={document.getElementById('cubevizapp')}
                    anchorOrigin={{horizontal: 'middle', vertical: 'center'}}
                    targetOrigin={{horizontal: 'middle', vertical: 'center'}}
                    style={contentStyle}>
                        <CircularProgress />< br/>< br/>
                        <b>{this.props.popoverTitle}</b>
                </Popover>
            </div>
        );
    }
}

Main.propTypes = {
    popoverTitle: PropTypes.string.isRequired,
    showPopover: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    config: PropTypes.shape({
        ui_container: PropTypes.string,
        data_source: PropTypes.shape({
            value: PropTypes.string.isRequired
        })
    }).isRequired
};

function mapStateToProps(state) {
    const {mainReducer} = state;
    return {
        popoverTitle: mainReducer.get('popoverTitle'),
        showPopover: mainReducer.get('showPopover')
    };
}

export default connect(mapStateToProps)(Main);
