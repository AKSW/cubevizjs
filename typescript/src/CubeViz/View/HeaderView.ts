namespace CubeViz.View
{
    export class HeaderView extends AbstractView
    {
        /**
         *
         */
        constructor(attachedTo:string, app:Application)
        {
            super('View_IndexAction_Header', attachedTo, app);

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
