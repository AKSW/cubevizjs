/*eslint func-style: 0*/
/*eslint complexity: 0*/
/*eslint no-unused-vars: 0*/

import {fromJS, Map, List} from 'immutable';
import DataCube from '../DataCube.js';

function getComponentUriFromComponentElement(compElUri, componentMap) {
    const uri = componentMap.findKey(compEls => compEls.find(el => el.get('@id') === compElUri));
    return uri;
}

export function mapUriToindex(uri, components) {

    const measure = components.findIndex(m => DataCube.getUri(m) === uri);

    if (measure !== -1)
        return measure;

    return -1;
}

export function mapUrisToindexes(uris, components) {
    const indexes = fromJS(uris).map(uri => {
        const componentUri = getComponentUriFromComponentElement(uri, components);
        if (componentUri === undefined)
            return undefined;
        const elementIndex = mapUriToindex(uri, components.get(componentUri));
        const componentIndex = components.keySeq().findIndex(k => k === componentUri);
        return [componentIndex, elementIndex.toString()];
    });

    if (indexes.some(i => i === undefined))
        return {};

    return indexes.reduce((map, arr) => {
        if (map.get(arr[0]))
            return map.set(arr[0], map.get(arr[0]).push(arr[1]));
        return map.set(arr[0], List([arr[1]]));
    }, Map())
    .toJS();
}
