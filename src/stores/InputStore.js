/*eslint no-unused-vars: 0*/
/*eslint no-console: 0*/
/*eslint no-debugger: 0*/
/*eslint max-params: 0*/
/*eslint func-style: 0*/

import Rxmq from 'ecc-messagebus';
import Immutable from 'immutable';

import * as jsonld from 'jsonld';

export const inputChannel = Rxmq.channel('input');

const getInput = {
    endpointChanged(v, cb) {
    },
    fileChanged(v, cb) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const rdf = e.target.result;

            jsonld.fromRDF(rdf, {format: 'application/nquads'}, (err, doc) => {
                console.log('Import Error:' + err);

                cb(Immutable.fromJS(doc));
            });
        };
        const data = reader.readAsText(v);//TODO check if v is a text
    }
};

function finished(input, replySubject) {
    replySubject.onNext(input);
    replySubject.onCompleted();
}

inputChannel
    .subject('input.entered')
    .subscribe(({data, replySubject}) => {

        if (getInput[data.tag]) {
            getInput[data.tag](data.value, i => finished(i, replySubject));
        } else {
            throw new Error('Unkown input change.');
        }
    });
