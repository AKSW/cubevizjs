/*eslint no-unused-vars: 0*/
/*eslint no-console: 0*/
/*eslint no-debugger: 0*/
/*eslint max-params: 0*/
/*eslint func-style: 0*/
import immutable from 'immutable';
import fetch from 'isomorphic-fetch';

import DataCube from '../assets/DefaultDataCube.js';

export const IMPORT_TYPE_FILE_UPLOAD = 'fileUpload';
export const IMPORT_TYPE_ENDPOINT = 'endpoint';
export const IMPORT_TYPE_DEFAULT = 'default';

function request(url) {
    return fetch(url, {
        method: 'GET'
    });
}

function isURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(str);
}

function isFileUrl(url) {
    return url.match(/\.([^\./\?]+)($|\?)/) !== null;
}
const getImport = {
    endpoint(v) {
        if (!isURL(v)) //FIXME nonsense input
            return Promise.reject('NOT VALID URL ERROR');
        if (isFileUrl(v)) {
            return request(v)
                .then(res => res.text())
                .then(res => ({dataType: 'triple', value: res}));
        }

        return request(v).then(() => ({dataType: 'endpoint', value: v}));
    },

    fileUpload(v) {
        if (v.size / 1000000 > 15.0)
            throw new Error('Currently CubeViz cannot handle files bigger than 15 MB.');
        if (!v.type.match('text.*') && v.type !== '') // '', because not all rdf mime types are recognized
            throw new Error('Wrong file type. Only text files are supported.');

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (res) => {
                const triple = res.target.result;
                resolve({dataType: 'triple', value: triple});
            };
            reader.onerror = (err) => reject(err);

            const data = reader.readAsText(v);
        });
    },

    default(_) {
        return Promise.resolve({dataType: 'triple', value: DataCube});
    }
};

export default function imprt({importType, value}) {
    if (getImport[importType])
        return getImport[importType](value);

    return Promise.reject(new Error('UNKOWN IMPORT TYPE ERROR'));
}
