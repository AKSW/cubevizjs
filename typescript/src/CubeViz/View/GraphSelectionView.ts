namespace CubeViz.View
{
    export class GraphSelectionView extends AbstractView
    {
        /**
         * @param string      attachedTo
         * @param Application app
         */
        constructor(attachedTo:string, app:Application)
        {
            super('GraphSelectionView', attachedTo, app);

            // publish event handlers to application:
            // if one of these events get triggered, the associated handler will
            // be executed to handle it
            this.bindGlobalEvents([
                {
                    name:    'onLoad_graphs',
                    handler: this.onLoad_graphs
                }
            ]);
        }

        public onLoad_graphs(event:JQueryEventObject, graphs:any[]) : void
        {
            this.destroy();

            this.showGraphs(graphs);
        }

        /**
         * @param array graphs
         */
        public showGraphs(graphs:any)
        {
            $('#' + this.attachedTo).html(this.compileTemplate(
                `<ul>
                    {{#each graphs}}
                        <li uri="{{__cv_uri}}">{{__cv_niceLabel}}</li>
                    {{/each}}
                </ul>`,
                {graphs: graphs}
            ));

            var self:GraphSelectionView = this;

            // add click event to each graph list entry
            $('#' + this.attachedTo + ' li').click(function(event:JQueryEventObject){
                // set selected graph (this one will be used for later queries)
                self.app.configuration.selectedGraphUri = $(this).attr("uri");

                // trigger global event, so that other views can react o
                self.app.triggerEvent('onSelect_graph', {uri: $(this).attr("uri")});
            });
        }
    }
}
