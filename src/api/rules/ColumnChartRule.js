/*eslint func-style: [2, "declaration"]*/
/*eslint no-debugger:0*/
/*eslint no-unused-vars: 0*/

import PieChartRule from './PieChartRule.js';

export default class ColumnChartRule extends PieChartRule {
    getName() {
        return 'cvColumnChart';
    }
}
