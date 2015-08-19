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
        DataCubeInfoHelper.prototype.loadAvailableAttributes = function (dataSetUri) {
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
        DataCubeInfoHelper.prototype.loadAvailableDimensions = function (dataSetUri) {
            var self = this;
            this.loadComponents(this.app.data.selected.dataSet.__cv_uri, 'qb:dimension', this.app.data.selected.graph.__cv_uri, function (data) {
                self.app.data.received.dimensions = self.enrichData(data.results.bindings, {
                    __cv_componentSpecification: 'componentSpecification',
                    __cv_uri: 'component'
                });
                var responseObjects = [];
                _.each(self.app.data.received.dimensions, function (dimension) {
                    responseObjects.push(self.loadAvailableComponentElements(self.app.data.selected.dataSet.__cv_uri, dimension.__cv_uri, self.app.data.selected.graph.__cv_uri));
                });
                $.when.apply(null, responseObjects).done(function () {
                    if (_.isObject(arguments[0])) {
                        var componentUri = '', dimensionElements = self.enrichData(arguments[0].results.bindings, {
                            __cv_component: 'component',
                            __cv_uri: 'componentElement'
                        });
                        _.each(dimensionElements, function (dimensionElement) {
                            componentUri = dimensionElement.__cv_component;
                            if (_.isUndefined(self.app.data.received.dimensions[componentUri].__cv_elements)) {
                                self.app.data.received.dimensions[componentUri].__cv_elements = {};
                            }
                            self.app.data.received.dimensions[componentUri]
                                .__cv_elements[dimensionElement.__cv_uri] = dimensionElement;
                        });
                        self.app.triggerEvent('onLoad_dimensions', self.app.data.received.dimensions);
                    }
                    else if (_.isArray(arguments[0])) {
                        _.each(arguments, function (argumentArray) {
                            console.log(self.enrichData(argumentArray[0].results.bindings, { __cv_uri: 'componentElement' }));
                        });
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
        DataCubeInfoHelper.prototype.loadAvailableComponentElements = function (dataSetUri, componentUri, graphUri) {
            var sparqlHandler = new CubeViz.SparqlHandler(this.app.configuration.sparqlEndpointUrl);
            return sparqlHandler.sendQuery("PREFIX qb: <http://purl.org/linked-data/cube#>\n                SELECT ?componentElement ?p ?o ?component\n                FROM <" + graphUri + ">\n                WHERE {\n                    <" + dataSetUri + "> a qb:DataSet;\n                        qb:component ?componentSpecification.\n                    ?componentSpecification qb:dimension <" + componentUri + ">.\n                    ?componentSpecification qb:dimension ?component.\n                    <" + componentUri + "> a qb:DimensionProperty.\n                    ?componentElement a <" + componentUri + ">.\n                    ?componentElement ?p ?o.\n                }");
        };
        DataCubeInfoHelper.prototype.loadAvailableMeasures = function (dataSetUri) {
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
        DataCubeInfoHelper.prototype.loadComponents = function (dsUri, componentTypePrefixedUri, graphUri, onSuccess, onError) {
            var sparqlHandler = new CubeViz.SparqlHandler(this.app.configuration.sparqlEndpointUrl);
            sparqlHandler.sendQuery("PREFIX qb: <http://purl.org/linked-data/cube#>\n                SELECT ?component ?p ?o ?componentSpecification\n                FROM <" + graphUri + ">\n                WHERE {\n                    <" + dsUri + "> qb:structure ?dsd.\n                    ?dsd qb:component ?componentSpecification.\n                    ?componentSpecification a qb:ComponentSpecification.\n                    ?componentSpecification " + componentTypePrefixedUri + " ?component.\n                    ?component ?p ?o.\n                }", onSuccess, onError);
        };
        DataCubeInfoHelper.prototype.onFound_dataCubeInformation = function (event, data) {
            var self = this, sparqlHandler = new CubeViz.SparqlHandler(this.app.configuration.sparqlEndpointUrl);
            sparqlHandler.sendQuery("PREFIX qb: <http://purl.org/linked-data/cube#>\n                SELECT ?ds ?p ?o\n                FROM <" + this.app.data.selected.graph.__cv_uri + ">\n                WHERE {\n                    ?ds a qb:DataSet.\n                    ?ds ?p ?o.\n                }", function (data) {
                self.app.data.received.dataSets = self.enrichData(data.results.bindings, { __cv_uri: 'ds' });
                self.app.triggerEvent('onLoad_dataSets', self.app.data.received.dataSets);
            }, function (data) {
                console.log('error');
                console.log(data);
            });
        };
        DataCubeInfoHelper.prototype.onSelect_dataSet = function (event, dataSet) {
            this.loadAvailableAttributes(dataSet.__cv_uri);
            this.loadAvailableDimensions(dataSet.__cv_uri);
            this.loadAvailableMeasures(dataSet.__cv_uri);
        };
        DataCubeInfoHelper.prototype.onSelect_dimension = function (event, dimension) {
            var clonedDimension = JSON.parse(JSON.stringify(dimension));
            clonedDimension.__cv_elements = {};
            this.app.data.selected.dimensions[clonedDimension.__cv_uri] = clonedDimension;
        };
        DataCubeInfoHelper.prototype.onSelect_dimensionElement = function (event, data) {
            console.log(data);
        };
        DataCubeInfoHelper.prototype.onSelect_graph = function (event, graph) {
            if (_.isUndefined(graph))
                return;
            var self = this, sparqlHandler = new CubeViz.SparqlHandler(this.app.configuration.sparqlEndpointUrl);
            sparqlHandler.sendQuery("PREFIX qb: <http://purl.org/linked-data/cube#>\n                ASK FROM <" + graph.__cv_uri + ">\n                {\n                    ?obs a qb:Observation .\n                    ?obs qb:dataSet ?dataset .\n                    ?obs ?dimension ?dimelement .\n                    ?obs ?measure ?value .\n                    ?ds a qb:DataSet .\n                    ?ds qb:structure ?dsd .\n                    ?dsd a qb:DataStructureDefinition .\n                    ?dsd qb:component ?dimspec .\n                    ?dsd qb:component ?measspec .\n                    ?dimspec a qb:ComponentSpecification .\n                    ?dimspec qb:dimension ?dimension .\n                    ?measspec a qb:ComponentSpecification .\n                    ?measspec qb:measure ?measure .\n                }", function (data) {
                if (true == data.boolean) {
                    self.app.triggerEvent('onFound_dataCubeInformation');
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
                $('#' + this.attachedTo + '-attributes').html(this.compileTemplate("\n                <ul>\n                    {{#each attributes}}\n                    <li uri=\"{{__cv_uri}}\">{{__cv_niceLabel}}</li>\n                    {{/each}}\n                </ul>\n            ", { attributes: attributes }));
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
                $('#' + this.attachedTo + '-dataSets').html(this.compileTemplate("<ul>\n                    {{#each dataSets}}\n                        <li uri=\"{{__cv_uri}}\">{{__cv_niceLabel}}</li>\n                    {{/each}}\n                </ul>", { dataSets: dataSets }));
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
                $('#' + this.attachedTo + '-dimensions').html(this.compileTemplate("\n                <ul class=\"" + this.attachedTo + '-dimensions-ul' + "\">\n                    {{#each dimensions}}\n                    <li class=\"" + this.attachedTo + '-dimensions-li' + "\">\n                        <div class=\"" + this.attachedTo + '-dimensions-dimension' + "\" uri=\"{{__cv_uri}}\">\n                            {{__cv_niceLabel}}</div>\n                        <ul class=\"" + this.attachedTo + '-dimensions-ul' + "\">\n                            {{#each __cv_elements}}\n                            <li class=\"" + this.attachedTo + "-dimensions-dimensionElement\"\n                                uri=\"{{__cv_uri}}\">{{__cv_niceLabel}}</li>\n                            {{/each}}\n                        </ul>\n                    </li>\n                    {{/each}}\n                </ul>\n            ", { dimensions: dimensions }));
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
                    var dimensionElement = self.app.getDimensionElement($clickedElement.attr('uri'), dimensionUri);
                    self.app.triggerEvent('onSelect_dimensionElement', dimensionElement);
                    $clickedElement.css('background-color', '#CCCCFF');
                });
            };
            DataSelectionView.prototype.showMeasures = function (measures) {
                $('#' + this.attachedTo + '-measures').html(this.compileTemplate("\n                <ul>\n                    {{#each measures}}\n                    <li uri=\"{{__cv_uri}}\">{{__cv_niceLabel}}</li>\n                    {{/each}}\n                </ul>\n            ", { measures: measures }));
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
                        name: 'onLoad_dimensions',
                        handler: this.onLoad_dimensions
                    },
                    {
                        name: 'onLoad_measures',
                        handler: this.onLoad_measures
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
            DataSetAnalyzerView.prototype.onLoad_dimensions = function (event, dimensions) {
                this.showDimensions(dimensions);
            };
            DataSetAnalyzerView.prototype.onLoad_measures = function (event, measures) {
                this.showMeasures(measures);
            };
            DataSetAnalyzerView.prototype.onSelect_dataSet = function (event, dataSet) {
                this.render();
                this.showDataSet(dataSet);
            };
            DataSetAnalyzerView.prototype.render = function () {
                $('#' + this.attachedTo).html("\n                <div id=\"" + this.attachedTo + "-dataSet\"></div>\n                <div id=\"" + this.attachedTo + "-measures\"></div>\n                <div id=\"" + this.attachedTo + "-attributes\"></div>\n                <div id=\"" + this.attachedTo + "-dimensions\"></div>\n            ");
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
                    $('#' + this.attachedTo + '-dimensions').html(this.compileTemplate("\n                    Available dimensions:\n                    <ul>\n                        {{#each dimensions}}\n                        <li>{{__cv_niceLabel}}</li>\n                        {{/each}}\n                    </ul>\n                ", { dimensions: dimensions }));
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
                $('#' + this.attachedTo).html(this.compileTemplate("<ul>\n                    {{#each graphs}}\n                        <li uri=\"{{__cv_uri}}\">{{__cv_niceLabel}}</li>\n                    {{/each}}\n                </ul>", { graphs: graphs }));
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
