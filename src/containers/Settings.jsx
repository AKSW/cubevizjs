/*eslint no-unused-vars: 0*/
/*eslint no-debugger:0*/
/*eslint no-console: 0*/
/*eslint func-style: 0*/

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import RaisedButton from 'material-ui/lib/raised-button';
import Popover from 'material-ui/lib/popover/popover';

import {showSettingsModal, hideSettingsModal} from '../actions';

import Import from './Import.jsx';

const modalComponents = {
    import: <Import />,
    dataSelection: '',
    chartSelection: ''
};

const styles = {
    popover: {
        padding: 20,
    },
};

class Settings extends Component {

    handleTouchTap(tag, event) {
        this.props.dispatch(showSettingsModal(tag, event.currentTarget));//TODO Dont save complete dom el
    }

    handleCloseRequest() {
        this.props.dispatch(hideSettingsModal());
    }

    render() {
        return (
          <Toolbar>
              <ToolbarGroup float="left">
                  <ToolbarTitle text="CubeViz" />
                  <RaisedButton
                    label="Import Source"
                    primary={true}
                    onTouchTap={this.handleTouchTap.bind(this, 'import')}/>
                  <RaisedButton
                    label="Select Data"
                    primary={true}
                    onTouchTap={this.handleTouchTap.bind(this, 'dataSelection')}/>
                  <RaisedButton
                    label="Charts"
                    primary={true}
                    onTouchTap={this.handleTouchTap.bind(this, 'chartSelection')}/>
              </ToolbarGroup>
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
          </Toolbar>
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
