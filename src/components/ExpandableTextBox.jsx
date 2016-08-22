import React, {PropTypes} from 'react';
import {Accordion, AccordionItem} from 'react-sanfona';

class ExpandableTextBox extends React.Component {

    onChange({activeItems}) {
        this.props.onChange(activeItems.length === 0 ? false : true);
    }

    render() {
        return (
            <Accordion
                style={{
                    backgroundColor: this.context.muiTheme.appBar.color,
                    fontFamily: this.context.muiTheme.fontFamily,
                    padding: '5px'
                }}
                onChange={this.onChange.bind(this)}
                activeItems={this.props.open ? [0] : []}>
                <AccordionItem title={this.props.title}>
                    <textarea style={{minWidth: '100%', maxWidth: '100%'}} value={this.props.text} readOnly/>
                </AccordionItem>
           </Accordion>
        );
    }
}

ExpandableTextBox.contextTypes = {
    muiTheme: PropTypes.object.isRequired,
};

export default ExpandableTextBox;
