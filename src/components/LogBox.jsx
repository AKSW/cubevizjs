import React from 'react';
import {Panel} from 'react-bootstrap';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

import {logBoxChannel} from '../stores/LogBoxStore.js';

const LogBox = React.createClass({
    getInitialState() {
        return {
            logs: []
        };
    },
    componentWillMount() {
        logBoxChannel
            .subject('logbox.newlog')
            .subscribe(log => {
                const logs = this.state.logs;
                logs.push(log);
                this.setState({logs});
            });
    },
    render() {
        return (
          <Panel header={<h6>Log Box</h6>}>
              <List>
                  {this.state.logs.map(function(log, i) {
                      return (<ListItem key={i} value={i} primaryText={log}
                        style={{
                            fontSize: '80%'
                        }} />);
                  })}
              </List>
          </Panel>
        );
    }
});

export default LogBox;
