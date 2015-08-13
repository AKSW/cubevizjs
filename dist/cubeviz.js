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
        AbstractView.prototype.initialize = function () {
            throw new Error('Implement initialize');
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
            this.eventHandlers = [];
            this.renderedViews = [];
            this.viewInstances = [];
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
                _super.call(this, 'View_IndexAction_Header', attachedTo, app);
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
