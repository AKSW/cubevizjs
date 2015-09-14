namespace CubeViz.View
{
    export class VisualizationView extends AbstractView
    {
        /**
         * @param string      attachedTo
         * @param Application app
         */
        constructor(attachedTo:string, app:Application)
        {
            super('VisualizationView', attachedTo, app);

            // publish event handlers to application:
            // if one of these events get triggered, the associated handler will
            // be executed to handle it
            this.bindGlobalEvents([
                {
                    name:    "onLoad_observations",
                    handler: this.onLoad_observations
                }
            ]);
        }

        public onLoad_observations(event:JQueryEventObject, observations:any)
        {
            var observationsToVisualize:any = {},
                self:VisualizationView = this,
                visualizationHandler:any;

            // visualize only observations which are related to selected dimension elements
            _.each(observations, function(observation:any){
                // idea here is that we go through all selected dimensions and check, if they have an element which has
                // the same URI as observation[dimensionUri]
                _.each(self.app.data.selected.dimensions, function(dimension:any){
                    if (false == _.isUndefined(dimension.__cv_elements[observation[dimension.__cv_uri]])) {
                        observationsToVisualize[observation.__cv_uri] = observation;
                    }
                });
            });

            console.log(observationsToVisualize);

            // TODO add selector for different visualizations

            // set visualiztion handler
            visualizationHandler = CubeViz.VisualizationHandler.AbstractVisualizationHandler
                .instantiateHandler('Chartjs');

            // visualize observations
            visualizationHandler.render(
                observationsToVisualize,
                this.app.data.selected.dimensions,
                this.app.data.selected.measure,
                this.attachedTo
            );
        }
    }
}
