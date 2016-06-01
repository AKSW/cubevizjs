/*eslint no-unused-vars: 0*/
/*eslint no-console: 0*/
/*eslint no-debugger: 0*/
/*eslint func-style: 0*/
/*eslint max-params: 0*/
/*eslint complexity: 0*/

import Promise from 'promise';
import RdfStore from 'rdfstore';
import {promises} from 'jsonld';

function datasetQuery() {
    return 'CONSTRUCT { ?s ?p ?o } ' +
    'WHERE { ' +
        '?s <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#DataSet>. ' +
        '?s ?p ?o . ' +
    '} ';
}

function dsdQuery(dataset) {
    return 'CONSTRUCT  {?dsd ?p ?o}' +
            'WHERE { ' +
                '<' + dataset + '> <http://purl.org/linked-data/cube#structure> ?dsd . ' +
                '?dsd ?p ?o . ' +
            '}';
}

function csQuery(dsd) {
    return 'SELECT ?o ' +
            'WHERE { ' +
                '<' + dsd + '> <http://purl.org/linked-data/cube#component> ?o ' +
            '}';
}

function dimElementsQuery(dim, dataset) {
    return 'CONSTRUCT {?s ?p ?o } ' +
        'WHERE { ' +
           '?ob <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#Observation>. ' +
           '?ob <http://purl.org/linked-data/cube#dataSet> <' + dataset + '>. ' +
           '?ob <' + dim + '> ?s. ' +
           '?s ?p ?o . ' +
        '}';
}

function observationsQuery(dataset) {
    return 'CONSTRUCT { ?s ?p ?o } ' +
        'WHERE { ' +
           '?s <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#Observation>. ' +
           '?s <http://purl.org/linked-data/cube#dataSet> <' + dataset + '>. ' +
           '?s ?p ?o . ' +
        '}';
}

function componentQuery(ds, dsd, component) {
    return 'CONSTRUCT {?comptype ?p ?o} ' +
        'WHERE { ' +
            '<' + ds + '> <http://purl.org/linked-data/cube#structure> <' + dsd + '>  . ' +
            '<' + dsd + '> <http://purl.org/linked-data/cube#component> ?s . ' +
            '?s <' + component + '> ?comptype . ' +
            '?comptype ?p ?o  .' +
        '}';
}

class SparqlStore {

    constructor(triple) {
        this.triple = triple;
        this.internalStore = null;
    }


    /**
     * parse - Parse graph object from rdfstore with jsonld.
     *
     * @param  {type} graph Graph object returned from rdfstrore by executing
     * a CONSTRUCT query.
     * @return {type} jsonld object array
     */
    parse(graph) {
        return promises.fromRDF(graph.toNT(), {format: 'application/nquads'});
    }

    execute(query) {
        return new Promise((fulfill, reject) => {
            this.internalStore.execute(
                query, (err, res) => {
                    if (err) reject(err);
                    else fulfill(res);
                });
        });
    }

    start() {
        return new Promise((fulfill, reject) => {
            RdfStore.create((err, store) => {
                if (err) reject(err);
                else fulfill(store);
            });
        }).then(store => { //better way to handle side effects with promise?
            this.internalStore = store;
            return this;
        });
    }

    load() {
        return new Promise((fulfill, reject) => {
            this.internalStore.load('text/n3', this.triple, (err, res) => {
                if (err) reject(err);
                else fulfill(res);
            });
        });
    }

    getDatasets() {
        return this.execute(datasetQuery()).then(this.parse);
    }

    getDsd(dataset) {
        return this.execute(dsdQuery(dataset['@id'])).then(this.parse);
    }

    getCs(dsd) {
        return this.execute(csQuery(dsd));
    }

    getDimensions(ds, dsd) {
        return this.execute(componentQuery(ds['@id'], dsd['@id'], 'http://purl.org/linked-data/cube#dimension'))
            .then(this.parse);
    }

    getMeasure(ds, dsd) {
        return this.execute(componentQuery(ds['@id'], dsd['@id'], 'http://purl.org/linked-data/cube#measure'))
            .then(this.parse);
    }

    getDimElements(dim, dataset) {
        return this.execute(dimElementsQuery(dim['@id'], dataset['@id'])).then(this.parse);
    }

    getObservations(dataset) {
        return this.execute(observationsQuery(dataset['@id'])).then(this.parse);
    }
}

export default SparqlStore;
