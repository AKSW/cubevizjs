/*eslint no-unused-vars: 0*/
/*eslint no-console: 0*/
/*eslint no-debugger: 0*/
/*eslint func-style: 0*/

import Rxmq from 'ecc-messagebus';
import * as CubeViz from '../CubeViz.js';
import Immutable from 'immutable';
import DataCube from '../DataCube.js';
import SparqlStore from '../SparqlStore.js';
import RemoteStore from '../RemoteStore.js';

import {chartListChannel} from './ChartListStore.js';

export const facetsSettingsChannel = Rxmq.channel('settings.facets');
export const importingChannel = Rxmq.channel('importing');

let selections = [];
let dc = DataCube.empty();

facetsSettingsChannel
.subject('settings.data.init')
.subscribe(({data: input, replySubject}) => {
    importingChannel.subject('importing.start').onNext();

    let store;
    if (input.type === 'text')
        store = new SparqlStore(input.value);
    else
        store = new RemoteStore(input.value);

    store.start()
    .then(() => store.load())
    .then(() => store.import())
    .then((data) => {
        dc = new DataCube(data);
        importingChannel.subject('importing.finished').onNext();
        selections = CubeViz.displayConfigureDimensions(dc);
        replySubject.onNext(
            selections.map(dimEl => dc.getLabel(dimEl).get('@value')).toJS()
        );
        replySubject.onCompleted();
    })
    .catch(console.log);
});

// String indexes ["0" "1"]
function getSelections(indexes) {

    return Immutable.fromJS(indexes)
        .reduce((list, i) => {return list.push(selections.get(i));},
        Immutable.List());
}

export function facetsChanged(facets) {
    const s = getSelections(facets);
    chartListChannel
        .subject('chartList.determineVisuals')
        .onNext({selections: s, dataCube: dc});
}
