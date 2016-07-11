/*eslint func-style: [2, "declaration"]*/
/*eslint no-debugger:0*/
/*eslint no-unused-vars: 0*/

import Immutable, {List, Map} from 'immutable';

export class Rule {


    /**
     * constructor - Rule class expects ruleSets to be Immutable.js data type.
     *
     * @param  {Immutable} ruleSets description
     */
    constructor(ruleSets) {
        this.ruleSets = ruleSets;
        this.sufficientlySatisfied = false;
    }

    satisfy(dc) {

        // const satisfiedHeatmapRules = heatmapRules.map(
        //     rulesSets => rulesSets.map(ruleSet => ruleSet.find(r => r.rule.isSatisfiedBy(dataCube)))
        // );
    }
}
