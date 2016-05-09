/*eslint no-unused-vars: 0*/
/*eslint no-console: 0*/
/*eslint no-debugger: 0*/
/*eslint max-params: 0*/
/*eslint func-style: 0*/

import Rxmq from 'ecc-messagebus';
import Immutable from 'immutable';

import N3 from 'n3';
import * as jsonld from 'jsonld';

export const inputChannel = Rxmq.channel('input');

const getInput = {
    endpointChanged(v) {
        debugger;
    },
    fileChanged(v) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const rdf = e.target.result;

            // const parser = N3.Parser();
            // const results = {triples: [], prefixes: {}};
            // parser.parse(rdf,
            //   (error, triple, prefixes) => {
            //       if (triple) {
            //           results.triples.push(triple);
            //       } else {
            //           results.prefixes = prefixes;
            //           toJSON(results);
            //       }
            //   });

            jsonld.fromRDF(rdf, {format: 'application/nquads'}, (err, doc) => {
                console.log(err);

                debugger;
            });
        };
        const data = reader.readAsText(v);//TODO check if v is a text
    }
};

inputChannel
    .subject('input.entered')
    .subscribe(({data, replySubject}) => {

        if (getInput[data.tag]) {
            const input = getInput[data.tag](data.value);
            return input;
        }

        throw new Error('Unkown input change.');
    });
