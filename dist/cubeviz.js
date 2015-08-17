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
            this.viewInstances = {};
            this.configuration = configuration;
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
            var enrichedData = {}, entryUri = '', mapping = $.extend({}, mapping, { property: 'p', object: 'o' }), object, property = '';
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
                        __cv_niceLabel: entryUri,
                        __cv_uri: entryUri
                    };
                }
                if (false == _.isUndefined(property)) {
                    enrichedData[entryUri][property] = object;
                }
            });
            return enrichedData;
        };
        DataCubeInfoHelper.prototype.loadAvailableAttributes = function (dataSetUri) {
            var self = this;
            this.loadComponents(this.app.configuration.selectedDataSetUri, 'http://purl.org/linked-data/cube#attribute', function (data) {
                self.app.triggerEvent('onLoad_attributes', self.enrichData(data.results.bindings, { __cv_uri: 'comp' }));
            }, function (data) {
                console.log('error');
                console.log(data);
            });
        };
        DataCubeInfoHelper.prototype.loadAvailableDimensions = function (dataSetUri) {
            var self = this;
            this.loadComponents(this.app.configuration.selectedDataSetUri, 'http://purl.org/linked-data/cube#dimension', function (data) {
                self.app.triggerEvent('onLoad_dimensions', self.enrichData(data.results.bindings, { __cv_uri: 'comp' }));
            }, function (data) {
                console.log('error');
                console.log(data);
            });
        };
        DataCubeInfoHelper.prototype.loadAvailableMeasures = function (dataSetUri) {
            var self = this;
            this.loadComponents(this.app.configuration.selectedDataSetUri, 'http://purl.org/linked-data/cube#measure', function (data) {
                console.log(data);
                self.app.triggerEvent('onLoad_measures', self.enrichData(data.results.bindings, { __cv_uri: 'comp' }));
            }, function (data) {
                console.log('error');
                console.log(data);
            });
        };
        DataCubeInfoHelper.prototype.loadComponents = function (dsUri, componentTypeUri, onSuccess, onError) {
            var self = this, sparqlHandler = new CubeViz.SparqlHandler(this.app.configuration.sparqlEndpointUrl);
            sparqlHandler.sendQuery("SELECT ?comp ?p ?o\n                   FROM <" + this.app.configuration.selectedGraphUri + ">\n                WHERE {\n                    <" + dsUri + "> <http://purl.org/linked-data/cube#structure> ?dsd.\n                    ?dsd <http://purl.org/linked-data/cube#component> ?comp.\n                    ?comp <http://www.w3.org/1999/02/22-rdf-syntax-ns#type>\n                        <http://purl.org/linked-data/cube#ComponentSpecification>.\n                    ?comp <" + componentTypeUri + "> ?comptype.\n                    ?comp ?p ?o.\n                }", onSuccess, onError);
        };
        DataCubeInfoHelper.prototype.onFound_dataCubeInformation = function (event, data) {
            var self = this, sparqlHandler = new CubeViz.SparqlHandler(this.app.configuration.sparqlEndpointUrl);
            sparqlHandler.sendQuery("SELECT ?ds ?p ?o\n                FROM <" + this.app.configuration.selectedGraphUri + ">\n                WHERE {\n                    ?ds <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#DataSet>.\n                    ?ds ?p ?o.\n                }", function (data) {
                self.app.triggerEvent('onLoad_dataSets', self.enrichData(data.results.bindings, { __cv_uri: 'ds' }));
            }, function (data) {
                console.log('error');
                console.log(data);
            });
        };
        DataCubeInfoHelper.prototype.onSelect_dataSet = function (event, dataSet) {
            this.loadAvailableMeasures(dataSet.uri);
            this.loadAvailableAttributes(dataSet.uri);
            this.loadAvailableDimensions(dataSet.uri);
        };
        DataCubeInfoHelper.prototype.onSelect_graph = function (event, data) {
            if (_.isUndefined(data))
                return;
            var self = this, sparqlHandler = new CubeViz.SparqlHandler(this.app.configuration.sparqlEndpointUrl);
            sparqlHandler.sendQuery("PREFIX qb: <http://purl.org/linked-data/cube#>\n                ASK FROM <" + data.uri + ">\n                {\n                    ?obs a qb:Observation .\n                    ?obs qb:dataSet ?dataset .\n                    ?obs ?dimension ?dimelement .\n                    ?obs ?measure ?value .\n                    ?ds a qb:DataSet .\n                    ?ds qb:structure ?dsd .\n                    ?dsd a qb:DataStructureDefinition .\n                    ?dsd qb:component ?dimspec .\n                    ?dsd qb:component ?measspec .\n                    ?dimspec a qb:ComponentSpecification .\n                    ?dimspec qb:dimension ?dimension .\n                    ?measspec a qb:ComponentSpecification .\n                    ?measspec qb:measure ?measure .\n                }", function (data) {
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
                self.app.triggerEvent('onLoad_graphs', self.enrichData(graphs, { __cv_uri: 'g' }));
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
            $.ajax(this.sparqlEndpointUrl, {
                cache: false,
                dataType: 'json',
                data: {
                    query: query
                }
            })
                .done(doneCallee)
                .fail(failCallee);
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
                        name: 'onLoad_dataSets',
                        handler: this.onLoad_dataSets
                    }
                ]);
            }
            DataSelectionView.prototype.onLoad_dataSets = function (event, dataSets) {
                this.render();
                this.showDataSets(dataSets);
            };
            DataSelectionView.prototype.render = function () {
                $('#' + this.attachedTo).html("\n                <div id=\"" + this.attachedTo + "-dataSets\"></div>\n                <div id=\"" + this.attachedTo + "-measureUnit\"></div>\n                <div id=\"" + this.attachedTo + "-dimensions\"></div>\n            ");
            };
            DataSelectionView.prototype.showDataSets = function (dataSets) {
                $('#' + this.attachedTo + '-dataSets').html(this.compileTemplate("<ul>\n                    {{#each dataSets}}\n                        <li uri=\"{{__cv_uri}}\">{{__cv_niceLabel}}</li>\n                    {{/each}}\n                </ul>", { dataSets: dataSets }));
                var self = this;
                $('#' + this.attachedTo + ' li').click(function (event) {
                    self.app.configuration.selectedDataSetUri = $(this).attr('uri');
                    self.app.triggerEvent('onSelect_dataSet', { uri: $(this).attr('uri') });
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
                $('#' + this.attachedTo + '-attributes').html(this.compileTemplate("\n                Available attributes:\n                <ul>\n                    {{#each attributes}}\n                    <li>{{__cv_niceLabel}}</li>\n                    {{/each}}\n                </ul>\n            ", { attributes: attributes }));
            };
            DataSetAnalyzerView.prototype.showDataSet = function (dataSet) {
                $('#' + this.attachedTo + '-dataSet').html(this.compileTemplate("\n                Selected DataSet: <strong>{{dataSetUri}}</strong>\n            ", { dataSetUri: dataSet.uri }));
            };
            DataSetAnalyzerView.prototype.showDimensions = function (dimensions) {
                $('#' + this.attachedTo + '-dimensions').html(this.compileTemplate("\n                Available dimensions:\n                <ul>\n                    {{#each dimensions}}\n                    <li>{{__cv_niceLabel}}</li>\n                    {{/each}}\n                </ul>\n            ", { dimensions: dimensions }));
            };
            DataSetAnalyzerView.prototype.showMeasures = function (measures) {
                $('#' + this.attachedTo + '-measures').html(this.compileTemplate("\n                Available measures:\n                <ul>\n                    {{#each measures}}\n                    <li>{{__cv_niceLabel}}</li>\n                    {{/each}}\n                </ul>\n            ", { measures: measures }));
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
                    self.app.configuration.selectedGraphUri = $(this).attr("uri");
                    self.app.triggerEvent('onSelect_graph', { uri: $(this).attr("uri") });
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
            InfoHeaderView.prototype.onSelect_graph = function (event, data) {
                $('#' + this.attachedTo).html("\n                <div id=\"" + this.attachedTo + "-headline\">" + data.uri + "</div>\n            ");
            };
            return InfoHeaderView;
        })(CubeViz.AbstractView);
        View.InfoHeaderView = InfoHeaderView;
    })(View = CubeViz.View || (CubeViz.View = {}));
})(CubeViz || (CubeViz = {}));
