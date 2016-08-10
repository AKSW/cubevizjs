/*eslint no-unused-vars: 0*/
/*eslint no-console: 0*/
/*eslint no-debugger: 0*/
/*eslint func-style: 0*/
/*eslint max-params: 0*/
/*eslint complexity: 0*/

import SparqlStore from './SparqlStore.js';
import * as Queries from '../ICQueries.js';

import {promises} from 'jsonld';
import Ajax from 'simple-ajax';

class RemoteStore extends SparqlStore {
    constructor(url) {
        super();
        this.url = url;
        this.request = null;
    }

    parse(graph) {
        return promises.fromRDF(graph, {format: 'application/nquads'});
    }

    execute(query) {
        return new Promise((fulfill, reject) => {
            const ajax = new Ajax({
                url: this.url,
                requestedWith: false,
                cache: false,
                dataType: 'text',
                data: {
                    query,
                    format: 'text/plain'
                }
            });
            ajax.on('success', event => fulfill(event.target.responseText));
            ajax.on('error', event => reject(event.target.status));
            ajax.send();
        });
    }

    create() {
        return (this.url) ? Promise.resolve(this) : Promise.reject(this);
    }

    load() {
        return (this.url) ? Promise.resolve(this) : Promise.reject(this);
    }

    verify() {

        return Promise.all([
            this.execVerification(Queries.IC1),
            this.execVerification(Queries.IC2),
            this.execVerification(Queries.IC3),
            this.execVerification(Queries.IC4),
            this.execVerification(Queries.IC6),
            this.execVerification(Queries.IC11),
            this.execVerification(Queries.IC12),
            this.execVerification(Queries.IC13),
            this.execVerification(Queries.IC14),
            this.execVerification(Queries.IC15),
            this.execVerification(Queries.IC16),
        ])
        .then(_ => this, e => {
            console.log(e);
            return this;
        });
    }
}

export default RemoteStore;
