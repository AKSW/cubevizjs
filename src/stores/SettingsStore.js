/*eslint no-unused-vars: 0*/
/*eslint no-console: 0*/
/*eslint no-debugger: 0*/
/*eslint func-style: 0*/

import Rxmq from 'ecc-messagebus';
import * as CubeViz from '../CubeViz.js';
import Immutable from 'immutable';
import * as jsonld from 'jsonld';
import DataCube from '../DataCube.js';

import {chartListChannel} from './ChartListStore.js';

export const facetsSettingsChannel = Rxmq.channel('settings.facets');

let selections = [];
let dc = DataCube.empty();

facetsSettingsChannel
.subject('settings.facets.init')
.subscribe(({data: input, replySubject}) => {

    jsonld.fromRDF(input, {format: 'application/nquads'}, (err, doc) => {
        console.log(err);

        const immutable = Immutable.fromJS(doc);


        dc = new DataCube(immutable);
        selections = CubeViz.displayConfigureDimensions(dc);

        replySubject.onNext(
            selections.map(dimEl => dc.getLabel(dimEl).get('@value')).toJS()
        );
        replySubject.onCompleted();
    });
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