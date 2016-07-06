/*eslint no-unused-vars: 0*/
/*eslint no-console: 0*/
/*eslint no-debugger: 0*/
/*eslint func-style: 0*/
/*eslint max-nested-callbacks: 0*/

import Rxmq from 'ecc-messagebus';
import * as CubeViz from '../CubeViz.js';
import Immutable, {Map, List} from 'immutable';
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

    store.create()
    .then(() => store.load())
    .then(() => store.import())
    .then((data) => {
        dc = new DataCube(data);
        importingChannel.subject('importing.finished').onNext();
        selections = CubeViz.displayConfigureDimensions(dc);
        replySubject.onNext(
            selections.map(obj => {
                return Map({
                    header: DataCube.getValue(dc.getLabel(obj.get('dim'))),
                    elements: obj.get('dimEls').map(dimEl => DataCube.getValue(dc.getLabel(dimEl)))
                });
            }).toJS()
        );
        replySubject.onCompleted();
    })
    .catch(e => {
        console.log(e);
        importingChannel.subject('importing.finished').onNext();
    });
});

// String indexes ["0" "1"]
function getSelections(sel, indexes) {
    return indexes.reduce((list, i) => list.push(sel.get(i)), List());
}

// selections.get(0).get('dimEls').get(0)

export function dataSelectionChanged(dataSelection) {
    const s = Immutable.fromJS(dataSelection).map((indexes, identifier) => {
        const obj = selections.get(identifier);
        const dimEls = getSelections(obj.get('dimEls'), indexes);
        return dimEls;
    }).toList().flatten(1);
    chartListChannel
        .subject('chartList.determineVisuals')
        .onNext({selections: s, dataCube: dc});
}
