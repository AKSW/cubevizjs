namespace CubeViz.View
{
    export class DataSelectionView extends AbstractView
    {
        /**
         * @param string      attachedTo
         * @param Application app
         */
        constructor(attachedTo:string, app:Application)
        {
            super('DataSelectionView', attachedTo, app);

            // publish event handlers to application:
            // if one of these events get triggered, the associated handler will
            // be executed to handle it
            this.bindGlobalEvents([
                {
                    name:    'onLoad_attributes',
                    handler: this.onLoad_attributes
                },
                {
                    name:    'onLoad_dataSets',
                    handler: this.onLoad_dataSets
                },
                {
                    name:    'onLoad_dimensions',
                    handler: this.onLoad_dimensions
                },
                {
                    name:    'onLoad_measures',
                    handler: this.onLoad_measures
                }
            ]);
        }

        public onLoad_attributes(event:JQueryEventObject, attributes:any) : void
        {
            this.showAttributes(attributes);
        }

        public onLoad_dataSets(event:JQueryEventObject, dataSets:any[]) : void
        {
            this.render();
            this.showDataSets(dataSets);
        }

        public onLoad_dimensions(event:JQueryEventObject, dimensions:any) : void
        {
            this.showDimensions(dimensions);
        }

        public onLoad_measures(event:JQueryEventObject, measures:any) : void
        {
            this.showMeasures(measures);
        }

        public render()
        {
            $('#' + this.attachedTo).html(`
                <strong>DataSets</strong>
                <div id="` + this.attachedTo + `-dataSets"></div>
                <br/>
                <strong>Measures</strong>
                <div id="` + this.attachedTo + `-measures"></div>
                <br/>
                <strong>Attributes</strong>
                <div id="` + this.attachedTo + `-attributes"></div>
                <br/>
                <strong>Dimensions</strong>
                <div id="` + this.attachedTo + `-dimensions"></div>
            `);
        }

        public showAttributes(attributes:any)
        {
            $('#' + this.attachedTo + '-attributes').html(this.compileTemplate(`
                <ul>
                    {{#each attributes}}
                    <li uri="{{__cv_uri}}">{{__cv_niceLabel}}</li>
                    {{/each}}
                </ul>
            `, {attributes: attributes}));

            var self:DataSelectionView = this;

            // add click event to each graph list entry
            $('#' + this.attachedTo + ' li').click(function(event:JQueryEventObject){
                // save selected attribute
                _.each(self.app.data.received.attributes, function(attribute:any){
                    if ($(this).attr('uri') == attribute.__cv_uri) {
                        self.app.data.selected.attribute = attribute;
                    }
                });

                // trigger global event, so that other views can react o
                self.app.triggerEvent('onSelect_attribute', {uri: $(this).attr('uri')});

                $(this).css('background-color', '#CCCCFF');
            });
        }

        /**
         * @param any[] dataSets
         */
        public showDataSets(dataSets:any[])
        {
            $('#' + this.attachedTo + '-dataSets').html(this.compileTemplate(
                `<ul>
                    {{#each dataSets}}
                        <li uri="{{__cv_uri}}">{{__cv_niceLabel}}</li>
                    {{/each}}
                </ul>`,
                {dataSets: dataSets}
            ));

            var self:DataSelectionView = this;

            // add click event to each graph list entry
            $('#' + this.attachedTo + ' li').click(function(event:JQueryEventObject){
                var $clickedElement = $(this);

                // set selected dataset (this one will be used for later queries)
                _.each(self.app.data.received.dataSets, function(dataSet:any){
                    if ($clickedElement.attr('uri') == dataSet.__cv_uri) {
                        self.app.data.selected.dataSet = dataSet;

                        // trigger global event, so that other views can react o
                        self.app.triggerEvent('onSelect_dataSet', dataSet);

                        $clickedElement.css('background-color', '#CCCCFF');
                    }
                });
            });
        }

        /**
         * Shows dimensions and their elements.
         *
         * @param any dimensions
         */
        public showDimensions(dimensions:any)
        {
            $('#' + this.attachedTo + '-dimensions').html(this.compileTemplate(`
                <ul class="` + this.attachedTo + '-dimensions-ul' + `">
                    {{#each dimensions}}
                    <li class="` + this.attachedTo + '-dimensions-li' + `">
                        <div class="` + this.attachedTo + '-dimensions-dimension' + `" uri="{{__cv_uri}}">
                            {{__cv_niceLabel}}</div>
                        <ul class="` + this.attachedTo + '-dimensions-ul' + `">
                            {{#each __cv_elements}}
                            <li class="` + this.attachedTo + `-dimensions-dimensionElement"
                                uri="{{__cv_uri}}">{{__cv_niceLabel}}</li>
                            {{/each}}
                        </ul>
                    </li>
                    {{/each}}
                </ul>
            `, {dimensions: dimensions}));

            var self:DataSelectionView = this;

            // add click event to each dimension entry
            $('.' + this.attachedTo + '-dimensions-dimension').click(function(event:JQueryEventObject){
                var $clickedElement = $(this);

                // go through all received dimensions and save the selected one
                _.each(self.app.data.received.dimensions, function(dimension:any){
                    if($clickedElement.attr('uri') == dimension.__cv_uri) {
                        // trigger global event, so that other views can react to
                        self.app.triggerEvent('onSelect_dimension', dimension);

                        $clickedElement.css('background-color', '#CCCCFF');
                    }
                });
            });

            // add click event to each dimension element entry
            $('.' + this.attachedTo + '-dimensions-dimensionElement').click(function(event:JQueryEventObject){
                var $clickedElement = $(this),
                    // get the URI of the related dimension
                    dimensionUri:string = $(_.first($($clickedElement.parent()).parent().children())).attr('uri');

                var dimensionElement = self.app.getDimensionElement($clickedElement.attr('uri'), dimensionUri);

                self.app.triggerEvent('onSelect_dimensionElement', dimensionElement);

                $clickedElement.css('background-color', '#CCCCFF');
            });
        }

        public showMeasures(measures:any)
        {
            $('#' + this.attachedTo + '-measures').html(this.compileTemplate(`
                <ul>
                    {{#each measures}}
                    <li uri="{{__cv_uri}}">{{__cv_niceLabel}}</li>
                    {{/each}}
                </ul>
            `, {measures: measures}));

            var self:DataSelectionView = this;

            // add click event to each graph list entry
            $('#' + this.attachedTo + ' li').click(function(event:JQueryEventObject){
                // set selected measure (this one will be used for later queries)
                _.each(self.app.data.received.measures, function(measure:any){
                    if ($(this).attr('uri') == measure.__cv_uri) {
                        self.app.data.selected.measure[measure.__cv_uri] = measure;

                        // trigger global event, so that other views can react to
                        self.app.triggerEvent('onSelect_measure', {measure: measure});

                        $(this).css('background-color', '#CCCCFF');
                    }
                });
            });
        }
    }
}
