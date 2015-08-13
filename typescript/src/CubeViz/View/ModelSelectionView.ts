namespace CubeViz.View
{
    export class ModelSelectionView extends AbstractView
    {
        /**
         * @param string      attachedTo
         * @param Application app
         */
        constructor(attachedTo:string, app:Application)
        {
            super('ModelSelectionView', attachedTo, app);

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

        public onStart_application() : void
        {
            this.destroy();
            this.render();
        }

        public render()
        {
            var self:ModelSelectionView = this,
                sparqlHandler = new SparqlHandler(this.app.configuration.sparqlEndpointUrl);

            sparqlHandler.sendQuery(
                // TODO improve it to avoid calling for all triples (DISTINCT does not work due a virtuoso error)
                `SELECT ?g WHERE { GRAPH ?g { ?s ?p ?o }}`,
                // on success
                function(data:any) {
                    var graphs:any = {};
                    _.each(data.results.bindings, function(entry:any){
                        graphs[entry.value] = entry.value;
                    });
                    // display retrieved graphs
                    self.showGraphs(graphs);
                },
                // on error
                function(data:any){
                    console.log("error");
                    console.log(data);
                }
            );
        }

        /**
         *
         */
        public showGraphs(graphs:any)
        {
            $(this.attachedTo).html(this.compileTemplate(
                `<ul class="cubeViz-modelSelection-ul">
                    {{#each graphs}}
                        <li class="cubeViz-modelSelection-li">{{this}}</li>
                    {{/each}}
                </ul>`,
                {graphs: graphs}
            ));
        }
    }
}
