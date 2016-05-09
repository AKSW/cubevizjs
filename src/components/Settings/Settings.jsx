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
import InputTest from '../Input/Input.jsx';
import Input from './Input.jsx';

import {facetsSettingsChannel, facetsChanged} from '../../stores/SettingsStore.js';

const styles = {
    popover: {
        padding: 20,
    },
};

let popoverComponent;

const Settings = React.createClass({

    getInitialState() {
        return {
            facets: [],
            open: false,
        };
    },
    componentWillMount() {

        facetsSettingsChannel
            .request({topic: 'settings.facets.init', data: InputTest})
            .subscribe(facets => {

                this.setState({facets});
            });
    },
    handleTouchTap(tag, event) {

        if (tag === 1) {
            popoverComponent = <Facets facets={this.state.facets} onFacetsChange={this.onFacetsChange}/>;
        } else {
            popoverComponent = <Input/>;
        }

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

        facetsChanged(facets);
    },
    render() {
        return(
          <Toolbar>
              <ToolbarGroup float="left">
                  <ToolbarTitle text="CubeViz Settings" />
              <RaisedButton tag="1" label="Input Source" primary={true} onTouchTap={this.handleTouchTap.bind(this, 0)}/>
              <RaisedButton tag="2" label="Select Data" primary={true} onTouchTap={this.handleTouchTap.bind(this, 1)}/>
              </ToolbarGroup>
              <Popover
                  open={this.state.open}
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                  onRequestClose={this.handleRequestClose}>
                  <div style={styles.popover}>
                     {popoverComponent}
                  </div>
              </Popover>
          </Toolbar>
        );
    }
});

export default Settings;
