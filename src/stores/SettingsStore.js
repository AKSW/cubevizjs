/*eslint no-unused-vars: 0*/
/*eslint no-console: 0*/
/*eslint no-debugger: 0*/
/*eslint func-style: 0*/

import Rxmq from 'ecc-messagebus';
import * as CubeViz from '../CubeViz.js';
import Immutable from 'immutable';
import DataCube from '../DataCube.js';
import SparqlStore from '../SparqlStore.js';

import {chartListChannel} from './ChartListStore.js';

export const facetsSettingsChannel = Rxmq.channel('settings.facets');

let selections = [];
let dc = DataCube.empty();

facetsSettingsChannel
.subject('settings.facets.init')
.subscribe(({data: input, replySubject}) => {

    const store = new SparqlStore(input);
    store.start()
    .then(() => store.load())
    .then(() => {
        dc = new DataCube(store);
        return dc.start();
    })
    .then(() => {
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
