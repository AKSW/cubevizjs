/*eslint no-unused-vars: 0*/
/*eslint no-console: 0*/
/*eslint no-debugger: 0*/
/*eslint func-style: 0*/
/*eslint max-params: 0*/
/*eslint complexity: 0*/

import SparqlStore from './SparqlStore.js';

import {promises} from 'jsonld';
import $ from 'jquery';

class RemoteStore extends SparqlStore {
    constructor(url) {
        super();
        this.url = url;
    }

    parse(graph) {
        return promises.fromRDF(graph, {format: 'application/nquads'});
    }

    execute(query) {
        return new Promise((fulfill, reject) => {
            $.ajax(this.url, {
                cache: false,
                dataType: 'text',
                data: {
                    query
                },
                success: (result, status, xhr) => fulfill(result),
                error: (xhr, status, error) => reject(status)
            });
        });
    }

    start() {
        return Promise.resolve(this);
    }

    load() {
        return Promise.resolve(this);
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
