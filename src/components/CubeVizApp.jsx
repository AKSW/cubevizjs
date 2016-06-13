/*eslint no-unused-vars: 0*/
/*eslint no-console: 0*/
/*eslint no-debugger: 0*/

import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

import Settings from './Settings/Settings.jsx';
import Chart from './Chart.jsx'; //FIXME does not rerender after new facet selection
import Popover from 'material-ui/lib/popover/popover';
import CircularProgress from 'material-ui/lib/circular-progress';

import {importingChannel} from '../stores/SettingsStore.js';

const contentStyle = {
    marginTop: '100px',
    padding: 50,
    textAlign: 'center',
    fontSize: 'medium'
};

const CubeVizApp = React.createClass({
    getInitialState() {
        return {
            showPopover: false
        };
    },
    componentWillMount() {
        importingChannel //TODO Remove quick and dirty
            .subject('importing.start')
            .subscribe(_ => {
                this.setState({showPopover: true});
            });
        importingChannel
            .subject('importing.finished')
            .subscribe(_ => {
                this.setState({showPopover: false});
            });
    },
    render() {
        return (
            <div id="cubevizapp" className="cubevizapp">
                <Grid>
                  <Row>
                      <Col md={12}><Settings config={this.props.config}/></Col>
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
                    open={this.state.showPopover}
                    anchorEl={document.getElementById('cubevizapp')}
                    anchorOrigin={{horizontal: 'middle', vertical: 'center'}}
                    targetOrigin={{horizontal: 'middle', vertical: 'center'}}
                    style={contentStyle}>
                        <CircularProgress />< br/>< br/>
                        <b>Importing</b>
                </Popover>
            </div>
        );
    }
});

export default CubeVizApp;
