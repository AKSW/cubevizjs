namespace CubeViz.VisualizationHandler
{
    export class Chartjs extends AbstractVisualizationHandler
    {
        public render(observations:any, selectedDimensions:any, selectedMeasure:any, renderTo:string)
        {
            var chartName:string = renderTo + '-chart';

            // add canvas container to visualization area which will be filled later on
            $('#' + renderTo).html(`
                <canvas id="` + chartName + `"></canvas>
            `);

            var canvas = <HTMLCanvasElement> $('#' + chartName).get(0);

            // collect values to later give to Chart.js
            var data:number[] = [];
            _.each(observations, function(observation:any){
                data.push(observation[selectedMeasure.__cv_uri]);
            });

            // build labels list
            var labels:string[] = [];
            console.log(selectedDimensions[Object.keys(selectedDimensions)[0]]);
            _.each(selectedDimensions[Object.keys(selectedDimensions)[0]].__cv_elements, function(dimensionElement:any){
                labels.push(dimensionElement.__cv_niceLabel);
            });

            // visualize using Bar chart (1 dimensional)
            var myNewChart = new Chart(canvas.getContext("2d")).Bar({
                labels: labels,
                datasets: [
                    {
                        label: "dataset",
                        fillColor: "rgba(220,220,220,0.5)",
                        strokeColor: "rgba(220,220,220,0.8)",
                        highlightFill: "rgba(220,220,220,0.75)",
                        highlightStroke: "rgba(220,220,220,1)",
                        data: data
                    }
                ]
            });
        }
    }
}
