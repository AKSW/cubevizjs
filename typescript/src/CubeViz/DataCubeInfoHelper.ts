namespace CubeViz
{
    export class DataCubeInfoHelper
    {
        protected app:Application;

        /**
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
                    name: 'onSelect_dimension',
                    handler: this.onSelect_dimension
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
         * @param any[] data
         * @param any   mapping
         * @return any Given data enriched with CV specific flavour. The SPARQL result triples will be
         *             transformed into a key-value-structure for easier usage.
         */
        public enrichData(data:any[], mapping:any) : any
        {
            var enrichedData:any = {},
                entryUri:string = '',
                mapping:any = $.extend({}, mapping, {property: 'p', object: 'o'}),
                object:any,
                // contains all possible mapping keys which are for optional mappings and keys that are only
                // used in certain use cases.
                possibleMappingKeys:string[] = [
                    '__cv_component', '__cv_componentSpecification'
                ],
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
                        __cv_niceLabel: entryUri.substr(0, 55) + ' ...',
                        __cv_uri: entryUri,
                    };
                }

                // schema: enrichedData[ resource URI ] [ property URI of the resource ] = object
                // only set, if at least the property is set
                if (false == _.isUndefined(property) && '' !== property) {
                    // entry is fresh
                    if (_.isUndefined(enrichedData[entryUri][property])) {
                        enrichedData[entryUri][property] = object;

                    // already data there, but its not a list yet
                    } else if (false === _.isArray(enrichedData[entryUri][property])) {
                        enrichedData[entryUri][property] = [enrichedData[entryUri][property], object];

                    // already data there and its a list, so we add the new item
                    } else if (_.isArray(enrichedData[entryUri][property])) {
                        enrichedData[entryUri][property].push(object);
                    }
                }

                // scan for optional mapping keys and add data to enrichedData, if available
                // for instance: it add __cv_component to each componentElement entry
                _.each(possibleMappingKeys, function(key:string){
                    // if key of the optional property is set in the entry, add it to enrichedData too
                    if (false == _.isUndefined(mapping[key]) && false == _.isUndefined(entry[mapping[key]])) {
                        enrichedData[entryUri][key] = entry[mapping[key]].value;
                    }
                });
            });

            return enrichedData;
        }

        protected loadAvailableAttributes(dataSetUri:string) : void
        {
            var self:DataCubeInfoHelper = this;

            this.loadComponents(
                this.app.data.selected.dataSet.__cv_uri,
                'qb:attribute',
                this.app.data.selected.graph.__cv_uri,
                // on success
                function(data:any) {
                    self.app.data.selected.attributes = self.enrichData(
                        data.results.bindings,
                        {
                            __cv_componentSpecification: 'componentSpecification',
                            __cv_uri: 'component'
                        }
                    );

                    self.app.triggerEvent('onLoad_attributes', self.app.data.selected.attributes)
                },
                // on error
                function(data:any){
                    console.log('error');
                    console.log(data);
                }
            );
        }

        protected loadAvailableDimensions(dataSetUri:string) : void
        {
            var self:DataCubeInfoHelper = this;

            this.loadComponents(
                this.app.data.selected.dataSet.__cv_uri,
                'qb:dimension',
                this.app.data.selected.graph.__cv_uri,
                // on success
                function(data:any) {
                    // enrichedData contains all information about available dimension component
                    self.app.data.received.dimensions = self.enrichData(
                        data.results.bindings,
                        {
                            __cv_componentSpecification: 'componentSpecification',
                            __cv_uri: 'component'
                        }
                    );
                    // contains a list of XHR objects, each represents the result of an AJAX call
                    // to get according component elements
                    var responseObjects:JQueryXHR[] = [];

                    /**
                     * in this part we chain all AJAX calls to the server for retrieving component elements
                     * each calls is made separately, but they will chained so that we can handle them at once,
                     * if all are finished.
                     */
                    _.each(self.app.data.received.dimensions, function(dimension:any){
                        responseObjects.push(self.loadAvailableComponentElements(
                            self.app.data.selected.dataSet.__cv_uri,
                            dimension.__cv_uri,
                            self.app.data.selected.graph.__cv_uri
                        ));
                    });

                    // will collect all XHR objects and call the done function if everyone of the AJAX calls is
                    // done.
                    $.when.apply(null, responseObjects).done(function() {
                        // if first argument is an object, it means that only one dimension was used to get all
                        // of its elements.
                        if (_.isObject(arguments[0])) {
                            var componentUri:string = '',
                                dimensionElements:any[] = self.enrichData(
                                    arguments[0].results.bindings,
                                    {
                                        __cv_component: 'component',
                                        __cv_uri: 'componentElement'
                                    }
                                );

                            _.each(dimensionElements, function(dimensionElement){
                                componentUri = dimensionElement.__cv_component;

                                // init entries list
                                if (_.isUndefined(self.app.data.received.dimensions[componentUri].__cv_elements)) {
                                        self.app.data.received.dimensions[componentUri].__cv_elements = {};
                                }

                                // add dimension element to __cv_elements list of the according dimension
                                // received
                                self.app.data.received.dimensions[componentUri]
                                    .__cv_elements[dimensionElement.__cv_uri] = dimensionElement;
                                // selected
                                /*if (false !== _.isUndefined(self.app.data.selected.dimensions[componentUri])) {
                                    self.app.data.selected.dimensions[componentUri].__cv_elements[componentUri]
                                        = dimensionElement;
                                }*/
                            });

                            self.app.triggerEvent('onLoad_dimensions', self.app.data.received.dimensions);

                        // we have at least two dimensions
                        } else if (_.isArray(arguments[0])) {
                            // each entry of arguments contains an array which represents all parameters of the
                            // JQueryXHR.done
                            _.each(arguments, function(argumentArray:any){
                                console.log(self.enrichData(argumentArray[0].results.bindings, {__cv_uri: 'componentElement'}));
                            });

                        } else {
                            console.log('loadAvailableDimensions -> Unknown case happen:');
                            console.log(arguments);
                        }
                    });
                },
                // on error
                function(data:any){
                    console.log('error');
                    console.log(data);
                }
            );
        }

        protected loadAvailableComponentElements(dataSetUri:string, componentUri:string, graphUri:string) : JQueryXHR
        {
            var sparqlHandler:SparqlHandler = new SparqlHandler(this.app.configuration.sparqlEndpointUrl);

            // that query does not only say, give me all elements of a cetain component, but also
            // forces a connection between the dataset and that component.
            return sparqlHandler.sendQuery(
                `PREFIX qb: <http://purl.org/linked-data/cube#>
                SELECT ?componentElement ?p ?o ?component
                FROM <` + graphUri + `>
                WHERE {
                    <` + dataSetUri + `> a qb:DataSet;
                        qb:component ?componentSpecification.
                    ?componentSpecification qb:dimension <` + componentUri + `>.
                    ?componentSpecification qb:dimension ?component.
                    <` + componentUri + `> a qb:DimensionProperty.
                    ?componentElement a <` + componentUri + `>.
                    ?componentElement ?p ?o.
                }`
            );
        }

        protected loadAvailableMeasures(dataSetUri:string) : void
        {
            var self:DataCubeInfoHelper = this;

            this.loadComponents(
                this.app.data.selected.dataSet.__cv_uri,
                'qb:measure',
                this.app.data.selected.graph.__cv_uri,
                // on success
                function(data:any) {
                    self.app.data.received.measures = self.enrichData(
                        data.results.bindings,
                        {
                            __cv_componentSpecification: 'componentSpecification',
                            __cv_uri: 'component'
                        }
                    );

                    self.app.triggerEvent('onLoad_measures', self.app.data.received.measures);
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
         * @param string componentTypePrefixedUri
         * @param string graphUri
         * @param any    onSuccess
         * @param any    onError
         */
        public loadComponents(
            dsUri:string,
            componentTypePrefixedUri:string,
            graphUri:string,
            onSuccess:any,
            onError:any
        ) : void {
            var sparqlHandler:SparqlHandler = new SparqlHandler(this.app.configuration.sparqlEndpointUrl);

            sparqlHandler.sendQuery(
                `PREFIX qb: <http://purl.org/linked-data/cube#>
                SELECT ?component ?p ?o ?componentSpecification
                FROM <` + graphUri + `>
                WHERE {
                    <` + dsUri + `> qb:structure ?dsd.
                    ?dsd qb:component ?componentSpecification.
                    ?componentSpecification a qb:ComponentSpecification.
                    ?componentSpecification ` + componentTypePrefixedUri + ` ?component.
                    ?component ?p ?o.
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
                `PREFIX qb: <http://purl.org/linked-data/cube#>
                SELECT ?ds ?p ?o
                FROM <` + this.app.data.selected.graph.__cv_uri + `>
                WHERE {
                    ?ds a qb:DataSet.
                    ?ds ?p ?o.
                }`,
                // on success
                function(data:any) {
                    self.app.data.received.dataSets = self.enrichData(data.results.bindings, {__cv_uri: 'ds'});

                    self.app.triggerEvent('onLoad_dataSets', self.app.data.received.dataSets);
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
            this.loadAvailableAttributes(dataSet.__cv_uri);
            this.loadAvailableDimensions(dataSet.__cv_uri);
            this.loadAvailableMeasures(dataSet.__cv_uri);
        }

        /**
         * Checks, if the selected graph contains datacube informaton
         *
         * @param JQueryEventObject event
         * @param any               dimension Instance of the dimension which was selected.
         */
        public onSelect_dimension(event:JQueryEventObject, dimension:any) : void
        {
            // create a deep copy of the selected dimension
            var clonedDimension = JSON.parse(JSON.stringify(dimension));

            // remove all elements, because the user has to select them manually
            // TODO implement auto selection of a few elements to show some observations
            clonedDimension.__cv_elements = {};

            this.app.data.selected.dimensions[clonedDimension.__cv_uri] = clonedDimension;
        }

        /**
         * Checks, if the selected graph contains datacube informaton
         *
         * @param JQueryEventObject event
         * @param any               data Contains dimension and dimensionElement keys of the selected
         *                               dimension element and the according dimension.
         */
        public onSelect_dimensionElement(event:JQueryEventObject, data:any) : void
        {
            console.log(data);
        }

        /**
         * Checks, if the selected graph contains datacube informaton
         *
         * @param JQueryEventObject event
         * @param any               graph Instance representing selected graph
         */
        public onSelect_graph(event:JQueryEventObject, graph:any) : void
        {
            // to avoid that this event gets fired multiple times
            if (_.isUndefined(graph)) return;

            var self:DataCubeInfoHelper = this,
                sparqlHandler = new SparqlHandler(this.app.configuration.sparqlEndpointUrl);

            sparqlHandler.sendQuery(
                `PREFIX qb: <http://purl.org/linked-data/cube#>
                ASK FROM <` + graph.__cv_uri + `>
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

                    self.app.data.received.graphs = self.enrichData(graphs, {__cv_uri: 'g'});

                    // trigger event that all available graphs are loaded
                    self.app.triggerEvent('onLoad_graphs', self.app.data.received.graphs);
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
