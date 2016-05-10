/*eslint no-unused-vars: 0*/
/*eslint no-console: 0*/
/*eslint no-debugger: 0*/
/*eslint max-params: 0*/

import React from 'react';

import TextField from 'material-ui/lib/text-field';
import Divider from 'material-ui/lib/divider';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FileInput from 'react-file-input';

import {inputChannel} from '../../stores/InputStore.js';

const Input = React.createClass({

    handleEndpointChange(event, index, value) {
        this.request({tag: 'endpointChanged', value});
    },
    handleCustomEPChange(event) {
        this.request({tag: 'endpointChanged', value: event.currentTarget.value});
    },
    handleFileChange(event) {
        this.request({tag: 'fileChanged', value: event.target.files[0]});
    },
    request(data) {
        inputChannel
            .request({topic: 'input.entered', data})
            .subscribe(result => {
                this.props.onInputChange(result);
            });
    },
    render() {
        return(
            <div>
                <SelectField
                    value={'http://test.org'}
                    onChange={this.handleEndpointChange}>
                    <MenuItem value={'http://test.org'} primaryText="Mortality EU"/>
                </SelectField><br/>
            <TextField hintText="Custom Sparql Endpoint..." onEnterKeyDown={this.handleCustomEPChange}/>
            <br/><br/>
            <form>
                <FileInput placeholder="File" onChange={this.handleFileChange}/>
            </form>
            <Divider/>
            </div>
        );
    }
});

export default Input;
