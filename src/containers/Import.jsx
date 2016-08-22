/*eslint no-unused-vars: 0*/
/*eslint no-debugger:0*/
/*eslint no-console: 0*/
/*eslint func-style: 0*/
/*eslint complexity: 0*/

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FileInput from 'react-file-input';

import {doImport} from '../actions';

class Import extends Component {

    handleEndpointChange(event, index, value) {
        this.request('default', value);
    }
    handleCustomEPChange(event) {
        if (event.keyCode === 13)
            this.request('endpoint', event.currentTarget.value);
    }
    handleFileChange(event) {
        this.request('fileUpload', event.target.files[0]);
    }
    request(importType, value) {
        this.props.dispatch(doImport(importType, value));
    }

    render() {
        return (
            <div>
                <SelectField
                    value="0"
                    onChange={this.handleEndpointChange.bind(this)}
                    labelStyle={{color: (this.props.importType === 'default') ? 'blue' : 'gray'}}>
                    <MenuItem value="0" primaryText="Mortality EU"/>
                </SelectField><br/>
            <TextField
                hintText= {
                    (this.props.importType === 'endpoint')
                        ? this.props.value
                        : 'Sparql endpoint or RDF file'
                    }
                onKeyDown={this.handleCustomEPChange.bind(this)}/>
            <br/><br/>
            <form>
                <FileInput placeholder= {
                        (this.props.importType === 'fileUpload') ? this.props.value : 'Upload RDF file'
                    }
                onChange={this.handleFileChange.bind(this)}/>
            </form>
            <Divider/>
            </div>
        );
    }
}

Import.propTypes = {
    importType: PropTypes.oneOf(['fileUpload', 'endpoint', 'default']).isRequired,
    dispatch: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    const {importReducer} = state;
    return {
        importType: importReducer.get('importType'),
        value: importReducer.get('value')
    };
}

export default connect(mapStateToProps)(Import);
