/*eslint no-unused-vars: 0*/
/*eslint no-console: 0*/
/*eslint no-debugger: 0*/
/*eslint func-style: 0*/
/*eslint max-params: 0*/
/*eslint complexity: 0*/

import SparqlStore from './SparqlStore.js';

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

    getDatasets() {
        return this.execute(this.datasetQuery()).then(this.parse);
    }

    getDsd(dataset) {
        return this.execute(this.dsdQuery(dataset['@id'])).then(this.parse);
    }

    getCs(dsd) {
        return this.execute(this.csQuery(dsd));
    }

    getDimensions(ds, dsd) {
        return this.execute(this.componentQuery(ds['@id'], dsd['@id'], 'http://purl.org/linked-data/cube#dimension'))
            .then(this.parse);
    }

    getMeasure(ds, dsd) {
        return this.execute(this.componentQuery(ds['@id'], dsd['@id'], 'http://purl.org/linked-data/cube#measure'))
            .then(this.parse);
    }

    getDimElements(dim, dataset) {
        return this.execute(this.dimElementsQuery(dim['@id'], dataset['@id'])).then(this.parse);
    }

    getObservations(dataset) {
        return this.execute(this.observationsQuery(dataset['@id'])).then(this.parse);
    }
    getAllTriples() {
        return this.execute(this.allTriplesQuery()).then(this.parse);
    }
}

export default RemoteStore;
