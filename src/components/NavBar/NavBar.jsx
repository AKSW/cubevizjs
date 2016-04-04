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
        return {facets: null,
                context: -1};
    },
    /*eslint-disable */
    handleContextChange(event, index, value) {
        this.setState({context: value});
    },
    handleFacetsChange() {
        this.setState({facets :this.refs.input.getValue()});
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
              <Input ref="input" type="select" label="Choose Facets..." onChange={this.handleFacetsChange} multiple>
                {this.props.facets.map(function(f, i) {
                    return(<option key={i} value={f}>{f}</option>);
                })}
              </Input>
            </Row>
          </Grid>
      );
    }
});

export default NavBar;
