namespace CubeViz.View
{
    export class DataSetAnalyzerView extends AbstractView
    {
        /**
         * @param string      attachedTo
         * @param Application app
         */
        constructor(attachedTo:string, app:Application)
        {
            super('DataSetAnalyzerView', attachedTo, app);

            // publish event handlers to application:
            // if one of these events get triggered, the associated handler will
            // be executed to handle it
            this.bindGlobalEvents([
                {
                    name:    'onLoad_attributes',
                    handler: this.onLoad_attributes
                },
                {
                    name:    'onLoad_dimensions',
                    handler: this.onLoad_dimensions
                },
                {
                    name:    'onLoad_measures',
                    handler: this.onLoad_measures
                },
                {
                    name:    'onSelect_dataSet',
                    handler: this.onSelect_dataSet
                }
            ]);
        }

        public onLoad_attributes(event:JQueryEventObject, attributes:any) : void
        {
            this.showAttributes(attributes);
        }

        public onLoad_dimensions(event:JQueryEventObject, dimensions:any) : void
        {
            this.showDimensions(dimensions);
        }

        public onLoad_measures(event:JQueryEventObject, measures:any) : void
        {
            this.showMeasures(measures);
        }

        public onSelect_dataSet(event:JQueryEventObject, dataSet:any) : void
        {
            this.render();
            this.showDataSet(dataSet);
        }

        public render()
        {
            $('#' + this.attachedTo).html(`
                <div id="` + this.attachedTo + `-dataSet"></div>
                <div id="` + this.attachedTo + `-measures"></div>
                <div id="` + this.attachedTo + `-attributes"></div>
                <div id="` + this.attachedTo + `-dimensions"></div>
            `);
        }

        public showAttributes(attributes:any)
        {
            $('#' + this.attachedTo + '-attributes').html(this.compileTemplate(`
                Available attributes:
                <ul>
                    {{#each attributes}}
                    <li>{{__cv_niceLabel}}</li>
                    {{/each}}
                </ul>
            `, {attributes: attributes}));
        }

        public showDataSet(dataSet:any)
        {
            $('#' + this.attachedTo + '-dataSet').html(this.compileTemplate(`
                Selected DataSet: <strong>{{dataSetUri}}</strong>
            `, {dataSetUri: dataSet.uri}));
        }

        public showDimensions(dimensions:any)
        {
            $('#' + this.attachedTo + '-dimensions').html(this.compileTemplate(`
                Available dimensions:
                <ul>
                    {{#each dimensions}}
                    <li>{{__cv_niceLabel}}</li>
                    {{/each}}
                </ul>
            `, {dimensions: dimensions}));
        }

        public showMeasures(measures:any)
        {
            $('#' + this.attachedTo + '-measures').html(this.compileTemplate(`
                Available measures:
                <ul>
                    {{#each measures}}
                    <li>{{__cv_niceLabel}}</li>
                    {{/each}}
                </ul>
            `, {measures: measures}));
        }
    }
}
