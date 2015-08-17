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
                    name:    'onLoad_dataSets',
                    handler: this.onLoad_dataSets
                }
            ]);
        }

        public onLoad_dataSets(event:JQueryEventObject, dataSets:any[]) : void
        {
            this.render();
            this.showDataSets(dataSets);
        }

        public render()
        {
            $('#' + this.attachedTo).html(`
                <div id="` + this.attachedTo + `-dataSets"></div>
                <div id="` + this.attachedTo + `-measureUnit"></div>
                <div id="` + this.attachedTo + `-dimensions"></div>
            `);
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
                // set selected graph (this one will be used for later queries)
                self.app.configuration.selectedDataSetUri = $(this).attr('uri');

                // trigger global event, so that other views can react o
                self.app.triggerEvent('onSelect_dataSet', {uri: $(this).attr('uri')});
            });
        }
    }
}
