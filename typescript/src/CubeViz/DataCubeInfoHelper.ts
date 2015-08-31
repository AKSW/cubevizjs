namespace CubeViz
{
    export class DataCubeInfoHelper
    {
        /**
         * @var Application
         */
        protected app:Application;

        /**
         * @var array
         */
        protected checkConstraints:any[];

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
                    name: 'onSelect_dimensionElement',
                    handler: this.onSelect_dimensionElement
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
                // be aware, that sometimes property and object might not be set
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

                // property
                if (false == _.isUndefined(entry[mapping.property])) {
                    property = entry[mapping.property].value;
                }

                // object
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

        protected executeCheckConstraints(dataSetUri:string, graphUri:string)
        {
            // init check constraints
            this.initCheckConstraints(dataSetUri, graphUri);

            var self:DataCubeInfoHelper = this,
                sparqlHandler:SparqlHandler = new SparqlHandler(this.app.configuration.sparqlEndpointUrl);

            _.each(this.checkConstraints, function(checkConstraint, key){
                sparqlHandler.sendQuery(
                    checkConstraint.sparqlQuery,
                    // on success
                    function(data:any) {
                        self.app.triggerEvent(
                            'onLoad_checkConstraint',
                            // attach check constraint information to the received result
                            {
                                description: checkConstraint.description,
                                key: key,
                                id: checkConstraint.id,
                                result: data.boolean,
                                title: checkConstraint.title
                            }
                        );
                    },
                    // on error
                    function(data:any){
                        console.log('error');
                        console.log(data);
                    }
                );
            });
        }

        protected initCheckConstraints(dataSetUri:string, graphUri:string)
        {
            this.checkConstraints = [
                {
                    description: 'Every qb:Observation has exactly one associated qb:DataSet.',
                    id: 'ic-1',
                    sparqlQuery: `PREFIX qb:<http://purl.org/linked-data/cube#>
                        ASK FROM <` + graphUri + `> {{
                            ?obs a qb:Observation .
                            FILTER NOT EXISTS { ?obs qb:dataSet ?dataset1 . }
                        } UNION {
                            ?obs a qb:Observation ;
                            qb:dataSet ?dataset1, ?dataset2 .
                            FILTER (?dataset1 != ?dataset2)
                        }}`,
                    title: 'Unique DataSet'
                }, {
                    description: 'Every qb:DataSet has exactly one associated qb:DataStructureDefinition.',
                    id: 'ic-2',
                    sparqlQuery: `PREFIX qb:<http://purl.org/linked-data/cube#>
                        ASK FROM <` + graphUri + `> {{
                            # Check dataset has a dsd
                            ?dataset a qb:DataSet .
                            FILTER NOT EXISTS { ?dataset qb:structure ?dsd . }
                        } UNION {
                            # Check has just one dsd
                            ?dataset a qb:DataSet ;
                               qb:structure ?dsd1, ?dsd2 .
                            FILTER (?dsd1 != ?dsd2)
                        }}`,
                    title: 'Unique DSD'
                }, {
                    description: 'Every qb:DataStructureDefinition must include at least one declared measure.',
                    id: 'ic-3',
                    sparqlQuery: `PREFIX qb:<http://purl.org/linked-data/cube#>
                        ASK FROM <` + graphUri + `> {
                            ?dsd a qb:DataStructureDefinition .
                            FILTER NOT EXISTS { ?dsd qb:component [qb:componentProperty [a qb:MeasureProperty]] }
                        }`,
                    title: 'DSD includes measure'
                }, {
                    description: 'Every dimension declared in a qb:DataStructureDefinition must have a declared rdfs:range.',
                    id: 'ic-4',
                    sparqlQuery: `PREFIX qb:<http://purl.org/linked-data/cube#>
                        ASK FROM <` + graphUri + `> {
                          ?dim a qb:DimensionProperty .
                          FILTER NOT EXISTS { ?dim rdfs:range [] }
                        }`,
                    title: 'Dimensions have range'
                }, {
                    description: 'Every dimension with range skos:Concept must have a qb:codeList.',
                    id: 'ic-5',
                    sparqlQuery: `PREFIX qb:<http://purl.org/linked-data/cube#>
                        ASK FROM <` + graphUri + `> {
                            ?dsd a qb:DataStructureDefinition .
                            FILTER NOT EXISTS { ?dsd qb:component [qb:componentProperty [a qb:MeasureProperty]] }
                        }`,
                    title: 'Concept dimensions have code lists'
                }, {
                    description: 'The only components of a qb:DataStructureDefinition that may be marked as optional, using qb:componentRequired are attributes.',
                    id: 'ic-6',
                    sparqlQuery: `PREFIX qb:<http://purl.org/linked-data/cube#>
                        ASK FROM <` + graphUri + `> {
                            ?dsd qb:component ?componentSpec .
                            ?componentSpec qb:componentRequired "false"^^xsd:boolean ;
                                qb:componentProperty ?component .
                            FILTER NOT EXISTS { ?component a qb:AttributeProperty }
                        }`,
                    title: 'Only attributes may be optional'
                }, {
                    description: 'Every qb:SliceKey must be associated with a qb:DataStructureDefinition.',
                    id: 'ic-7',
                    sparqlQuery: `PREFIX qb:<http://purl.org/linked-data/cube#>
                        ASK FROM <` + graphUri + `> {
                            ?sliceKey a qb:SliceKey .
                            FILTER NOT EXISTS { [a qb:DataStructureDefinition] qb:sliceKey ?sliceKey }
                        }`,
                    title: 'Slice Keys must be declared'
                }, {
                    description: 'Every qb:componentProperty on a qb:SliceKey must also be declared as a qb:component of the associated qb:DataStructureDefinition.',
                    id: 'ic-8',
                    sparqlQuery: `PREFIX qb:<http://purl.org/linked-data/cube#>
                        ASK FROM <` + graphUri + `> {
                            ?slicekey a qb:SliceKey;
                            qb:componentProperty ?prop .
                            ?dsd qb:sliceKey ?slicekey .
                            FILTER NOT EXISTS { ?dsd qb:component [qb:componentProperty ?prop] }
                        }`,
                    title: 'Slice Keys consistent with DSD'
                }, {
                    description: 'Each qb:Slice must have exactly one associated qb:sliceStructure.',
                    id: 'ic-9',
                    sparqlQuery: `PREFIX qb:<http://purl.org/linked-data/cube#>
                        ASK FROM <` + graphUri + `> {{
                            # Slice has a key
                            ?slice a qb:Slice .
                            FILTER NOT EXISTS { ?slice qb:sliceStructure ?key }
                        } UNION {
                            # Slice has just one key
                            ?slice a qb:Slice ;
                            qb:sliceStructure ?key1, ?key2;
                            FILTER (?key1 != ?key2)
                        }}`,
                    title: 'Unique slice structure'
                }, {
                    description: 'Every qb:Slice must have a value for every dimension declared in its qb:sliceStructure.',
                    id: 'ic-10',
                    sparqlQuery: `PREFIX qb:<http://purl.org/linked-data/cube#>
                        ASK FROM <` + graphUri + `> {
                            ?slice qb:sliceStructure [qb:componentProperty ?dim] .
                            FILTER NOT EXISTS { ?slice ?dim [] }
                        }`,
                    title: 'Slice dimensions complete'
                }, {
                    description: 'Every qb:Observation has a value for each dimension declared in its associated qb:DataStructureDefinition.',
                    id: 'ic-11',
                    sparqlQuery: `PREFIX qb:<http://purl.org/linked-data/cube#>
                        ASK FROM <` + graphUri + `> {
                            ?obs qb:dataSet/qb:structure/qb:component/qb:componentProperty ?dim .
                            ?dim a qb:DimensionProperty;
                            FILTER NOT EXISTS { ?obs ?dim [] }
                        }`,
                    title: 'All dimensions required'
                }, {
                    description: 'No two qb:Observations in the same qb:DataSet may have the same value for all dimensions.',
                    id: 'ic-12',
                    sparqlQuery: `PREFIX qb:<http://purl.org/linked-data/cube#>
                        ASK FROM <` + graphUri + `> {
                            FILTER( ?allEqual )
                            {
                                # For each pair of observations test if all the dimension values are the same
                                SELECT (MIN(?equal) AS ?allEqual) WHERE {
                                    ?obs1 qb:dataSet ?dataset .
                                    ?obs2 qb:dataSet ?dataset .
                                    FILTER (?obs1 != ?obs2)
                                    ?dataset qb:structure/qb:component/qb:componentProperty ?dim .
                                    ?dim a qb:DimensionProperty .
                                    ?obs1 ?dim ?value1 .
                                    ?obs2 ?dim ?value2 .
                                    BIND( ?value1 = ?value2 AS ?equal)
                                } GROUP BY ?obs1 ?obs2
                            }
                        }`,
                    title: 'No duplicate observations'
                }, {
                    description: 'Every qb:Observation has a value for each declared attribute that is marked as required.',
                    id: 'ic-13',
                    sparqlQuery: `PREFIX qb:<http://purl.org/linked-data/cube#>
                        ASK FROM <` + graphUri + `> {
                            ?obs qb:dataSet/qb:structure/qb:component ?component .
                            ?component qb:componentRequired "true"^^xsd:boolean ;
                                       qb:componentProperty ?attr .
                            FILTER NOT EXISTS { ?obs ?attr [] }
                        }`,
                    title: 'Required attributes'
                }, {
                    description: 'In a qb:DataSet which does not use a Measure dimension then each individual qb:Observation must have a value for every declared measure.',
                    id: 'ic-14',
                    sparqlQuery: `PREFIX qb:<http://purl.org/linked-data/cube#>
                        ASK FROM <` + graphUri + `> {
                            # Observation in a non-measureType cube
                            ?obs qb:dataSet/qb:structure ?dsd .
                            FILTER NOT EXISTS { ?dsd qb:component/qb:componentProperty qb:measureType }

                            # verify every measure is present
                            ?dsd qb:component/qb:componentProperty ?measure .
                            ?measure a qb:MeasureProperty.
                            FILTER NOT EXISTS { ?obs ?measure [] }
                        }`,
                    title: 'All measures present'
                }, {
                    description: 'In a qb:DataSet which uses a Measure dimension then each qb:Observation must have a value for the measure corresponding to its given qb:measureType',
                    id: 'ic-15',
                    sparqlQuery: `PREFIX qb:<http://purl.org/linked-data/cube#>
                        ASK FROM <` + graphUri + `> {
                            # Observation in a measureType-cube
                            ?obs qb:dataSet/qb:structure ?dsd ;
                                 qb:measureType ?measure .
                            ?dsd qb:component/qb:componentProperty qb:measureType .
                            # Must have value for its measureType
                            FILTER NOT EXISTS { ?obs ?measure [] }
                        }`,
                    title: 'Measure dimension consistent'
                }, {
                    description: 'In a qb:DataSet which uses a Measure dimension then each qb:Observation must only have a value for one measure (by IC-15 this will be the measure corresponding to its qb:measureType).',
                    id: 'ic-16',
                    sparqlQuery: `PREFIX qb:<http://purl.org/linked-data/cube#>
                        ASK FROM <` + graphUri + `> {
                            # Observation with measureType
                            ?obs qb:dataSet/qb:structure ?dsd ;
                                 qb:measureType ?measure ;
                                 ?omeasure [] .
                            # Any measure on the observation
                            ?dsd qb:component/qb:componentProperty qb:measureType ;
                                 qb:component/qb:componentProperty ?omeasure .
                            ?omeasure a qb:MeasureProperty .
                            # Must be the same as the measureType
                            FILTER (?omeasure != ?measure)
                        }`,
                    title: 'Single measure on measure dimension observation'
                }, {
                    description: 'If a qb:DataSet D has a qb:slice S, and S has an qb:observation O, then the qb:dataSet corresponding to O must be D.',
                    id: 'ic-18',
                    sparqlQuery: `PREFIX qb:<http://purl.org/linked-data/cube#>
                        ASK FROM <` + graphUri + `> {
                            ?dataset qb:slice       ?slice .
                            ?slice   qb:observation ?obs .
                            FILTER NOT EXISTS { ?obs qb:dataSet ?dataset . }
                        }`,
                    title: 'Consistent data set links'
                }, {
                    description: `If a dimension property has a qb:codeList, then the value of the dimension property on
                                  every qb:Observation must be in the code list.
                                  The following integrity check queries must be applied to an RDF graph which contains
                                  the definition of the code list as well as the Data Cube to be checked.
                                  In the case of a skos:ConceptScheme then each concept must be linked to the scheme using
                                  skos:inScheme. In the case of a skos:Collection then the collection must link to each
                                  concept (or to nested collections) using skos:member. If the collection uses skos:memberList
                                  then the entailment of skos:member values defined by S36 in [SKOS-REFERENCE] must be
                                  materialized before this check is applied.`,
                    id: 'ic-19',
                    // TODO check merged ASK query; there are usually two ASK queries
                    sparqlQuery: `PREFIX qb:<http://purl.org/linked-data/cube#>
                        ASK FROM <` + graphUri + `> {
                            ?obs qb:dataSet/qb:structure/qb:component/qb:componentProperty ?dim .
                            ?dim a qb:DimensionProperty ;
                                qb:codeList ?list .
                            {
                                ?list a skos:ConceptScheme .
                            } UNION {
                                ?list a skos:Collection .
                            }
                            ?obs ?dim ?v .
                            FILTER NOT EXISTS { ?v a skos:Concept ; skos:inScheme ?list }
                            FILTER NOT EXISTS { ?v a skos:Concept . ?list skos:member+ ?v }
                        }`,
                    title: 'Codes from code list'
                }
            ];
        }

        protected loadAttributes(dataSetUri:string) : void
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

        /**
         * Loads components of a certain dataset such as dimensions, measures and attributes.
         *
         * @param string dsUri
         * @param string componentTypePrefixedUri
         * @param string graphUri
         * @param any    onSuccess
         * @param any    onError
         */
        protected loadComponents(
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

        protected loadComponentElements(dataSetUri:string, componentUri:string, graphUri:string) : JQueryXHR
        {
            var sparqlHandler:SparqlHandler = new SparqlHandler(this.app.configuration.sparqlEndpointUrl);

            // that query does not only say, give me all elements of a cetain component, but also
            // forces a connection between the dataset and that component.
            return sparqlHandler.sendQuery(
                `PREFIX qb: <http://purl.org/linked-data/cube#>
                SELECT DISTINCT ?componentElementUri ?p ?o ?componentUri
                FROM <` + graphUri + `>
                WHERE {
                    {
                        ?observation <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> qb:Observation.
                        ?observation qb:dataSet <` + dataSetUri + `>.
                        ?observation <` + componentUri + `> ?componentElementUri.
                        ?observation ?componentUri ?componentElementUri.
                        OPTIONAL {
                            ?componentElementUri ?p ?o.
                        }
                    }
                    UNION
                    {
                        ?componentElementUri a ?componentUri.
                        ?componentElementUri a <` + componentUri + `>.
                        ?componentElementUri ?p ?o.
                    }
                }`
            );
        }

        protected loadDimensions(dataSetUri:string) : void
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
                        responseObjects.push(self.loadComponentElements(
                            self.app.data.selected.dataSet.__cv_uri,
                            dimension.__cv_uri,
                            self.app.data.selected.graph.__cv_uri
                        ));
                    });

                    // will collect all XHR objects and call the done function if everyone of the AJAX calls is
                    // done.
                    $.when.apply(null, responseObjects).done(function() {
                        // we have at least two dimensions
                        if (_.isArray(arguments[0])) {
                            // each entry of arguments contains an array which represents all parameters of the
                            // JQueryXHR.done
                            _.each(arguments, function(argumentArray:any){
                                self.app.data.received.dimensions = self.storeDimensionElmementsInDimension(
                                    self.app.data.received.dimensions,
                                    argumentArray[0].results.bindings
                                );
                            });

                            self.app.triggerEvent('onLoad_dimensions', self.app.data.received.dimensions);

                        // if first argument is an object, it means that only one dimension was used to get all
                        // of its elements.
                        } else if (_.isObject(arguments[0])) {
                            // enrich existing dimensions with their according dimension elements
                            self.app.data.received.dimensions = self.storeDimensionElmementsInDimension(
                                self.app.data.received.dimensions,
                                arguments[0][0].results.bindings
                            );

                            self.app.triggerEvent('onLoad_dimensions', self.app.data.received.dimensions);

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


        protected loadMeasures(dataSetUri:string) : void
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

        public loadNumberOfObservations(dsUri:string, graphUri:string)
        {
            var self:DataCubeInfoHelper = this,
                sparqlHandler:SparqlHandler = new SparqlHandler(this.app.configuration.sparqlEndpointUrl);

            sparqlHandler.sendQuery(
                // get the number of all observations
                `PREFIX qb: <http://purl.org/linked-data/cube#>
                SELECT DISTINCT COUNT (?observation)
                FROM <` + graphUri + `>
                WHERE {
                    ?observation <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> qb:Observation.
                    ?observation qb:dataSet <` + dsUri + `>.
                }`,
                // on success
                function(data:any) {
                    self.app.triggerEvent(
                        'onLoad_numberOfObservations',
                        data.results.bindings[0]['callret-0'].value
                    );
                },
                // on error
                function(data:any){
                    console.log('error');
                    console.log(data);
                }
            );
        }

        /**
         * Loads dataset information from the selected graph to provide it to other views.
         */
        public onFound_dataCubeInformation(event:JQueryEventObject, dataSetUri:string)
        {
            var self:DataCubeInfoHelper = this,
                sparqlHandler:SparqlHandler = new SparqlHandler(this.app.configuration.sparqlEndpointUrl);

            sparqlHandler.sendQuery(
                // get all datasets
                `PREFIX qb: <http://purl.org/linked-data/cube#>
                SELECT ?ds ?p ?o
                FROM <` + dataSetUri + `>
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
            this.loadAttributes(dataSet.__cv_uri);
            this.loadDimensions(dataSet.__cv_uri);
            this.loadMeasures(dataSet.__cv_uri);
            this.loadNumberOfObservations(dataSet.__cv_uri, this.app.data.selected.graph.__cv_uri);

            // executes all check constrains against the selected dataset. their purpose is to validate the
            // cube and exploit errors.
            this.executeCheckConstraints(dataSet.__cv_uri, this.app.data.selected.graph.__cv_uri);
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
         * @param any               dimensionElement Contains dimensionElement
         */
        public onSelect_dimensionElement(event:JQueryEventObject, dimensionElement:any) : void
        {
            // create a deep copy of the selected dimension
            var clonedDimensionElement = JSON.parse(JSON.stringify(dimensionElement));

            // store selected dimension elment in its according selected dimension
            this.app.data.selected
                .dimensions[dimensionElement.__cv_component]
                .__cv_elements[dimensionElement.__cv_uri] = clonedDimensionElement;
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
                        self.app.triggerEvent('onFound_dataCubeInformation', graph.__cv_uri);
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

        /**
         * @param any predefinedDimensions
         * @param any resultBindings
         */
        public storeDimensionElmementsInDimension(predefinedDimensions:any, resultBindings:any)
        {
            var componentUri:string = '',
                dimensionElements:any[] = this.enrichData(
                    resultBindings,
                    {
                        __cv_uri: 'componentElementUri',
                        __cv_component: 'componentUri'
                    }
                ),
                self:DataCubeInfoHelper = this;

            // go through all received dimension elements
            _.each(dimensionElements, function(dimensionElement){
                componentUri = dimensionElement.__cv_component;

                // init entries list
                if (_.isUndefined(predefinedDimensions[componentUri].__cv_elements)) {
                    predefinedDimensions[componentUri].__cv_elements = {};
                }

                // add dimension element to __cv_elements list of the according dimension received
                predefinedDimensions[componentUri].__cv_elements[dimensionElement.__cv_uri] = dimensionElement;
            });

            return predefinedDimensions;
        }
    }
}
