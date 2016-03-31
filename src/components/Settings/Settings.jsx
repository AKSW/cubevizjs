import React from 'react';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';

const ContextDropDownMenu = React.createClass({
    getInitialState() {
        return {value: 0};
    },

    /*eslint-disable */
    handleChange(event, index, value) {
        this.setState({value});
    },
    /*eslint-enable */
    render() {
        return (
            <DropDownMenu value={this.state.value} onChange={this.handleChange}>
              <MenuItem value={1} primaryText="Softwareentwicklung"/>
              <MenuItem value={2} primaryText="Personen"/>
            </DropDownMenu>
      );
    }
});

export {ContextDropDownMenu};
