namespace CubeViz.View
{
    export class InfoHeaderView extends AbstractView
    {
        /**
         * @param string      attachedTo
         * @param Application app
         */
        constructor(attachedTo:string, app:Application)
        {
            super('InfoHeaderView', attachedTo, app);

            // publish event handlers to application:
            // if one of these events get triggered, the associated handler will
            // be executed to handle it
            this.bindGlobalEvents([
                {
                    name:    "onSelect_graph",
                    handler: this.onSelect_graph
                }
            ]);
        }

        public onSelect_graph(event:JQueryEventObject, data:any)
        {
            $('#' + this.attachedTo).html(`
                <div id="` + this.attachedTo + `-headline">` + data.uri + `</div>
            `);
        }
    }
}
