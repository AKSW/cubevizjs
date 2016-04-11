/*eslint no-unused-vars: 0*/
/*eslint no-console: 0*/

import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

import Settings from './Settings/Settings.jsx';
import ChartList from './ChartList.jsx';
import Chart from './Chart.jsx';
import LogBox from './LogBox.jsx';

const CubeVizApp = React.createClass({
    render() {
        return (
            <div className="cubevizapp">
                <Grid>
                  <Row>
                      <Col md={12}><Settings /></Col>
                  </Row>
                  <Row>
                      <Col md={2}>
                          <ChartList />
                      </Col>
                      <Col md={8}>
                          <Chart />
                      </Col>
                      <Col md={2}>
                          <LogBox />
                      </Col>
                  </Row>
                </Grid>
            </div>
        );
    }
});

export default CubeVizApp;
