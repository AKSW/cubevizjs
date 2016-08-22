/*eslint no-unused-vars: 0*/
/*eslint no-debugger:0*/
/*eslint no-console: 0*/
/*eslint func-style: 0*/

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {changeLogBoxVisibility} from '../actions';
import ExpandableTextBox from '../components/ExpandableTextBox.jsx';

class LogBox extends Component {

    onChange(isOpened) {
        this.props.dispatch(changeLogBoxVisibility(isOpened));
    }

    render() {
        return (
            <ExpandableTextBox
                onChange={this.onChange.bind(this)}
                open={this.props.open}
                text={this.props.text}
                title={this.props.title}/>
        );
    }
}

LogBox.propTypes = {
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const {mainReducer} = state;
    const open = mainReducer.get('logBoxVisible');
    return {
        text: mainReducer.get('logBoxText'),
        open,
        title: open ? 'Log Box (Click to close)' : 'Log Box (Click to open)'
    };
}

export default connect(mapStateToProps)(LogBox);
