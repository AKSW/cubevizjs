/*eslint no-unused-vars: 0*/
/*eslint no-console: 0*/
/*eslint no-debugger: 0*/

import React from 'react';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

import {chartListChannel} from '../stores/ChartListStore.js';
import {chartChannel} from '../stores/ChartStore.js';
import {newLog, logDimEls} from '../stores/LogBoxStore.js';

const ChartList = React.createClass({
    getInitialState() {
        return {
            charts: [],
            selectionCube: {}
        };
    },
    componentWillMount() {

        chartListChannel
            .subject('chartList.loaded')
            .subscribe(data => {
                this.setState({charts: data.list, selectionCube: data.selectionCube});
            });
    },
    onChartSelect(event, value) {

        chartChannel
        .subject('chart.convertToChart')
        .onNext(
            {
                chart: this.state.charts[value],
                selectionCube: this.state.selectionCube
            }
        );
    },
    render() {
        return (
            <Menu onChange={this.onChartSelect}>
              <MenuItem primaryText="Determined Charts" disabled={true} />
              {this.state.charts.map(function(el, i) {
                  return(<MenuItem key={i} value={i} primaryText={el.string}
                      style={{
                          fontSize: '80%'
                      }}
                  />);
              })}
            </Menu>
        );
    }
});

export default ChartList;
