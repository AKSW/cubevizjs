/*eslint no-unused-vars: 0*/
/*eslint no-debugger:0*/
/*eslint no-console: 0*/
/*eslint func-style: 0*/
/*eslint complexity: 0*/

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {Toolbar, ToolbarGroup, ToolbarTitle, ToolbarSeparator} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';

import {showSettingsModal, hideSettingsModal} from '../actions';
import {handleAccept} from '../actions/dataCubeActions.js';

import Import from './Import.jsx';
import DataSelection from './DataSelection.jsx';
import DataSetSelection from './DataSetSelection.jsx';
import AttributeSelection from './AttributeSelection.jsx';
import ChartSelection from './ChartSelection.jsx';
import MeasureSelection from './MeasureSelection.jsx';

import {Button, ButtonGroup, ButtonToolbar} from 'react-bootstrap';

const modalComponents = {
    import: <Import />,
    dataSetSelection: <DataSetSelection />,
    dataSelection: <DataSelection />,
    attributeSelection: <AttributeSelection />,
    chartSelection: <ChartSelection />,
    measureSelection: <MeasureSelection />
};

const styles = {
    popover: {
        padding: 20,
    },
};

class Settings extends Component {

    handleTouchTap(tag, event) {
        if (tag === 'accept')
            this.props.dispatch(handleAccept());
        else
            this.props.dispatch(showSettingsModal(tag, event.currentTarget));
    }

    handleCloseRequest() {
        this.props.dispatch(hideSettingsModal());
    }

    render() {
        return (
            <div>
            <ButtonToolbar>
              <ButtonGroup bsSize="large">
                  <Button onClick={this.handleTouchTap.bind(this, 'import')}>Import</Button>
                  <Button onClick={this.handleTouchTap.bind(this, 'dataSetSelection')}>Datasets</Button>
                  <Button onClick={this.handleTouchTap.bind(this, 'measureSelection')}>Measures</Button>
                  <Button onClick={this.handleTouchTap.bind(this, 'attributeSelection')}>Attributes</Button>
                  <Button onClick={this.handleTouchTap.bind(this, 'dataSelection')}>Dimensions</Button>
                  <Button bsStyle="primary" onClick={this.handleTouchTap.bind(this, 'accept')}>OK</Button>
              </ButtonGroup>
              <ButtonGroup bsSize="large">
                  <Button onClick={this.handleTouchTap.bind(this, 'chartSelection')}>Charts</Button>
              </ButtonGroup>
            </ButtonToolbar>
              <Popover
                 open={(this.props.modalType) ? true : false}
                 anchorEl={(this.props.modalType) ? this.props.anchorEl : null}
                 anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                 targetOrigin={{horizontal: 'left', vertical: 'top'}}
                 onRequestClose={this.handleCloseRequest.bind(this)}>
                 <div style={styles.popover}>
                    {(this.props.modalType) ? modalComponents[this.props.modalType] : null}
                 </div>
              </Popover>
            </div>
        );
    }
}

Settings.propTypes = {
    modalType: PropTypes.string,
    anchorEl: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const {settingsReducer} = state;
    return {
        modalType: settingsReducer.get('modalType'),
        anchorEl: settingsReducer.get('anchorEl')
    };
}

export default connect(mapStateToProps)(Settings);
