/*eslint no-unused-vars: 0*/
/*eslint no-debugger:0*/

import React from 'react';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import RaisedButton from 'material-ui/lib/raised-button';
import Popover from 'material-ui/lib/popover/popover';

import Facets from './Facets.jsx';
//TODO: Implement Input
import Input from '../Input/Input.jsx';

import {facetsSettingsChannel} from '../../stores/SettingsStore.js';
import {chartListChannel} from '../../stores/ChartListStore.js';
import {newLog} from '../../stores/LogBoxStore.js';

const Settings = React.createClass({

    getInitialState() {
        return {
            facets: [],
            open: false,
        };
    },
    componentWillMount() {

        newLog('Input: ');
        newLog('Dimensions: ' + Input.dimensions);
        newLog('Obs: ' + Input.obs.length);

        facetsSettingsChannel
            .request({topic: 'settings.facets.init', data: Input})
            .subscribe(facets => {
                this.setState({facets});
            });
    },
    handleTouchTap(event) {
        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    },
    handleRequestClose() {
        this.setState({
            open: false,
        });
    },
    onFacetsChange(facets) {

        chartListChannel
            .subject('chartList.determineVisuals')
            .onNext({facets, input: Input});
    },
    render() {
        return(
          <Toolbar>
              <ToolbarGroup float="left">
                  <ToolbarTitle text="CubeViz Settings" />
                  <RaisedButton label="Choose Facets" primary={true} onTouchTap={this.handleTouchTap}/>
              </ToolbarGroup>
              <Popover
                  open={this.state.open}
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                  onRequestClose={this.handleRequestClose}>
                  <Facets facets={this.state.facets} onFacetsChange={this.onFacetsChange}/>
              </Popover>
          </Toolbar>
        );
    }
});

export default Settings;
