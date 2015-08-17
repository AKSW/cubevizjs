namespace CubeViz
{
    /**
     *
     */
    export class Application
    {
        /**
         *
         */
        public configuration:any = {};

        /**
         *
         */
        protected eventHandlers:any = {};

        /**
         *
         */
        protected helperInstances:any = {};

        /**
         *
         */
        protected renderedViews:any = {};

        /**
         *
         */
        protected viewInstances:any = {};

        /**
         *
         */
        constructor(configuration:any)
        {
            // TODO add checks

            this.configuration = configuration;

            this.setupHelpers();
        }

        /**
         * Add a new view and set it to autostart or not.
         *
         * @param view View instance to add.
         * @param attachedTo Class or id of a certain DOM element.
         */
        public add(id:string, attachedTo:string) : void
        {
            var viewObj:any = {
                alreadyRendered: false,
                attachedTo: attachedTo,
                id: id,
                instance: null
            };

            // create instance of the given view class
            eval('viewObj.instance = new ' + id + '("' + attachedTo + '", this);');

            this.viewInstances[id] = viewObj;
        }

        /**
         * From a view you have the possibility to bind event handlers to the application
         * the view is running in. If one of the global event is triggered it will
         * run all the associated event handlers.
         *
         * @param events array An array of event objects: each object has a name (for instance
         *                     onChange_visualizationName) and a handler (function)
         * @param callee array The instance (usally a view) which calls this method (used in
         *                     combination with $.proxy to bind this to callee)
         */
        public bindGlobalEvents(events:any[], callee?:any) : void
        {
            if(true === _.isUndefined(events) || 0 == _.size(events)) {
                return;
            }

            var self = this;

            // iterate over events's properties: each property/value pair represents
            // a event type with event target and the method
            _.each(events, function(event:any){
                /*
                 *  event object example:
                 *  ---------------------
                 *  {
                        name:      onChange_visualizationName
                 *      handler:   function(event, data){...}
                 *  }
                 *
                 *  hint: handler should named as the event itself
                 *  hint2: event name is oriented on W3C standard, but separates the
                 *         logical unit from the event itself via an underline.
                 */
                $(self).on(event.name, $.proxy(event.handler, callee));
            });
        }

        /**
         * Destroy a certain view
         *
         * @param id ID of the view.
         */
        public destroyView(id:string) : void
        {
            this.viewInstances.get(id).instance.destroy();
        }

        /**
         * Removes an view instance.
         *
         * @param id ID of the view to remove.
         * @return CubeViz_View_Application Itself
         */
        public removeView(id:string) : void
        {
            delete this.viewInstances[id];
        }

        public setupHelpers() : void
        {
            this.helperInstances['DataCubeInfoHelper'] = new DataCubeInfoHelper(this);
        }

        /**
         * Triggers a global event. Other view may listen to this event and execute
         * their event handlers.
         * @param eventName Name of the event to fire
         * @param data Additional data to pass through the event handler as second parameter
         */
        public triggerEvent(eventName:string, data?:any) : void
        {
            $(this).trigger(eventName, [data]);
        }

        /**
         *
         */
        public unbindEvent(eventName:string) : void
        {
            $(this).off(eventName);
        }
    }
}
