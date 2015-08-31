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
                    name:    'onLoad_checkConstraint',
                    handler: this.onLoad_checkConstraint
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
                    name:    'onLoad_numberOfObservations',
                    handler: this.onLoad_numberOfObservations
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

        public onLoad_checkConstraint(event:JQueryEventObject, data:any) : void
        {
            var content = '';
            // when result is true, something went wrong
            // the specification said: "If the ASK query is applied to an RDF graph then it will return true if that
            //                          graph contains one or more Data Cube instances which violate the corresponding
            //                          constraint."
            if (data.result) {
                content = '<strong>ASK query lead to true, so integrity problem!</strong>';
            } else {
                content = '<strong>OK!</strong>';
            }

            $('#' + this.attachedTo + `-checkConstraints-id` + data.key).html(
                data.id + ` - ` + data.title + ': ' + content + '<br>' +
                '<small>' + data.description + '</small>'
            );
        }

        public onLoad_dimensions(event:JQueryEventObject, dimensions:any) : void
        {
            this.showDimensions(dimensions);
        }

        public onLoad_measures(event:JQueryEventObject, measures:any) : void
        {
            this.showMeasures(measures);
        }

        public onLoad_numberOfObservations(event:JQueryEventObject, numberOfObservations:number)
        {
            this.showNumberOfObservations(numberOfObservations);
        }

        public onSelect_dataSet(event:JQueryEventObject, dataSet:any) : void
        {
            this.render();
            this.showDataSet(dataSet);
        }

        public render()
        {
            var self:DataSetAnalyzerView = this;

            $('#' + this.attachedTo).html(`
                <div id="` + this.attachedTo + `-dataSet"></div>
                <div id="` + this.attachedTo + `-measures"></div>
                <div id="` + this.attachedTo + `-attributes"></div>
                <div id="` + this.attachedTo + `-dimensions"></div>
                <div id="` + this.attachedTo + `-numberOfObservations"></div>
                <br/>
                <br/>
                <strong>Check constraints</strong>
                <div id="` + this.attachedTo + `-checkConstraints"></div>
            `);

            // add check constraint container for later use
            _.times(19, function(n){
                $('#' + self.attachedTo + '-checkConstraints').append(
                    `<div class="` + self.attachedTo + `-checkConstraints-entry"
                          id="` + self.attachedTo + `-checkConstraints-id` + n + `"></div>`
                );
            });
        }

        public showAttributes(attributes:any)
        {
            if (0 == _.keys(attributes).length) {
                $('#' + this.attachedTo + '-attributes').html(
                    'Available attributes: <strong>No attributes found</strong>'
                );
            } else {
                $('#' + this.attachedTo + '-attributes').html(this.compileTemplate(`
                    Available attributes:
                    <ul>
                        {{#each attributes}}
                        <li>{{__cv_niceLabel}}</li>
                        {{/each}}
                    </ul>
                `, {attributes: attributes}));
            }
        }

        public showDataSet(dataSet:any)
        {
            if (0 == _.keys(dataSet).length) {
                $('#' + this.attachedTo + '-dataSet').html(
                    'Selected DataSet: <strong>No dataset found</strong>'
                );
            } else {
                $('#' + this.attachedTo + '-dataSet').html(this.compileTemplate(`
                    Selected DataSet: <strong>{{__cv_niceLabel}}</strong>
                `, dataSet));
            }
        }

        public showDimensions(dimensions:any)
        {
            if (0 == _.keys(dimensions).length) {
                $('#' + this.attachedTo + '-dataSet').html(
                    'Available dimensions: <strong>No dimensions found</strong>'
                );
            } else {
                $('#' + this.attachedTo + '-dimensions').html(this.compileTemplate(`
                    Available dimensions:
                    <ul>
                        {{#each dimensions}}
                        <li>
                            {{__cv_niceLabel}}
                            <ul class="` + this.attachedTo + '-subUl' + `">
                                {{#each __cv_elements}}
                                <li class="` + this.attachedTo + `-dimensions-dimensionElement ` + this.attachedTo + `-subLi"
                                    uri="{{__cv_uri}}">{{__cv_niceLabel}}</li>
                                {{/each}}
                            </ul>
                        </li>
                        {{/each}}
                    </ul>
                `, {dimensions: dimensions}));
            }
        }

        public showMeasures(measures:any)
        {
            if (0 == _.keys(measures).length) {
                $('#' + this.attachedTo + '-dataSet').html(
                    'Available measures: <strong>No measures found</strong>'
                );
            } else {
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

        public showNumberOfObservations(numberOfObservations:number)
        {
            $('#' + this.attachedTo + '-numberOfObservations').html(this.compileTemplate(`
                Number of observations: <strong>{{numberOfObservations}}</strong>
            `, {numberOfObservations: numberOfObservations}));
        }
    }
}
