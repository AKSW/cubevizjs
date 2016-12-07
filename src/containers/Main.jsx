/*eslint no-debugger: 0*/
/*eslint no-console: 0*/
/*eslint func-style: 0*/
/*eslint camelcase: 0*/
/*eslint complexity: 0*/
import React, {Component, PropTypes} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';

import {handleConfiguration} from '../actions';

import Settings from './Settings.jsx';
import Chart from './Chart.jsx';
import LogBox from './LogBox.jsx';
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
                { this.props.show ? <Row> <Settings /> </Row> : null }
                { this.props.show
                    ? <Row>
                        <Col md={12}>
                            <span>
                              Demo application, please use the console for detailed output.
                              Build commit: <a href={process.env.GIT_LINK}>{process.env.GIT_HASH}</a>
                            </span>
                        </Col>
                    </Row>
                    : null }
                  <Row>
                      <Col md={12}>
                          <Chart />
                      </Col>
                  </Row>
                  { this.props.show
                      ? <Row>
                            <div style={{marginTop: '100px'}}/>
                            <Col md={12}>
                                <LogBox />
                            </Col>
                         </Row>
                        : null }
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
        data_configuration: PropTypes.shape({
            source: PropTypes.string,
            measure: PropTypes.string,
            attribute: PropTypes.string,
            dimension_elements: PropTypes.arrayOf(PropTypes.string),
        }),
        ui_configuration: PropTypes.shape({
            ui_container: PropTypes.string.isRequired,
            show_ui_elements: PropTypes.bool,
            chart_name: PropTypes.string
        }).isRequired
    }).isRequired
};

function mapStateToProps(state) {
    const {mainReducer} = state;
    return {
        popoverTitle: mainReducer.get('popoverTitle'),
        showPopover: mainReducer.get('showPopover'),
        show: (mainReducer.get('userConfiguration') &&
            'ui_configuration' in mainReducer.get('userConfiguration') &&
            'show_ui_elements' in mainReducer.get('userConfiguration').ui_configuration)
            ? mainReducer.get('userConfiguration').ui_configuration.show_ui_elements
            : true
    };
}

export default connect(mapStateToProps)(Main);
