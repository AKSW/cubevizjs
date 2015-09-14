namespace CubeViz.VisualizationHandler
{
    export class AbstractVisualizationHandler
    {
        static instantiateHandler(name:string)
        {
            switch(name) {
                case 'Chartjs':
                    return new Chartjs();

                default:
                    throw new Error('Unknown name given: ' + name);
            }
        }

        // needs to be overriden by a sub class
        public render(observations:any, selectedDimensions:any, selectedMeasure:any, renderTo:string)
        {
            throw Error('Implement render method.');
        }
    }
}
