import React from 'react';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import MenuItem from 'material-ui/lib/menus/menu-item';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import RaisedButton from 'material-ui/lib/raised-button';
import {Grid, Row, Input} from 'react-bootstrap';

const NavBar = React.createClass({
    getInitialState() {
        return {facet: -1,
                context: -1};
    },
    /*eslint-disable */
    handleContextChange(event, index, value) {
        this.setState({context: value});
    },
    handleFacetChange() {
        console.log(this.refs.input.getValue());
        // this.setState({facet :value});
    },
        /*eslint-enable */
    handleStart() {
        this.props.onStart(this.state);
    },
    render() {
        return(
          <Grid>
            <Row>
              <Toolbar>
                <ToolbarGroup float="left">
                  <ToolbarTitle text="CubeViz" />
                  <ToolbarTitle text="TODO: Input" />
                  <DropDownMenu value={this.state.context} onChange={this.handleContextChange}>
                    <MenuItem value={-1} primaryText="Choose Context..."/>
                    {this.props.complexes.map(function(complex, i) {
                        return(<MenuItem key={i} value={complex.id} primaryText={complex.name}/>);
                    })}
                  </DropDownMenu>
                </ToolbarGroup>
                <ToolbarGroup float="right">
                    <ToolbarSeparator />
                    <RaisedButton label="Go" primary={true} onClick={this.handleStart}/>
                </ToolbarGroup>
              </Toolbar>
            </Row>
            <Row>
              <Input ref="input" type="select" label="Choose Facet..." onChange={this.handleFacetChange} multiple>
                {this.props.facets.map(function(f, i) {
                    return(<option key={i} value={i}>{f}</option>);
                })}
              </Input>
            </Row>
          </Grid>
      );
    }
});

export default NavBar;
