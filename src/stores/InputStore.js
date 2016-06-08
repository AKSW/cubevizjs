/*eslint no-unused-vars: 0*/
/*eslint no-console: 0*/
/*eslint no-debugger: 0*/
/*eslint max-params: 0*/
/*eslint func-style: 0*/

import Rxmq from 'ecc-messagebus';
import Immutable from 'immutable';

import DataCube from '../assets/DefaultDataCube.js';

import $ from 'jquery';

export const inputChannel = Rxmq.channel('input');

function request(url, dataType, cb) {
    $.ajax(url, {
        dataType,
        success: (result, status, xhr) => {
            cb(result);
        },
        error: (xhr, status, error) => {
            console.log('Error: ' + status);
        }
    });
}

function isFileUrl(url) {
    return url.match(/\.([^\./\?]+)($|\?)/) !== null;
}

const getInput = {
    endpointChanged(v, cb) {
        if (isFileUrl(v)) {
            request(v, 'text', (r) => {
                cb({type: 'text', value: r});
            });
        } else {
            request(v, 'text', (r) => {
                cb({type: 'endpoint', value: v});
            });
        }
    },

    fileChanged(v, cb) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const rdf = e.target.result;
            cb({type: 'text', value: rdf});
        };
        const data = reader.readAsText(v);//TODO check if v is a text
    },

    default(v, cb) {
        cb({type: 'text', value: DataCube});
    }
};

function finished(input, replySubject) {
    replySubject.onNext(input);
    replySubject.onCompleted();
}

inputChannel
    .subject('input.entered')
    .subscribe(({data, replySubject}) => {
        if (getInput[data.tag])
            getInput[data.tag](data.value, i => finished(i, replySubject));
        else
            throw new Error('Unkown input change.');
    });
