namespace CubeViz
{
    export class AbstractView implements View
    {
        /**
         * Reference to application which called this instance
         */
        public app:Application;

        /**
         *
         */
        public autostart:boolean = false;

        /**
         * Classname or id of HTML element to attach the view.
         */
        public attachedTo:string;

        /**
         *
         */
        public id:string;

        /**
         *
         */
        constructor(id:string, attachedTo:string, app:Application)
        {
            // set properties
            this.app = app;
            this.attachedTo = attachedTo;
            this.id = id || 'view';
        }

        /**
         *
         */
        public bindGlobalEvents(events:any[]) : void
        {
            this.app.bindGlobalEvents(events, this);
        }

        /**
         * Binds events to DOM elements (using $.proxy!)
         *
         * @return void
         * @throws Error
         */
        public bindUserInterfaceEvents(events?:any) : void
        {
            if(true === _.isUndefined(events) || 0 == _.size(events) )
                return;

            var eventName:string = '',
                selector:string = '',
                self:AbstractView = this;

            // iterate over events's properties: each property/value pair represents
            // a event type with event target and the method
            _.each(events, function(method:any, key:string){
                if (false === _.isFunction(method)) {
                    // ???? method = self[method];
                }
                if (!method) {
                    throw new Error("Method " + method + " does not exist");
                }

                eventName = key.substr(0, key.indexOf(" "));
                selector = key.substr(key.indexOf(" ")+1);

                // bind given event
                // want to find out more about the proxy method?
                // have a look at: http://www.jimmycuadra.com/posts/understanding-jquery-14s-proxy-method
                $(selector).on(eventName, $.proxy(method, self));
            });
        }

        /**
         * Unbind all events, empty (empty it, delete all of its elements) element and
         * reset its collection .
         * @return CubeViz_View_Abstract Itself, for chaining.
         */
        public destroy() : void
        {
            var el:any = $(this.attachedTo);

            // Unbind all events
            el.off();

            // if el is a div, empty it
            if(true === el.is("div")) {
                el.empty();

            // if el is a select box, delete all of its option's
            } else if (true === el.is("select")) {
                el.find("option").remove();
            }
            // TODO what is with other types?
        }

        /**
         *
         */
        public triggerGlobalEvent(eventName:string, data?:any) : void
        {
            this.app.triggerEvent(eventName, data);
        }

        public initialize()
        {
            throw new Error('Implement initialize');
        }

        public render()
        {
            throw new Error('Implement render');
        }
    }
}
