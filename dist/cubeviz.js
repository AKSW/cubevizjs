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
            this.renderedViews = {};
            this.viewInstances = {};
            this.configuration = configuration;
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
        Application.prototype.getView = function (id) {
            return this.viewInstances[id];
        };
        Application.prototype.removeView = function (id) {
            delete this.viewInstances[id];
        };
        Application.prototype.renderAll = function () {
            var self = this;
            _.each(this.viewInstances, function (view) {
                self.renderView(view.id, view.attachedTo);
            });
        };
        Application.prototype.renderView = function (id, attachedTo) {
            this.add(id, attachedTo);
            this.destroyView(id);
            this.getView(id).instance.initialize();
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
        var HeaderView = (function (_super) {
            __extends(HeaderView, _super);
            function HeaderView(attachedTo, app) {
                _super.call(this, 'HeaderView', attachedTo, app);
                this.bindGlobalEvents([
                    {
                        name: "onStart_application",
                        handler: this.onStart_application
                    }
                ]);
            }
            HeaderView.prototype.onStart_application = function () {
                console.log('Hello iam the HeaderView');
            };
            return HeaderView;
        })(CubeViz.AbstractView);
        View.HeaderView = HeaderView;
    })(View = CubeViz.View || (CubeViz.View = {}));
})(CubeViz || (CubeViz = {}));
var CubeViz;
(function (CubeViz) {
    var View;
    (function (View) {
        var ModelSelectionView = (function (_super) {
            __extends(ModelSelectionView, _super);
            function ModelSelectionView(attachedTo, app) {
                _super.call(this, 'ModelSelectionView', attachedTo, app);
                this.bindGlobalEvents([
                    {
                        name: "onStart_application",
                        handler: this.onStart_application
                    }
                ]);
            }
            ModelSelectionView.prototype.onStart_application = function () {
                this.destroy();
                this.render();
            };
            ModelSelectionView.prototype.render = function () {
                var self = this, sparqlHandler = new CubeViz.SparqlHandler(this.app.configuration.sparqlEndpointUrl);
                sparqlHandler.sendQuery("SELECT ?g WHERE { GRAPH ?g { ?s ?p ?o }}", function (data) {
                    var graphs = {};
                    _.each(data.results.bindings, function (entry) {
                        graphs[entry.value] = entry.value;
                    });
                    self.showGraphs(graphs);
                }, function (data) {
                    console.log("error");
                    console.log(data);
                });
            };
            ModelSelectionView.prototype.showGraphs = function (graphs) {
                $(this.attachedTo).html(this.compileTemplate("<ul class=\"cubeViz-modelSelection-ul\">\n                    {{#each graphs}}\n                        <li class=\"cubeViz-modelSelection-li\">{{this}}</li>\n                    {{/each}}\n                </ul>", { graphs: graphs }));
            };
            return ModelSelectionView;
        })(CubeViz.AbstractView);
        View.ModelSelectionView = ModelSelectionView;
    })(View = CubeViz.View || (CubeViz.View = {}));
})(CubeViz || (CubeViz = {}));
