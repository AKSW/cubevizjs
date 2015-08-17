namespace CubeViz
{
    export class DataCubeInfoHelper
    {
        protected app:Application;

        /**
         * @param string      attachedTo
         * @param Application app
         */
        constructor(app:Application)
        {
            this.app = app;

            // publish event handlers to application:
            // if one of these events get triggered, the associated handler will
            // be executed to handle it
            app.bindGlobalEvents([
                {
                    name: 'onFound_dataCubeInformation',
                    handler: this.onFound_dataCubeInformation
                },
                {
                    name: 'onSelect_dataSet',
                    handler: this.onSelect_dataSet
                },
                {
                    name: 'onSelect_graph',
                    handler: this.onSelect_graph
                },
                {
                    name: 'onStart_application',
                    handler: this.onStart_application
                }
            ], this);
        }

        /**
         * Enriches data cube information with additional information to make it easier to integrate
         * SPARQL result triples into the frontend.
         *
         * @param any   mapping
         * @param any[] data
         * @return any Given data enriched with CV specific flavour. The SPARQL result triples will be
         *             transformed into a key-value-structure.
         */
        public enrichData(data:any[], mapping:any) : any
        {
            var enrichedData:any = {},
                entryUri:string = '',
                mapping:any = $.extend({}, mapping, {property: 'p', object: 'o'}),
                object:any,
                property:string = '';

            // go through all entries of the SPARQL result
            _.each(data, function(entry:any){

                // set important variables for later use
                entryUri = entry[mapping.__cv_uri].value;

                if (false == _.isUndefined(entry[mapping.property])) {
                    property = entry[mapping.property].value;
                }

                if (false == _.isUndefined(entry[mapping.object])) {
                    object = entry[mapping.object].value;
                }

                // if there are no information about that resource
                if (_.isUndefined(enrichedData[entryUri])) {
                    enrichedData[entryUri] = {
                        // TODO use title helper implementation to get nice labels here
                        __cv_niceLabel: entryUri,
                        __cv_uri: entryUri,
                    };
                }

                // schema: enrichedData[ resource URI ] [ property URI of the resource ] = object
                // only set, if at least the property is set
                if (false == _.isUndefined(property)) {
                    enrichedData[entryUri][property] = object;
                }
            });

            return enrichedData;
        }

        public loadAvailableAttributes(dataSetUri:string) : void
        {
            var self:DataCubeInfoHelper = this;

            this.loadComponents(
                this.app.configuration.selectedDataSetUri,
                'http://purl.org/linked-data/cube#attribute',
                // on success
                function(data:any) {
                    self.app.triggerEvent(
                        'onLoad_attributes',
                        self.enrichData(data.results.bindings, {__cv_uri: 'comp'})
                    )
                },
                // on error
                function(data:any){
                    console.log('error');
                    console.log(data);
                }
            );
        }

        public loadAvailableDimensions(dataSetUri:string) : void
        {
            var self:DataCubeInfoHelper = this;

            this.loadComponents(
                this.app.configuration.selectedDataSetUri,
                'http://purl.org/linked-data/cube#dimension',
                // on success
                function(data:any) {
                    self.app.triggerEvent(
                        'onLoad_dimensions',
                        self.enrichData(data.results.bindings, {__cv_uri: 'comp'})
                    )
                },
                // on error
                function(data:any){
                    console.log('error');
                    console.log(data);
                }
            );
        }

        public loadAvailableMeasures(dataSetUri:string) : void
        {
            var self:DataCubeInfoHelper = this;

            this.loadComponents(
                this.app.configuration.selectedDataSetUri,
                'http://purl.org/linked-data/cube#measure',
                // on success
                function(data:any) {
                    console.log(data);
                    self.app.triggerEvent(
                        'onLoad_measures',
                        self.enrichData(data.results.bindings, {__cv_uri: 'comp'})
                    )
                },
                // on error
                function(data:any){
                    console.log('error');
                    console.log(data);
                }
            );
        }

        /**
         * Loads components of a certain dataset such as dimensions, measures and attributes.
         *
         * @param string dsUri
         * @param string componentTypeUri
         * @param any    onSuccess
         * @param any    onError
         */
        public loadComponents(dsUri:string, componentTypeUri:string, onSuccess:any, onError:any) : void
        {
            var self:DataCubeInfoHelper = this,
                sparqlHandler:SparqlHandler = new SparqlHandler(this.app.configuration.sparqlEndpointUrl);

            sparqlHandler.sendQuery(
                `SELECT ?comp ?p ?o
                   FROM <` + this.app.configuration.selectedGraphUri + `>
                WHERE {
                    <` + dsUri + `> <http://purl.org/linked-data/cube#structure> ?dsd.
                    ?dsd <http://purl.org/linked-data/cube#component> ?comp.
                    ?comp <http://www.w3.org/1999/02/22-rdf-syntax-ns#type>
                        <http://purl.org/linked-data/cube#ComponentSpecification>.
                    ?comp <` + componentTypeUri + `> ?comptype.
                    ?comp ?p ?o.
                }`,
                onSuccess,
                onError
            );
        }

        /**
         * Loads dataset information from the selected graph to provide it to other views.
         */
        public onFound_dataCubeInformation(event:JQueryEventObject, data:any)
        {
            var self:DataCubeInfoHelper = this,
                sparqlHandler:SparqlHandler = new SparqlHandler(this.app.configuration.sparqlEndpointUrl);

            sparqlHandler.sendQuery(
                // get all datasets
                `SELECT ?ds ?p ?o
                FROM <` + this.app.configuration.selectedGraphUri + `>
                WHERE {
                    ?ds <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#DataSet>.
                    ?ds ?p ?o.
                }`,
                // on success
                function(data:any) {
                    self.app.triggerEvent(
                        'onLoad_dataSets',
                        self.enrichData(data.results.bindings, {__cv_uri: 'ds'})
                    );
                },
                // on error
                function(data:any){
                    console.log('error');
                    console.log(data);
                }
            );
        }

        public onSelect_dataSet(event:JQueryEventObject, dataSet:any) : void
        {
            // fill the rest of the data selection depending on the selected dataset
            this.loadAvailableMeasures(dataSet.uri);
            this.loadAvailableAttributes(dataSet.uri);
            this.loadAvailableDimensions(dataSet.uri);
        }

        /**
         * Checks, if the selected graph contains datacube informaton
         */
        public onSelect_graph(event:JQueryEventObject, data:any)
        {
            // to avoid that this event gets fired multiple times
            if (_.isUndefined(data)) return;

            var self:DataCubeInfoHelper = this,
                sparqlHandler = new SparqlHandler(this.app.configuration.sparqlEndpointUrl);

            sparqlHandler.sendQuery(
                `PREFIX qb: <http://purl.org/linked-data/cube#>
                ASK FROM <` + data.uri + `>
                {
                    ?obs a qb:Observation .
                    ?obs qb:dataSet ?dataset .
                    ?obs ?dimension ?dimelement .
                    ?obs ?measure ?value .
                    ?ds a qb:DataSet .
                    ?ds qb:structure ?dsd .
                    ?dsd a qb:DataStructureDefinition .
                    ?dsd qb:component ?dimspec .
                    ?dsd qb:component ?measspec .
                    ?dimspec a qb:ComponentSpecification .
                    ?dimspec qb:dimension ?dimension .
                    ?measspec a qb:ComponentSpecification .
                    ?measspec qb:measure ?measure .
                }`,
                // on success
                function(data:any) {
                    // if datacube information were found
                    if (true == data.boolean) {
                        self.app.triggerEvent('onFound_dataCubeInformation');
                    }
                },
                // on error
                function(data:any){
                    console.log('error');
                    console.log(data);
                }
            );
        }

        /**
         * When the application starts, it will get a list of all graphs.
         */
        public onStart_application(event:JQueryEventObject)
        {
            var self:DataCubeInfoHelper = this,
                sparqlHandler = new SparqlHandler(this.app.configuration.sparqlEndpointUrl);

            sparqlHandler.sendQuery(
                // TODO improve it to avoid calling for all triples (DISTINCT does not work due a virtuoso error)
                `SELECT ?g WHERE { GRAPH ?g { ?s ?p ?o }}`,
                // on success
                function(data:any) {
                    var graphs:any = {};
                    _.each(data.results.bindings, function(entry:any) {
                        graphs[entry.g.value] = {g: entry.g};
                    });

                    // trigger event that all available graphs are loaded
                    self.app.triggerEvent(
                        'onLoad_graphs',
                        self.enrichData(graphs, {__cv_uri: 'g'})
                    );
                },
                // on error
                function(data:any){
                    console.log('error');
                    console.log(data);
                }
            );
        }
    }
}
