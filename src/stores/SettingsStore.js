/*eslint no-unused-vars: 0*/
/*eslint no-console: 0*/
/*eslint no-debugger: 0*/
/*eslint func-style: 0*/

import Rxmq from 'ecc-messagebus';
import * as CubeViz from './CubeViz/CubeViz.js';
import Immutable from 'immutable';

export const facetsSettingsChannel = Rxmq.channel('settings.facets');

let selections = [];

facetsSettingsChannel
.subject('settings.facets.init')
.subscribe(({data: input, replySubject}) => {

    selections = CubeViz.displayConfigureDimensions(input);

    replySubject.onNext(
        selections.map(dimEl => {return dimEl.get('cvNiceLabel'); }).toJS()
    );
    replySubject.onCompleted();
});

// String indexes ["0" "1"]
export function getSelections(indexes) {

    return Immutable.fromJS(indexes)
        .reduce((list, i) => {return list.push(selections.get(i));},
        Immutable.List());
}
