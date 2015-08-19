namespace CubeViz
{
    /**
     *
     */
    export class SparqlHandler
    {
        protected sparqlEndpointUrl:string = '';

        constructor(sparqlEndpointUrl:string)
        {
            this.sparqlEndpointUrl = sparqlEndpointUrl;
        }

        /**
         * @param string   query
         * @param function doneCallee
         * @param function failCallee
         * @return JQueryXHR|null
         */
        public sendQuery(query:string, doneCallee?:any, failCallee?:any) : any
        {
            var xhr:JQueryXHR = $.ajax(this.sparqlEndpointUrl, {
                cache: false,
                dataType: 'json',
                data : {
                    query: query
                }
            });

            if (false == _.isUndefined(doneCallee)){
                xhr.done(doneCallee);
            } else if (false == _.isUndefined(failCallee)){
                xhr.fail(failCallee);

            // if both callee's are undefined, return xhr.
            } else if (_.isUndefined(doneCallee) && _.isUndefined(failCallee)) {
                return xhr;
            }
        }
    }
}
