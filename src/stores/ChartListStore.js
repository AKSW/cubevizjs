/*eslint no-unused-vars: 0*/
/*eslint no-console: 0*/
/*eslint no-debugger: 0*/

import Rxmq from 'ecc-messagebus';
import * as CubeViz from './CubeViz/CubeViz.js';
import _ from 'underscore';

export const chartListChannel = Rxmq.channel('chartList');

chartListChannel
.subject('chartList.determineVisuals')
.subscribe(({selections, input}) => {

    const results = CubeViz.determineVisuals(input, CubeViz.Complexes[0], selections);
    const list =
        _.chain(results)
        .map(r => {
            const complex = r.complex;
            const visuals =
                _.chain(r.visuals)
                .sortBy('rank')
                .map(v => {
                    return _.extend(v,
                        {string: v.name + ' (complex: ' + complex + ', rank: ' + v.rank + ')'});
                })
                .value();

            return visuals;
        })
        .flatten()
        .value();

    chartListChannel.subject('chartList.loaded').onNext(_.extend(list, {facetCube: results.facetCube}));
});
