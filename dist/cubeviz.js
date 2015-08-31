var CubeViz;
(function (CubeViz) {
    var AbstractView = (function () {
        function AbstractView(id, attachedTo, app) {
            this.autostart = false;
            this.app = app;
            this.attachedTo = attachedTo;
            this.id = id || 'view';
        }
        AbstractView.prototype.bindGlobalEvents = function (events) {
            this.app.bindGlobalEvents(events, this);
        };
        AbstractView.prototype.bindUserInterfaceEvents = function (events) {
            if (true === _.isUndefined(events) || 0 == _.size(events))
                return;
            var eventName = '', selector = '', self = this;
            _.each(events, function (method, key) {
                if (false === _.isFunction(method)) {
                }
                if (!method) {
                    throw new Error("Method " + method + " does not exist");
                }
                eventName = key.substr(0, key.indexOf(" "));
                selector = key.substr(key.indexOf(" ") + 1);
                $(selector).on(eventName, $.proxy(method, self));
            });
        };
        AbstractView.prototype.compileTemplate = function (tplHtml, data) {
            var template = Handlebars.compile(tplHtml);
            return template(data);
        };
        AbstractView.prototype.destroy = function () {
            var el = $(this.attachedTo);
            el.off();
            if (true === el.is("div")) {
                el.empty();
            }
            else if (true === el.is("select")) {
                el.find("option").remove();
            }
        };
        AbstractView.prototype.triggerGlobalEvent = function (eventName, data) {
            this.app.triggerEvent(eventName, data);
        };
        AbstractView.prototype.render = function () {
            throw new Error('Implement render');
        };
        return AbstractView;
    })();
    CubeViz.AbstractView = AbstractView;
})(CubeViz || (CubeViz = {}));
var CubeViz;
(function (CubeViz) {
    var Application = (function () {
        function Application(configuration) {
            // TODO add checks
            this.configuration = {};
            this.eventHandlers = {};
            this.helperInstances = {};
            this.renderedViews = {};
            this.data = {};
            this.viewInstances = {};
            this.configuration = configuration;
            this.data = {
                received: {
                    attributes: {},
                    dataSets: {},
                    dimensions: {},
                    measures: {}
                },
                selected: {
                    attributes: {},
                    dataSet: {},
                    dimensions: {},
                    measures: {}
                }
            };
            this.setupHelpers();
        }
        Application.prototype.add = function (id, attachedTo) {
            var viewObj = {
                alreadyRendered: false,
                attachedTo: attachedTo,
                id: id,
                instance: null
            };
            eval('viewObj.instance = new ' + id + '("' + attachedTo + '", this);');
            this.viewInstances[id] = viewObj;
        };
        Application.prototype.bindGlobalEvents = function (events, callee) {
            if (true === _.isUndefined(events) || 0 == _.size(events)) {
                return;
            }
            var self = this;
            _.each(events, function (event) {
                $(self).on(event.name, $.proxy(event.handler, callee));
            });
        };
        Application.prototype.destroyView = function (id) {
            this.viewInstances.get(id).instance.destroy();
        };
        Application.prototype.getDimensionElement = function (dimensionElmementUri, dimensionUri) {
            if (false == _.isUndefined(this.data.received.dimensions[dimensionUri].__cv_elements[dimensionElmementUri])) {
                return this.data.received.dimensions[dimensionUri].__cv_elements[dimensionElmementUri];
            }
            return null;
        };
        Application.prototype.removeView = function (id) {
            delete this.viewInstances[id];
        };
        Application.prototype.setupHelpers = function () {
            this.helperInstances['DataCubeInfoHelper'] = new CubeViz.DataCubeInfoHelper(this);
        };
        Application.prototype.triggerEvent = function (eventName, data) {
            $(this).trigger(eventName, [data]);
        };
        Application.prototype.unbindEvent = function (eventName) {
            $(this).off(eventName);
        };
        return Application;
    })();
    CubeViz.Application = Application;
})(CubeViz || (CubeViz = {}));
var CubeViz;
(function (CubeViz) {
    var DataCubeInfoHelper = (function () {
        function DataCubeInfoHelper(app) {
            this.app = app;
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
        DataCubeInfoHelper.prototype.enrichData = function (data, mapping) {
            var enrichedData = {}, entryUri = '', mapping = $.extend({}, mapping, { property: 'p', object: 'o' }), object, possibleMappingKeys = [
                '__cv_component', '__cv_componentSpecification'
            ], property = '';
            _.each(data, function (entry) {
                entryUri = entry[mapping.__cv_uri].value;
                if (false == _.isUndefined(entry[mapping.property])) {
                    property = entry[mapping.property].value;
                }
                if (false == _.isUndefined(entry[mapping.object])) {
                    object = entry[mapping.object].value;
                }
                if (_.isUndefined(enrichedData[entryUri])) {
                    enrichedData[entryUri] = {
                        __cv_niceLabel: entryUri.substr(0, 55) + ' ...',
                        __cv_uri: entryUri
                    };
                }
                if (false == _.isUndefined(property) && '' !== property) {
                    if (_.isUndefined(enrichedData[entryUri][property])) {
                        enrichedData[entryUri][property] = object;
                    }
                    else if (false === _.isArray(enrichedData[entryUri][property])) {
                        enrichedData[entryUri][property] = [enrichedData[entryUri][property], object];
                    }
                    else if (_.isArray(enrichedData[entryUri][property])) {
                        enrichedData[entryUri][property].push(object);
                    }
                }
                _.each(possibleMappingKeys, function (key) {
                    if (false == _.isUndefined(mapping[key]) && false == _.isUndefined(entry[mapping[key]])) {
                        enrichedData[entryUri][key] = entry[mapping[key]].value;
                    }
                });
            });
            return enrichedData;
        };
        DataCubeInfoHelper.prototype.executeCheckConstraints = function (dataSetUri, graphUri) {
            this.initCheckConstraints(dataSetUri, graphUri);
            var self = this, sparqlHandler = new CubeViz.SparqlHandler(this.app.configuration.sparqlEndpointUrl);
            _.each(this.checkConstraints, function (checkConstraint, key) {
                sparqlHandler.sendQuery(checkConstraint.sparqlQuery, function (data) {
                    self.app.triggerEvent('onLoad_checkConstraint', {
                        description: checkConstraint.description,
                        key: key,
                        id: checkConstraint.id,
                        result: data.boolean,
                        title: checkConstraint.title
                    });
                }, function (data) {
                    console.log('error');
                    console.log(data);
                });
            });
        };
        DataCubeInfoHelper.prototype.initCheckConstraints = function (dataSetUri, graphUri) {
            this.checkConstraints = [
                {
                    description: 'Every qb:Observation has exactly one associated qb:DataSet.',
                    id: 'ic-1',
                    sparqlQuery: "PREFIX qb:<http://purl.org/linked-data/cube#>\n                        ASK FROM <" + graphUri + "> {{\n                            ?obs a qb:Observation .\n                            FILTER NOT EXISTS { ?obs qb:dataSet ?dataset1 . }\n                        } UNION {\n                            ?obs a qb:Observation ;\n                            qb:dataSet ?dataset1, ?dataset2 .\n                            FILTER (?dataset1 != ?dataset2)\n                        }}",
                    title: 'Unique DataSet'
                }, {
                    description: 'Every qb:DataSet has exactly one associated qb:DataStructureDefinition.',
                    id: 'ic-2',
                    sparqlQuery: "PREFIX qb:<http://purl.org/linked-data/cube#>\n                        ASK FROM <" + graphUri + "> {{\n                            # Check dataset has a dsd\n                            ?dataset a qb:DataSet .\n                            FILTER NOT EXISTS { ?dataset qb:structure ?dsd . }\n                        } UNION {\n                            # Check has just one dsd\n                            ?dataset a qb:DataSet ;\n                               qb:structure ?dsd1, ?dsd2 .\n                            FILTER (?dsd1 != ?dsd2)\n                        }}",
                    title: 'Unique DSD'
                }, {
                    description: 'Every qb:DataStructureDefinition must include at least one declared measure.',
                    id: 'ic-3',
                    sparqlQuery: "PREFIX qb:<http://purl.org/linked-data/cube#>\n                        ASK FROM <" + graphUri + "> {\n                            ?dsd a qb:DataStructureDefinition .\n                            FILTER NOT EXISTS { ?dsd qb:component [qb:componentProperty [a qb:MeasureProperty]] }\n                        }",
                    title: 'DSD includes measure'
                }, {
                    description: 'Every dimension declared in a qb:DataStructureDefinition must have a declared rdfs:range.',
                    id: 'ic-4',
                    sparqlQuery: "PREFIX qb:<http://purl.org/linked-data/cube#>\n                        ASK FROM <" + graphUri + "> {\n                          ?dim a qb:DimensionProperty .\n                          FILTER NOT EXISTS { ?dim rdfs:range [] }\n                        }",
                    title: 'Dimensions have range'
                }, {
                    description: 'Every dimension with range skos:Concept must have a qb:codeList.',
                    id: 'ic-5',
                    sparqlQuery: "PREFIX qb:<http://purl.org/linked-data/cube#>\n                        ASK FROM <" + graphUri + "> {\n                            ?dsd a qb:DataStructureDefinition .\n                            FILTER NOT EXISTS { ?dsd qb:component [qb:componentProperty [a qb:MeasureProperty]] }\n                        }",
                    title: 'Concept dimensions have code lists'
                }, {
                    description: 'The only components of a qb:DataStructureDefinition that may be marked as optional, using qb:componentRequired are attributes.',
                    id: 'ic-6',
                    sparqlQuery: "PREFIX qb:<http://purl.org/linked-data/cube#>\n                        ASK FROM <" + graphUri + "> {\n                            ?dsd qb:component ?componentSpec .\n                            ?componentSpec qb:componentRequired \"false\"^^xsd:boolean ;\n                                qb:componentProperty ?component .\n                            FILTER NOT EXISTS { ?component a qb:AttributeProperty }\n                        }",
                    title: 'Only attributes may be optional'
                }, {
                    description: 'Every qb:SliceKey must be associated with a qb:DataStructureDefinition.',
                    id: 'ic-7',
                    sparqlQuery: "PREFIX qb:<http://purl.org/linked-data/cube#>\n                        ASK FROM <" + graphUri + "> {\n                            ?sliceKey a qb:SliceKey .\n                            FILTER NOT EXISTS { [a qb:DataStructureDefinition] qb:sliceKey ?sliceKey }\n                        }",
                    title: 'Slice Keys must be declared'
                }, {
                    description: 'Every qb:componentProperty on a qb:SliceKey must also be declared as a qb:component of the associated qb:DataStructureDefinition.',
                    id: 'ic-8',
                    sparqlQuery: "PREFIX qb:<http://purl.org/linked-data/cube#>\n                        ASK FROM <" + graphUri + "> {\n                            ?slicekey a qb:SliceKey;\n                            qb:componentProperty ?prop .\n                            ?dsd qb:sliceKey ?slicekey .\n                            FILTER NOT EXISTS { ?dsd qb:component [qb:componentProperty ?prop] }\n                        }",
                    title: 'Slice Keys consistent with DSD'
                }, {
                    description: 'Each qb:Slice must have exactly one associated qb:sliceStructure.',
                    id: 'ic-9',
                    sparqlQuery: "PREFIX qb:<http://purl.org/linked-data/cube#>\n                        ASK FROM <" + graphUri + "> {{\n                            # Slice has a key\n                            ?slice a qb:Slice .\n                            FILTER NOT EXISTS { ?slice qb:sliceStructure ?key }\n                        } UNION {\n                            # Slice has just one key\n                            ?slice a qb:Slice ;\n                            qb:sliceStructure ?key1, ?key2;\n                            FILTER (?key1 != ?key2)\n                        }}",
                    title: 'Unique slice structure'
                }, {
                    description: 'Every qb:Slice must have a value for every dimension declared in its qb:sliceStructure.',
                    id: 'ic-10',
                    sparqlQuery: "PREFIX qb:<http://purl.org/linked-data/cube#>\n                        ASK FROM <" + graphUri + "> {\n                            ?slice qb:sliceStructure [qb:componentProperty ?dim] .\n                            FILTER NOT EXISTS { ?slice ?dim [] }\n                        }",
                    title: 'Slice dimensions complete'
                }, {
                    description: 'Every qb:Observation has a value for each dimension declared in its associated qb:DataStructureDefinition.',
                    id: 'ic-11',
                    sparqlQuery: "PREFIX qb:<http://purl.org/linked-data/cube#>\n                        ASK FROM <" + graphUri + "> {\n                            ?obs qb:dataSet/qb:structure/qb:component/qb:componentProperty ?dim .\n                            ?dim a qb:DimensionProperty;\n                            FILTER NOT EXISTS { ?obs ?dim [] }\n                        }",
                    title: 'All dimensions required'
                }, {
                    description: 'No two qb:Observations in the same qb:DataSet may have the same value for all dimensions.',
                    id: 'ic-12',
                    sparqlQuery: "PREFIX qb:<http://purl.org/linked-data/cube#>\n                        ASK FROM <" + graphUri + "> {\n                            FILTER( ?allEqual )\n                            {\n                                # For each pair of observations test if all the dimension values are the same\n                                SELECT (MIN(?equal) AS ?allEqual) WHERE {\n                                    ?obs1 qb:dataSet ?dataset .\n                                    ?obs2 qb:dataSet ?dataset .\n                                    FILTER (?obs1 != ?obs2)\n                                    ?dataset qb:structure/qb:component/qb:componentProperty ?dim .\n                                    ?dim a qb:DimensionProperty .\n                                    ?obs1 ?dim ?value1 .\n                                    ?obs2 ?dim ?value2 .\n                                    BIND( ?value1 = ?value2 AS ?equal)\n                                } GROUP BY ?obs1 ?obs2\n                            }\n                        }",
                    title: 'No duplicate observations'
                }, {
                    description: 'Every qb:Observation has a value for each declared attribute that is marked as required.',
                    id: 'ic-13',
                    sparqlQuery: "PREFIX qb:<http://purl.org/linked-data/cube#>\n                        ASK FROM <" + graphUri + "> {\n                            ?obs qb:dataSet/qb:structure/qb:component ?component .\n                            ?component qb:componentRequired \"true\"^^xsd:boolean ;\n                                       qb:componentProperty ?attr .\n                            FILTER NOT EXISTS { ?obs ?attr [] }\n                        }",
                    title: 'Required attributes'
                }, {
                    description: 'In a qb:DataSet which does not use a Measure dimension then each individual qb:Observation must have a value for every declared measure.',
                    id: 'ic-14',
                    sparqlQuery: "PREFIX qb:<http://purl.org/linked-data/cube#>\n                        ASK FROM <" + graphUri + "> {\n                            # Observation in a non-measureType cube\n                            ?obs qb:dataSet/qb:structure ?dsd .\n                            FILTER NOT EXISTS { ?dsd qb:component/qb:componentProperty qb:measureType }\n\n                            # verify every measure is present\n                            ?dsd qb:component/qb:componentProperty ?measure .\n                            ?measure a qb:MeasureProperty.\n                            FILTER NOT EXISTS { ?obs ?measure [] }\n                        }",
                    title: 'All measures present'
                }, {
                    description: 'In a qb:DataSet which uses a Measure dimension then each qb:Observation must have a value for the measure corresponding to its given qb:measureType',
                    id: 'ic-15',
                    sparqlQuery: "PREFIX qb:<http://purl.org/linked-data/cube#>\n                        ASK FROM <" + graphUri + "> {\n                            # Observation in a measureType-cube\n                            ?obs qb:dataSet/qb:structure ?dsd ;\n                                 qb:measureType ?measure .\n                            ?dsd qb:component/qb:componentProperty qb:measureType .\n                            # Must have value for its measureType\n                            FILTER NOT EXISTS { ?obs ?measure [] }\n                        }",
                    title: 'Measure dimension consistent'
                }, {
                    description: 'In a qb:DataSet which uses a Measure dimension then each qb:Observation must only have a value for one measure (by IC-15 this will be the measure corresponding to its qb:measureType).',
                    id: 'ic-16',
                    sparqlQuery: "PREFIX qb:<http://purl.org/linked-data/cube#>\n                        ASK FROM <" + graphUri + "> {\n                            # Observation with measureType\n                            ?obs qb:dataSet/qb:structure ?dsd ;\n                                 qb:measureType ?measure ;\n                                 ?omeasure [] .\n                            # Any measure on the observation\n                            ?dsd qb:component/qb:componentProperty qb:measureType ;\n                                 qb:component/qb:componentProperty ?omeasure .\n                            ?omeasure a qb:MeasureProperty .\n                            # Must be the same as the measureType\n                            FILTER (?omeasure != ?measure)\n                        }",
                    title: 'Single measure on measure dimension observation'
                }, {
                    description: 'If a qb:DataSet D has a qb:slice S, and S has an qb:observation O, then the qb:dataSet corresponding to O must be D.',
                    id: 'ic-18',
                    sparqlQuery: "PREFIX qb:<http://purl.org/linked-data/cube#>\n                        ASK FROM <" + graphUri + "> {\n                            ?dataset qb:slice       ?slice .\n                            ?slice   qb:observation ?obs .\n                            FILTER NOT EXISTS { ?obs qb:dataSet ?dataset . }\n                        }",
                    title: 'Consistent data set links'
                }, {
                    description: "If a dimension property has a qb:codeList, then the value of the dimension property on\n                                  every qb:Observation must be in the code list.\n                                  The following integrity check queries must be applied to an RDF graph which contains\n                                  the definition of the code list as well as the Data Cube to be checked.\n                                  In the case of a skos:ConceptScheme then each concept must be linked to the scheme using\n                                  skos:inScheme. In the case of a skos:Collection then the collection must link to each\n                                  concept (or to nested collections) using skos:member. If the collection uses skos:memberList\n                                  then the entailment of skos:member values defined by S36 in [SKOS-REFERENCE] must be\n                                  materialized before this check is applied.",
                    id: 'ic-19',
                    sparqlQuery: "PREFIX qb:<http://purl.org/linked-data/cube#>\n                        ASK FROM <" + graphUri + "> {\n                            ?obs qb:dataSet/qb:structure/qb:component/qb:componentProperty ?dim .\n                            ?dim a qb:DimensionProperty ;\n                                qb:codeList ?list .\n                            {\n                                ?list a skos:ConceptScheme .\n                            } UNION {\n                                ?list a skos:Collection .\n                            }\n                            ?obs ?dim ?v .\n                            FILTER NOT EXISTS { ?v a skos:Concept ; skos:inScheme ?list }\n                            FILTER NOT EXISTS { ?v a skos:Concept . ?list skos:member+ ?v }\n                        }",
                    title: 'Codes from code list'
                }
            ];
        };
        DataCubeInfoHelper.prototype.loadAttributes = function (dataSetUri) {
            var self = this;
            this.loadComponents(this.app.data.selected.dataSet.__cv_uri, 'qb:attribute', this.app.data.selected.graph.__cv_uri, function (data) {
                self.app.data.selected.attributes = self.enrichData(data.results.bindings, {
                    __cv_componentSpecification: 'componentSpecification',
                    __cv_uri: 'component'
                });
                self.app.triggerEvent('onLoad_attributes', self.app.data.selected.attributes);
            }, function (data) {
                console.log('error');
                console.log(data);
            });
        };
        DataCubeInfoHelper.prototype.loadComponents = function (dsUri, componentTypePrefixedUri, graphUri, onSuccess, onError) {
            var sparqlHandler = new CubeViz.SparqlHandler(this.app.configuration.sparqlEndpointUrl);
            sparqlHandler.sendQuery("PREFIX qb: <http://purl.org/linked-data/cube#>\n                SELECT ?component ?p ?o ?componentSpecification\n                FROM <" + graphUri + ">\n                WHERE {\n                    <" + dsUri + "> qb:structure ?dsd.\n                    ?dsd qb:component ?componentSpecification.\n                    ?componentSpecification a qb:ComponentSpecification.\n                    ?componentSpecification " + componentTypePrefixedUri + " ?component.\n                    ?component ?p ?o.\n                }", onSuccess, onError);
        };
        DataCubeInfoHelper.prototype.loadComponentElements = function (dataSetUri, componentUri, graphUri) {
            var sparqlHandler = new CubeViz.SparqlHandler(this.app.configuration.sparqlEndpointUrl);
            return sparqlHandler.sendQuery("PREFIX qb: <http://purl.org/linked-data/cube#>\n                SELECT DISTINCT ?componentElementUri ?p ?o ?componentUri\n                FROM <" + graphUri + ">\n                WHERE {\n                    {\n                        ?observation <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> qb:Observation.\n                        ?observation qb:dataSet <" + dataSetUri + ">.\n                        ?observation <" + componentUri + "> ?componentElementUri.\n                        ?observation ?componentUri ?componentElementUri.\n                        OPTIONAL {\n                            ?componentElementUri ?p ?o.\n                        }\n                    }\n                    UNION\n                    {\n                        ?componentElementUri a ?componentUri.\n                        ?componentElementUri a <" + componentUri + ">.\n                        ?componentElementUri ?p ?o.\n                    }\n                }");
        };
        DataCubeInfoHelper.prototype.loadDimensions = function (dataSetUri) {
            var self = this;
            this.loadComponents(this.app.data.selected.dataSet.__cv_uri, 'qb:dimension', this.app.data.selected.graph.__cv_uri, function (data) {
                self.app.data.received.dimensions = self.enrichData(data.results.bindings, {
                    __cv_componentSpecification: 'componentSpecification',
                    __cv_uri: 'component'
                });
                var responseObjects = [];
                _.each(self.app.data.received.dimensions, function (dimension) {
                    responseObjects.push(self.loadComponentElements(self.app.data.selected.dataSet.__cv_uri, dimension.__cv_uri, self.app.data.selected.graph.__cv_uri));
                });
                $.when.apply(null, responseObjects).done(function () {
                    if (_.isArray(arguments[0])) {
                        _.each(arguments, function (argumentArray) {
                            self.app.data.received.dimensions = self.storeDimensionElmementsInDimension(self.app.data.received.dimensions, argumentArray[0].results.bindings);
                        });
                        self.app.triggerEvent('onLoad_dimensions', self.app.data.received.dimensions);
                    }
                    else if (_.isObject(arguments[0])) {
                        self.app.data.received.dimensions = self.storeDimensionElmementsInDimension(self.app.data.received.dimensions, arguments[0][0].results.bindings);
                        self.app.triggerEvent('onLoad_dimensions', self.app.data.received.dimensions);
                    }
                    else {
                        console.log('loadAvailableDimensions -> Unknown case happen:');
                        console.log(arguments);
                    }
                });
            }, function (data) {
                console.log('error');
                console.log(data);
            });
        };
        DataCubeInfoHelper.prototype.loadMeasures = function (dataSetUri) {
            var self = this;
            this.loadComponents(this.app.data.selected.dataSet.__cv_uri, 'qb:measure', this.app.data.selected.graph.__cv_uri, function (data) {
                self.app.data.received.measures = self.enrichData(data.results.bindings, {
                    __cv_componentSpecification: 'componentSpecification',
                    __cv_uri: 'component'
                });
                self.app.triggerEvent('onLoad_measures', self.app.data.received.measures);
            }, function (data) {
                console.log('error');
                console.log(data);
            });
        };
        DataCubeInfoHelper.prototype.loadNumberOfObservations = function (dsUri, graphUri) {
            var self = this, sparqlHandler = new CubeViz.SparqlHandler(this.app.configuration.sparqlEndpointUrl);
            sparqlHandler.sendQuery("PREFIX qb: <http://purl.org/linked-data/cube#>\n                SELECT DISTINCT COUNT (?observation)\n                FROM <" + graphUri + ">\n                WHERE {\n                    ?observation <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> qb:Observation.\n                    ?observation qb:dataSet <" + dsUri + ">.\n                }", function (data) {
                self.app.triggerEvent('onLoad_numberOfObservations', data.results.bindings[0]['callret-0'].value);
            }, function (data) {
                console.log('error');
                console.log(data);
            });
        };
        DataCubeInfoHelper.prototype.onFound_dataCubeInformation = function (event, dataSetUri) {
            var self = this, sparqlHandler = new CubeViz.SparqlHandler(this.app.configuration.sparqlEndpointUrl);
            sparqlHandler.sendQuery("PREFIX qb: <http://purl.org/linked-data/cube#>\n                SELECT ?ds ?p ?o\n                FROM <" + dataSetUri + ">\n                WHERE {\n                    ?ds a qb:DataSet.\n                    ?ds ?p ?o.\n                }", function (data) {
                self.app.data.received.dataSets = self.enrichData(data.results.bindings, { __cv_uri: 'ds' });
                self.app.triggerEvent('onLoad_dataSets', self.app.data.received.dataSets);
            }, function (data) {
                console.log('error');
                console.log(data);
            });
        };
        DataCubeInfoHelper.prototype.onSelect_dataSet = function (event, dataSet) {
            this.loadAttributes(dataSet.__cv_uri);
            this.loadDimensions(dataSet.__cv_uri);
            this.loadMeasures(dataSet.__cv_uri);
            this.loadNumberOfObservations(dataSet.__cv_uri, this.app.data.selected.graph.__cv_uri);
            this.executeCheckConstraints(dataSet.__cv_uri, this.app.data.selected.graph.__cv_uri);
        };
        DataCubeInfoHelper.prototype.onSelect_dimension = function (event, dimension) {
            var clonedDimension = JSON.parse(JSON.stringify(dimension));
            clonedDimension.__cv_elements = {};
            this.app.data.selected.dimensions[clonedDimension.__cv_uri] = clonedDimension;
        };
        DataCubeInfoHelper.prototype.onSelect_dimensionElement = function (event, dimensionElement) {
            var clonedDimensionElement = JSON.parse(JSON.stringify(dimensionElement));
            this.app.data.selected
                .dimensions[dimensionElement.__cv_component]
                .__cv_elements[dimensionElement.__cv_uri] = clonedDimensionElement;
        };
        DataCubeInfoHelper.prototype.onSelect_graph = function (event, graph) {
            if (_.isUndefined(graph))
                return;
            var self = this, sparqlHandler = new CubeViz.SparqlHandler(this.app.configuration.sparqlEndpointUrl);
            sparqlHandler.sendQuery("PREFIX qb: <http://purl.org/linked-data/cube#>\n                ASK FROM <" + graph.__cv_uri + ">\n                {\n                    ?obs a qb:Observation .\n                    ?obs qb:dataSet ?dataset .\n                    ?obs ?dimension ?dimelement .\n                    ?obs ?measure ?value .\n                    ?ds a qb:DataSet .\n                    ?ds qb:structure ?dsd .\n                    ?dsd a qb:DataStructureDefinition .\n                    ?dsd qb:component ?dimspec .\n                    ?dsd qb:component ?measspec .\n                    ?dimspec a qb:ComponentSpecification .\n                    ?dimspec qb:dimension ?dimension .\n                    ?measspec a qb:ComponentSpecification .\n                    ?measspec qb:measure ?measure .\n                }", function (data) {
                if (true == data.boolean) {
                    self.app.triggerEvent('onFound_dataCubeInformation', graph.__cv_uri);
                }
            }, function (data) {
                console.log('error');
                console.log(data);
            });
        };
        DataCubeInfoHelper.prototype.onStart_application = function (event) {
            var self = this, sparqlHandler = new CubeViz.SparqlHandler(this.app.configuration.sparqlEndpointUrl);
            sparqlHandler.sendQuery("SELECT ?g WHERE { GRAPH ?g { ?s ?p ?o }}", function (data) {
                var graphs = {};
                _.each(data.results.bindings, function (entry) {
                    graphs[entry.g.value] = { g: entry.g };
                });
                self.app.data.received.graphs = self.enrichData(graphs, { __cv_uri: 'g' });
                self.app.triggerEvent('onLoad_graphs', self.app.data.received.graphs);
            }, function (data) {
                console.log('error');
                console.log(data);
            });
        };
        DataCubeInfoHelper.prototype.storeDimensionElmementsInDimension = function (predefinedDimensions, resultBindings) {
            var componentUri = '', dimensionElements = this.enrichData(resultBindings, {
                __cv_uri: 'componentElementUri',
                __cv_component: 'componentUri'
            }), self = this;
            _.each(dimensionElements, function (dimensionElement) {
                componentUri = dimensionElement.__cv_component;
                if (_.isUndefined(predefinedDimensions[componentUri].__cv_elements)) {
                    predefinedDimensions[componentUri].__cv_elements = {};
                }
                predefinedDimensions[componentUri].__cv_elements[dimensionElement.__cv_uri] = dimensionElement;
            });
            return predefinedDimensions;
        };
        return DataCubeInfoHelper;
    })();
    CubeViz.DataCubeInfoHelper = DataCubeInfoHelper;
})(CubeViz || (CubeViz = {}));
var CubeViz;
(function (CubeViz) {
    var SparqlHandler = (function () {
        function SparqlHandler(sparqlEndpointUrl) {
            this.sparqlEndpointUrl = '';
            this.sparqlEndpointUrl = sparqlEndpointUrl;
        }
        SparqlHandler.prototype.sendQuery = function (query, doneCallee, failCallee) {
            var xhr = $.ajax(this.sparqlEndpointUrl, {
                cache: false,
                dataType: 'json',
                data: {
                    query: query
                }
            });
            if (false == _.isUndefined(doneCallee)) {
                xhr.done(doneCallee);
            }
            else if (false == _.isUndefined(failCallee)) {
                xhr.fail(failCallee);
            }
            else if (_.isUndefined(doneCallee) && _.isUndefined(failCallee)) {
                return xhr;
            }
        };
        return SparqlHandler;
    })();
    CubeViz.SparqlHandler = SparqlHandler;
})(CubeViz || (CubeViz = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CubeViz;
(function (CubeViz) {
    var View;
    (function (View) {
        var DataSelectionView = (function (_super) {
            __extends(DataSelectionView, _super);
            function DataSelectionView(attachedTo, app) {
                _super.call(this, 'DataSelectionView', attachedTo, app);
                this.bindGlobalEvents([
                    {
                        name: 'onLoad_attributes',
                        handler: this.onLoad_attributes
                    },
                    {
                        name: 'onLoad_dataSets',
                        handler: this.onLoad_dataSets
                    },
                    {
                        name: 'onLoad_dimensions',
                        handler: this.onLoad_dimensions
                    },
                    {
                        name: 'onLoad_measures',
                        handler: this.onLoad_measures
                    }
                ]);
            }
            DataSelectionView.prototype.onLoad_attributes = function (event, attributes) {
                this.showAttributes(attributes);
            };
            DataSelectionView.prototype.onLoad_dataSets = function (event, dataSets) {
                this.render();
                this.showDataSets(dataSets);
            };
            DataSelectionView.prototype.onLoad_dimensions = function (event, dimensions) {
                this.showDimensions(dimensions);
            };
            DataSelectionView.prototype.onLoad_measures = function (event, measures) {
                this.showMeasures(measures);
            };
            DataSelectionView.prototype.render = function () {
                $('#' + this.attachedTo).html("\n                <strong>DataSets</strong>\n                <div id=\"" + this.attachedTo + "-dataSets\"></div>\n                <br/>\n                <strong>Measures</strong>\n                <div id=\"" + this.attachedTo + "-measures\"></div>\n                <br/>\n                <strong>Attributes</strong>\n                <div id=\"" + this.attachedTo + "-attributes\"></div>\n                <br/>\n                <strong>Dimensions</strong>\n                <div id=\"" + this.attachedTo + "-dimensions\"></div>\n            ");
            };
            DataSelectionView.prototype.showAttributes = function (attributes) {
                $('#' + this.attachedTo + '-attributes').html(this.compileTemplate("\n                <ul class=\"cubeViz-dataSelection-ul\">\n                    {{#each attributes}}\n                    <li uri=\"{{__cv_uri}}\" class=\"cubeViz-dataSelection-li\">{{__cv_niceLabel}}</li>\n                    {{/each}}\n                </ul>\n            ", { attributes: attributes }));
                var self = this;
                $('#' + this.attachedTo + ' li').click(function (event) {
                    _.each(self.app.data.received.attributes, function (attribute) {
                        if ($(this).attr('uri') == attribute.__cv_uri) {
                            self.app.data.selected.attribute = attribute;
                        }
                    });
                    self.app.triggerEvent('onSelect_attribute', { uri: $(this).attr('uri') });
                    $(this).css('background-color', '#CCCCFF');
                });
            };
            DataSelectionView.prototype.showDataSets = function (dataSets) {
                $('#' + this.attachedTo + '-dataSets').html(this.compileTemplate("<ul  class=\"cubeViz-dataSelection-ul\">\n                    {{#each dataSets}}\n                        <li uri=\"{{__cv_uri}}\" class=\"cubeViz-dataSelection-li\">{{__cv_niceLabel}}</li>\n                    {{/each}}\n                </ul>", { dataSets: dataSets }));
                var self = this;
                $('#' + this.attachedTo + ' li').click(function (event) {
                    var $clickedElement = $(this);
                    _.each(self.app.data.received.dataSets, function (dataSet) {
                        if ($clickedElement.attr('uri') == dataSet.__cv_uri) {
                            self.app.data.selected.dataSet = dataSet;
                            self.app.triggerEvent('onSelect_dataSet', dataSet);
                            $clickedElement.css('background-color', '#CCCCFF');
                        }
                    });
                });
            };
            DataSelectionView.prototype.showDimensions = function (dimensions) {
                $('#' + this.attachedTo + '-dimensions').html(this.compileTemplate("\n                <ul class=\"" + this.attachedTo + '-ul' + "\">\n                    {{#each dimensions}}\n                    <li class=\"" + this.attachedTo + '-li' + "\">\n                        <div class=\"" + this.attachedTo + '-dimensions-dimension' + "\" uri=\"{{__cv_uri}}\">\n                            {{__cv_niceLabel}}</div>\n                        <ul class=\"" + this.attachedTo + '-subUl' + "\">\n                            {{#each __cv_elements}}\n                            <li class=\"" + this.attachedTo + "-dimensions-dimensionElement " + this.attachedTo + "-subLi\"\n                                uri=\"{{__cv_uri}}\">{{__cv_niceLabel}}</li>\n                            {{/each}}\n                        </ul>\n                    </li>\n                    {{/each}}\n                </ul>\n            ", { dimensions: dimensions }));
                var self = this;
                $('.' + this.attachedTo + '-dimensions-dimension').click(function (event) {
                    var $clickedElement = $(this);
                    _.each(self.app.data.received.dimensions, function (dimension) {
                        if ($clickedElement.attr('uri') == dimension.__cv_uri) {
                            self.app.triggerEvent('onSelect_dimension', dimension);
                            $clickedElement.css('background-color', '#CCCCFF');
                        }
                    });
                });
                $('.' + this.attachedTo + '-dimensions-dimensionElement').click(function (event) {
                    var $clickedElement = $(this), dimensionUri = $(_.first($($clickedElement.parent()).parent().children())).attr('uri');
                    self.app.triggerEvent('onSelect_dimensionElement', self.app.getDimensionElement($clickedElement.attr('uri'), dimensionUri));
                    $clickedElement.css('background-color', '#CCCCFF');
                });
            };
            DataSelectionView.prototype.showMeasures = function (measures) {
                $('#' + this.attachedTo + '-measures').html(this.compileTemplate("\n                <ul class=\"" + this.attachedTo + '-ul' + "\">\n                    {{#each measures}}\n                    <li class=\"" + this.attachedTo + '-li' + "\" uri=\"{{__cv_uri}}\">{{__cv_niceLabel}}</li>\n                    {{/each}}\n                </ul>\n            ", { measures: measures }));
                var self = this;
                $('#' + this.attachedTo + ' li').click(function (event) {
                    _.each(self.app.data.received.measures, function (measure) {
                        if ($(this).attr('uri') == measure.__cv_uri) {
                            self.app.data.selected.measure[measure.__cv_uri] = measure;
                            self.app.triggerEvent('onSelect_measure', { measure: measure });
                            $(this).css('background-color', '#CCCCFF');
                        }
                    });
                });
            };
            return DataSelectionView;
        })(CubeViz.AbstractView);
        View.DataSelectionView = DataSelectionView;
    })(View = CubeViz.View || (CubeViz.View = {}));
})(CubeViz || (CubeViz = {}));
var CubeViz;
(function (CubeViz) {
    var View;
    (function (View) {
        var DataSetAnalyzerView = (function (_super) {
            __extends(DataSetAnalyzerView, _super);
            function DataSetAnalyzerView(attachedTo, app) {
                _super.call(this, 'DataSetAnalyzerView', attachedTo, app);
                this.bindGlobalEvents([
                    {
                        name: 'onLoad_attributes',
                        handler: this.onLoad_attributes
                    },
                    {
                        name: 'onLoad_checkConstraint',
                        handler: this.onLoad_checkConstraint
                    },
                    {
                        name: 'onLoad_dimensions',
                        handler: this.onLoad_dimensions
                    },
                    {
                        name: 'onLoad_measures',
                        handler: this.onLoad_measures
                    },
                    {
                        name: 'onLoad_numberOfObservations',
                        handler: this.onLoad_numberOfObservations
                    },
                    {
                        name: 'onSelect_dataSet',
                        handler: this.onSelect_dataSet
                    }
                ]);
            }
            DataSetAnalyzerView.prototype.onLoad_attributes = function (event, attributes) {
                this.showAttributes(attributes);
            };
            DataSetAnalyzerView.prototype.onLoad_checkConstraint = function (event, data) {
                var content = '';
                if (data.result) {
                    content = '<strong>ASK query lead to true, so integrity problem!</strong>';
                }
                else {
                    content = '<strong>OK!</strong>';
                }
                $('#' + this.attachedTo + "-checkConstraints-id" + data.key).html(data.id + " - " + data.title + ': ' + content + '<br>' +
                    '<small>' + data.description + '</small>');
            };
            DataSetAnalyzerView.prototype.onLoad_dimensions = function (event, dimensions) {
                this.showDimensions(dimensions);
            };
            DataSetAnalyzerView.prototype.onLoad_measures = function (event, measures) {
                this.showMeasures(measures);
            };
            DataSetAnalyzerView.prototype.onLoad_numberOfObservations = function (event, numberOfObservations) {
                this.showNumberOfObservations(numberOfObservations);
            };
            DataSetAnalyzerView.prototype.onSelect_dataSet = function (event, dataSet) {
                this.render();
                this.showDataSet(dataSet);
            };
            DataSetAnalyzerView.prototype.render = function () {
                var self = this;
                $('#' + this.attachedTo).html("\n                <div id=\"" + this.attachedTo + "-dataSet\"></div>\n                <div id=\"" + this.attachedTo + "-measures\"></div>\n                <div id=\"" + this.attachedTo + "-attributes\"></div>\n                <div id=\"" + this.attachedTo + "-dimensions\"></div>\n                <div id=\"" + this.attachedTo + "-numberOfObservations\"></div>\n                <br/>\n                <br/>\n                <strong>Check constraints</strong>\n                <div id=\"" + this.attachedTo + "-checkConstraints\"></div>\n            ");
                _.times(19, function (n) {
                    $('#' + self.attachedTo + '-checkConstraints').append("<div class=\"" + self.attachedTo + "-checkConstraints-entry\"\n                          id=\"" + self.attachedTo + "-checkConstraints-id" + n + "\"></div>");
                });
            };
            DataSetAnalyzerView.prototype.showAttributes = function (attributes) {
                if (0 == _.keys(attributes).length) {
                    $('#' + this.attachedTo + '-attributes').html('Available attributes: <strong>No attributes found</strong>');
                }
                else {
                    $('#' + this.attachedTo + '-attributes').html(this.compileTemplate("\n                    Available attributes:\n                    <ul>\n                        {{#each attributes}}\n                        <li>{{__cv_niceLabel}}</li>\n                        {{/each}}\n                    </ul>\n                ", { attributes: attributes }));
                }
            };
            DataSetAnalyzerView.prototype.showDataSet = function (dataSet) {
                if (0 == _.keys(dataSet).length) {
                    $('#' + this.attachedTo + '-dataSet').html('Selected DataSet: <strong>No dataset found</strong>');
                }
                else {
                    $('#' + this.attachedTo + '-dataSet').html(this.compileTemplate("\n                    Selected DataSet: <strong>{{__cv_niceLabel}}</strong>\n                ", dataSet));
                }
            };
            DataSetAnalyzerView.prototype.showDimensions = function (dimensions) {
                if (0 == _.keys(dimensions).length) {
                    $('#' + this.attachedTo + '-dataSet').html('Available dimensions: <strong>No dimensions found</strong>');
                }
                else {
                    $('#' + this.attachedTo + '-dimensions').html(this.compileTemplate("\n                    Available dimensions:\n                    <ul>\n                        {{#each dimensions}}\n                        <li>\n                            {{__cv_niceLabel}}\n                            <ul class=\"" + this.attachedTo + '-subUl' + "\">\n                                {{#each __cv_elements}}\n                                <li class=\"" + this.attachedTo + "-dimensions-dimensionElement " + this.attachedTo + "-subLi\"\n                                    uri=\"{{__cv_uri}}\">{{__cv_niceLabel}}</li>\n                                {{/each}}\n                            </ul>\n                        </li>\n                        {{/each}}\n                    </ul>\n                ", { dimensions: dimensions }));
                }
            };
            DataSetAnalyzerView.prototype.showMeasures = function (measures) {
                if (0 == _.keys(measures).length) {
                    $('#' + this.attachedTo + '-dataSet').html('Available measures: <strong>No measures found</strong>');
                }
                else {
                    $('#' + this.attachedTo + '-measures').html(this.compileTemplate("\n                    Available measures:\n                    <ul>\n                        {{#each measures}}\n                        <li>{{__cv_niceLabel}}</li>\n                        {{/each}}\n                    </ul>\n                ", { measures: measures }));
                }
            };
            DataSetAnalyzerView.prototype.showNumberOfObservations = function (numberOfObservations) {
                $('#' + this.attachedTo + '-numberOfObservations').html(this.compileTemplate("\n                Number of observations: <strong>{{numberOfObservations}}</strong>\n            ", { numberOfObservations: numberOfObservations }));
            };
            return DataSetAnalyzerView;
        })(CubeViz.AbstractView);
        View.DataSetAnalyzerView = DataSetAnalyzerView;
    })(View = CubeViz.View || (CubeViz.View = {}));
})(CubeViz || (CubeViz = {}));
var CubeViz;
(function (CubeViz) {
    var View;
    (function (View) {
        var GraphSelectionView = (function (_super) {
            __extends(GraphSelectionView, _super);
            function GraphSelectionView(attachedTo, app) {
                _super.call(this, 'GraphSelectionView', attachedTo, app);
                this.bindGlobalEvents([
                    {
                        name: 'onLoad_graphs',
                        handler: this.onLoad_graphs
                    }
                ]);
            }
            GraphSelectionView.prototype.onLoad_graphs = function (event, graphs) {
                this.destroy();
                this.showGraphs(graphs);
            };
            GraphSelectionView.prototype.showGraphs = function (graphs) {
                $('#' + this.attachedTo).html(this.compileTemplate("<ul class=\"" + this.attachedTo + "-ul\">\n                    {{#each graphs}}\n                        <li class=\"" + this.attachedTo + "-li\" uri=\"{{__cv_uri}}\">{{__cv_niceLabel}}</li>\n                    {{/each}}\n                </ul>", { graphs: graphs }));
                var self = this;
                $('#' + this.attachedTo + ' li').click(function (event) {
                    var $clickedElement = $(this);
                    _.each(self.app.data.received.graphs, function (graph) {
                        if ($clickedElement.attr('uri') == graph.__cv_uri) {
                            self.app.data.selected.graph = graph;
                            self.app.triggerEvent('onSelect_graph', graph);
                            $clickedElement.css('background-color', '#CCCCFF');
                        }
                    });
                });
            };
            return GraphSelectionView;
        })(CubeViz.AbstractView);
        View.GraphSelectionView = GraphSelectionView;
    })(View = CubeViz.View || (CubeViz.View = {}));
})(CubeViz || (CubeViz = {}));
var CubeViz;
(function (CubeViz) {
    var View;
    (function (View) {
        var InfoHeaderView = (function (_super) {
            __extends(InfoHeaderView, _super);
            function InfoHeaderView(attachedTo, app) {
                _super.call(this, 'InfoHeaderView', attachedTo, app);
                this.bindGlobalEvents([
                    {
                        name: "onSelect_graph",
                        handler: this.onSelect_graph
                    }
                ]);
            }
            InfoHeaderView.prototype.onSelect_graph = function (event, graph) {
                $('#' + this.attachedTo).html("\n                <div id=\"" + this.attachedTo + "-headline\">" + graph.__cv_uri + "</div>\n            ");
            };
            return InfoHeaderView;
        })(CubeViz.AbstractView);
        View.InfoHeaderView = InfoHeaderView;
    })(View = CubeViz.View || (CubeViz.View = {}));
})(CubeViz || (CubeViz = {}));
