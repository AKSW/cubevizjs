/*eslint no-console: 0*/

import React from 'react';
import ReactDOM from 'react-dom';
import {Grid, Row, Col} from 'react-bootstrap';
// import {ContextDropDownMenu} from './components/Settings/Settings.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import * as cubeViz from './stores/CubeViz/CubeViz.js';
import Input from './components/Input/input.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
// import {PieChart} from 'react-d3';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import _ from 'underscore';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const GridInstance = React.createClass({
    getInitialState() {
        return {visualList: [],
                visualResults: [],
                chart: null,
                facets: [],
                facetCube: null};
    },
    componentWillMount() {
        this.setState({facets: cubeViz.displayConfigureDimensions(Input)});
    },
    handleOnStart(settings) {
        const result = cubeViz.determineVisuals(Input, cubeViz.Complexes[0], settings);
        const list = _.map(result.visuals, (v) => {
            return v.visual.name;
        });

        this.setState({visualList: list,
                       facetCube: result.facetCube,
                       visualResults: result.visuals});
    },

    handleVisualSelect(event, value) {
        const chart = cubeViz.displayChart(this.state.visualResults[value].visual, this.state.facetCube);

        this.setState({chart});
    },
    render() {
        return (<Grid>
                  <NavBar onStart={this.handleOnStart} complexes={cubeViz.Complexes} facets={this.state.facets}/>
                  <Row>
                    <Col lg={2}>
                      <Menu onChange={this.handleVisualSelect}>
                        {this.state.visualList.map(function(name, i) {
                            return(<MenuItem key={i} value={i} primaryText={name}/>);
                        })}
                      </Menu>
                    </Col>
                    <Col lg={4} lgOffset={2}>
                        {this.state.chart}
                    </Col>
                  </Row>
                </Grid>);
    }
});

ReactDOM.render(<GridInstance />, document.getElementById('react'));
