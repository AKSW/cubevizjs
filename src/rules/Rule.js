/*eslint no-debugger:0*/
/*eslint no-console:0*/
/*eslint no-unused-vars: 0*/

import Immutable, {List, Map} from 'immutable';
import {CompositeSpecification} from 'ts-specification';

export default class Rule extends CompositeSpecification {


    /**
     * constructor - Rule class expects ruleSets to be Immutable.js data type.
     *
     * @param  {Immutable} ruleSets description
     */
    constructor(ruleSets) {
        super();
        if (!ruleSets.has('mandatory'))
            throw new Error('Rulesets has no "mandatory" ruleset.');

        this._ruleSets = ruleSets;
    }

    getRules(ruleSet) {
        return ruleSet.flatten(1);
    }

    getAllRules() {
        return this._ruleSets.map(ruleSet => this.getRules(ruleSet)).toList().flatten(1);
    }

    isRuleSatisfiedBy(rule, dc) {
        return rule.spec.isSatisfiedBy(dc);
    }

    getSatisfiedRules(dc) {
        return this.getAllRules().filter(rule => this.isRuleSatisfiedBy(rule, dc));
    }

    getNotsatisfiedRules(dc) {
        return this.getAllRules().filter(rule => !this.isRuleSatisfiedBy(rule, dc));
    }

    getScore(dc) {

        if (!this.isSatisfiedBy(dc))
            return 0;

        return this.getSatisfiedRules(dc).reduce((sum, rule) => {
            if (rule.score)
                return sum + rule.score;
            return sum;
        }, 0);
    }

    getName() {
        return 'cvRule';
    }

    isSatisfiedBy(dc) {

        const mandatory = this._ruleSets.get('mandatory');
        const isSatisfied = mandatory
            .map(rules => rules.find(rule => this.isRuleSatisfiedBy(rule, dc)))
            .every(isSat => isSat !== undefined);

        return isSatisfied;
    }
}
