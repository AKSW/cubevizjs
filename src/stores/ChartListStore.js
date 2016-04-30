/*eslint no-unused-vars: 0*/
/*eslint no-console: 0*/
/*eslint no-debugger: 0*/

import Rxmq from 'ecc-messagebus';
import * as CubeViz from './CubeViz/CubeViz.js';

export const chartListChannel = Rxmq.channel('chartList');

chartListChannel
.subject('chartList.determineVisuals')
.subscribe(({selections, input}) => {

    const selectionCube = CubeViz.createDataCube(selections, input);
    const results = CubeViz.determineVisuals(null, selectionCube);
    const list = results
        .flatMap(r => {

            const complex = r.get('complex');
            const visuals = r.get('visuals')
                .map(v => v.merge(
                    {string: v.get('name') + ' (complex: ' + complex + ', rank: ' + v.get('rank') + ')'}
                ));
            return visuals;
        });

    chartListChannel.subject('chartList.loaded').onNext({list: list.toJS(), selectionCube: selectionCube.toJS()});
});
