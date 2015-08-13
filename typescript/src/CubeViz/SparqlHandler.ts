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
         */
        public sendQuery(query:string, doneCallee:any, failCallee:any)
        {
            $.ajax(this.sparqlEndpointUrl, {
                cache: false,
                dataType: 'json',
                data : {
                    query: query
                }
            })
            .done(doneCallee)
            .fail(failCallee);
        }
    }
}
