namespace CubeViz.View
{
    export class HeaderView extends AbstractView
    {
        /**
         * @param string      attachedTo
         * @param Application app
         */
        constructor(attachedTo:string, app:Application)
        {
            super('HeaderView', attachedTo, app);

            // publish event handlers to application:
            // if one of these events get triggered, the associated handler will
            // be executed to handle it
            this.bindGlobalEvents([
                {
                    name:    "onStart_application",
                    handler: this.onStart_application
                }
            ]);
        }

        public onStart_application()
        {
            console.log('Hello iam the HeaderView');
        }
    }
}
