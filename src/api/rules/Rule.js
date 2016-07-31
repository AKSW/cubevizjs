/*eslint no-debugger:0*/
/*eslint no-console:0*/
/*eslint no-unused-vars: 0*/

import Immutable, {List, Map} from 'immutable';
import {CompositeSpecification} from 'ts-specification';
import {SingleElementDimensionSpec, MultiElementDimensionSpec} from '../spec/BasicSpecs.js';

export default class Rule extends CompositeSpecification {


    /**
     * constructor - Rule class expects ruleSets to be Immutable.js data type
     *
     * @param  {Immutable} ruleSets description
     */
    constructor(ruleSets) {
        super();
        if (!ruleSets.has('mandatory'))
            throw new Error('Rulesets has no "mandatory" ruleset.');

        this._ruleSets = ruleSets;
    }


    /**
     * getRules - Returns all rules from one rule set
     *
     * @param  {Immutable.Map} ruleSet description
     * @return {Immutable.List}         rules
     */
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

    getSatisfiedMandatoryRules(dc) {
        const mandatoryRules = this._ruleSets.get('mandatory')
            .first()
            .filter(rule => this.isRuleSatisfiedBy(rule, dc));
        return mandatoryRules;
    }

    getDimensions(extractor, dc) {
        const dimensionsExtractor = extractor;
        if (dimensionsExtractor)
            return dimensionsExtractor.dimensionsConstraint(dimensionsExtractor.constraint(), dc);
        return List();
    }

    getSingleElementDimensions(dc) {
        const mandatoryRules = this.getSatisfiedMandatoryRules(dc);
        if (!this.isSatisfiedBy(dc) || mandatoryRules.size === 0)
            return List();
        return this.getDimensions(mandatoryRules.first().singleElementDimensions, dc);
    }

    getMultiElementDimensions(dc) {
        const mandatoryRules = this.getSatisfiedMandatoryRules(dc);
        if (!this.isSatisfiedBy(dc) || mandatoryRules.size === 0)
            return List();

        return this.getDimensions(mandatoryRules.first().multiElementDimensions, dc);
    }
    /**
     * getScore - Sums up all scores from satisfied rules
     *
     * @param  {DataCube} dc data cube
     * @return {number}    Sum of score
     */
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
