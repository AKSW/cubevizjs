/*eslint no-unused-vars: 0*/
/*eslint no-console: 0*/
/*eslint no-debugger: 0*/

import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

import Settings from './Settings/Settings.jsx';
import Chart from './Chart.jsx'; //FIXME does not rerender after new facet selection
import Dialog from 'material-ui/lib/dialog';
import CircularProgress from 'material-ui/lib/circular-progress';

import {importingChannel} from '../stores/SettingsStore.js';

const contentStyle = {
    width: '20%',
    maxWidth: 'none',
};

const CubeVizApp = React.createClass({
    getInitialState() {
        return {
            showDialog: false
        };
    },
    componentWillMount() {
        importingChannel //TODO Remove quick and dirty
            .subject('importing.start')
            .subscribe(_ => {
                this.setState({showDialog: true});
            });
        importingChannel
            .subject('importing.finished')
            .subscribe(_ => {
                this.setState({showDialog: false});
            });
    },
    render() {
        return (
            <div id="cubevizapp" className="cubevizapp">
                <Grid>
                  <Row>
                      <Col md={12}><Settings /></Col>
                  </Row>
                  <Row>
                      <Col md={12}>
                          <Chart />
                      </Col>
                  </Row>
                </Grid>
                <Dialog
                    title="Importing Data"
                    modal={true}
                    contentStyle={contentStyle}
                    open={this.state.showDialog}
                    >
                    <CircularProgress />
                </Dialog>
            </div>
        );
    }
});

export default CubeVizApp;
