/*eslint no-unused-vars: 0*/
/*eslint no-console: 0*/

import Rxmq from 'ecc-messagebus';
import * as CubeViz from './CubeViz/CubeViz.js';

export const facetsSettingsChannel = Rxmq.channel('settings.facets');

facetsSettingsChannel
.subject('settings.facets.init')
.subscribe(({data: input, replySubject}) => {
    replySubject.onNext(CubeViz.displayConfigureDimensions(input));
    replySubject.onCompleted();
});
