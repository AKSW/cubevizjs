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
                `<ul class="` + this.attachedTo + `-ul">
                    {{#each graphs}}
                        <li class="` + this.attachedTo + `-li" uri="{{__cv_uri}}">{{__cv_niceLabel}}</li>
                    {{/each}}
                </ul>`,
                {graphs: graphs}
            ));

            var self:GraphSelectionView = this;

            // add click event to each graph list entry
            $('#' + this.attachedTo + ' li').click(function(event:JQueryEventObject){
                var $clickedElement = $(this);

                // set selected graph (this one will be used for later queries)
                _.each(self.app.data.received.graphs, function(graph:any){
                    if ($clickedElement.attr('uri') == graph.__cv_uri) {
                        self.app.data.selected.graph = graph;

                        // trigger global event, so that other views can react o
                        self.app.triggerEvent('onSelect_graph', graph);

                        $clickedElement.css('background-color', '#CCCCFF');
                    }
                });
            });
        }
    }
}
