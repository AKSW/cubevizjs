/*eslint func-style:0*/
/*eslint max-len: 0*/
// For details look at http://www.w3.org/TR/vocab-data-cube/

function prefix() {
    return 'PREFIX rdf:     <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \n' +
        'PREFIX rdfs:    <http://www.w3.org/2000/01/rdf-schema#> ' +
        'PREFIX skos:    <http://www.w3.org/2004/02/skos/core#> ' +
        'PREFIX qb:      <http://purl.org/linked-data/cube#> ' +
        'PREFIX xsd:     <http://www.w3.org/2001/XMLSchema#> ' +
        'PREFIX owl:     <http://www.w3.org/2002/07/owl#> ';
}

export const IC1 = {
    query: prefix() +
    '   ASK {  ' +
    '     {  ' +
    '       ?obs a qb:Observation .  ' +
    '       FILTER NOT EXISTS { ?obs qb:dataSet ?dataset1 . }  ' +
    '     } UNION {  ' +
    '       ?obs a qb:Observation ;  ' +
    '          qb:dataSet ?dataset1, ?dataset2 .  ' +
    '       FILTER (?dataset1 != ?dataset2)  ' +
    '     }  ' +
    '  }  ',
    name: 'IC-1. Unique DataSet',
    disc: 'Every qb:Observation has exactly one associated qb:DataSet.'
};

export const IC2 = {
    query: prefix() +
    '   ASK {  ' +
    '     {  ' +
    '       ?dataset a qb:DataSet .  ' +
    '       FILTER NOT EXISTS { ?dataset qb:structure ?dsd . }  ' +
    '     } UNION {   ' +
    '       ?dataset a qb:DataSet ;  ' +
    '          qb:structure ?dsd1, ?dsd2 .  ' +
    '       FILTER (?dsd1 != ?dsd2)  ' +
    '     }  ' +
    '  }  ',
    name: 'IC-2. Unique DSD',
    disc: 'Every qb:DataSet has exactly one associated qb:DataStructureDefinition.'
};

export const IC3 = {
    query: prefix() +
    '   ASK {  ' +
    '     ?dsd a qb:DataStructureDefinition .  ' +
    '     FILTER NOT EXISTS { ?dsd qb:component [qb:componentProperty [a qb:MeasureProperty]] }  ' +
    '  }  ',
    name: 'IC-3. DSD includes measure',
    disc: 'Every qb:DataStructureDefinition must include at least one declared measure.'
};

export const IC4 = {
    query: prefix() +
    '   ASK {  ' +
    '     ?dim a qb:DimensionProperty .  ' +
    '     FILTER NOT EXISTS { ?dim rdfs:range [] }  ' +
    '  }  ',
    name: 'IC-4. Dimensions have range',
    disc: 'Every dimension declared in a qb:DataStructureDefinition must have a declared rdfs:range.'
};

export const IC6 = {
    query: prefix() +
    '   ASK {  ' +
    '     ?dsd qb:component ?componentSpec .  ' +
    '     ?componentSpec qb:componentRequired "false"^^xsd:boolean ;  ' +
    '                    qb:componentProperty ?component .  ' +
    '     FILTER NOT EXISTS { ?component a qb:AttributeProperty }  ' +
    '  }  ',
    name: 'IC-6. Only attributes may be optional',
    disc: 'The only components of a qb:DataStructureDefinition that may be marked as optional, using qb:componentRequired are attributes.'
};

export const IC11 = {
    query: prefix() +
    '   ASK {  ' +
    '       ?obs qb:dataSet/qb:structure/qb:component/qb:componentProperty ?dim .  ' +
    '       ?dim a qb:DimensionProperty .  ' +
    '       FILTER NOT EXISTS { ?obs ?dim [] }  ' +
    '  }  ',
    name: 'IC-11. All dimensions required',
    disc: 'Every qb:Observation has a value for each dimension declared in its associated qb:DataStructureDefinition.'
};

export const IC12 = {
    query: prefix() +
    '   ASK {  ' +
    '     FILTER( ?allEqual )  ' +
    '     {  ' +
    '       SELECT (MIN(?equal) AS ?allEqual) WHERE {  ' +
    '           ?obs1 qb:dataSet ?dataset .  ' +
    '           ?obs2 qb:dataSet ?dataset .  ' +
    '           FILTER (?obs1 != ?obs2)  ' +
    '           ?dataset qb:structure/qb:component/qb:componentProperty ?dim .  ' +
    '           ?dim a qb:DimensionProperty .  ' +
    '           ?obs1 ?dim ?value1 .  ' +
    '           ?obs2 ?dim ?value2 .  ' +
    '           BIND( ?value1 = ?value2 AS ?equal)  ' +
    '       } GROUP BY ?obs1 ?obs2  ' +
    '     }  ' +
    '  }  ',
    name: 'IC-12. No duplicate observations',
    disc: 'No two qb:Observations in the same qb:DataSet may have the same value for all dimensions.'
};

export const IC13 = {
    query: prefix() +
    '   ASK {  ' +
    '       ?obs qb:dataSet/qb:structure/qb:component ?component .  ' +
    '       ?component qb:componentRequired "true"^^xsd:boolean ;  ' +
    '                  qb:componentProperty ?attr .  ' +
    '       FILTER NOT EXISTS { ?obs ?attr [] }  ' +
    '  }  ',
    name: 'IC-13. Required attributes',
    disc: 'Every qb:Observation has a value for each declared attribute that is marked as required.'
};

export const IC14 = {
    query: prefix() +
    '   ASK {  ' +
    '       ?obs qb:dataSet/qb:structure ?dsd .  ' +
    '       FILTER NOT EXISTS { ?dsd qb:component/qb:componentProperty qb:measureType }  ' +
    '       ?dsd qb:component/qb:componentProperty ?measure .  ' +
    '       ?measure a qb:MeasureProperty . ' +
    '       FILTER NOT EXISTS { ?obs ?measure [] }  ' +
    '  }  ',
    name: 'IC-14. All measures present',
    disc: 'In a qb:DataSet which does not use a Measure dimension then each individual qb:Observation must have a value for every declared measure.'
};

export const IC15 = {
    query: prefix() +
    '   ASK {  ' +
    '       ?obs qb:dataSet/qb:structure ?dsd ;  ' +
    '            qb:measureType ?measure .  ' +
    '       ?dsd qb:component/qb:componentProperty qb:measureType .  ' +
    '       FILTER NOT EXISTS { ?obs ?measure [] }  ' +
    '  }  ',
    name: 'IC-15. Measure dimension consistent',
    disc: 'In a qb:DataSet which uses a Measure dimension then each qb:Observation must have a value for the measure corresponding to its given qb:measureType.'
};

export const IC16 = {
    query: prefix() +
    '   ASK {  ' +
    '       ?obs qb:dataSet/qb:structure ?dsd ;  ' +
    '            qb:measureType ?measure ;  ' +
    '            ?omeasure [] .  ' +
    '       ?dsd qb:component/qb:componentProperty qb:measureType ;  ' +
    '            qb:component/qb:componentProperty ?omeasure .  ' +
    '       ?omeasure a qb:MeasureProperty .  ' +
    '       FILTER (?omeasure != ?measure)  ' +
    '  }  ',
    name: 'IC-16. Single measure on measure dimension observation',
    disc: 'In a qb:DataSet which uses a Measure dimension then each qb:Observation must only have a value for one measure (by IC-15 this will be the measure corresponding to its qb:measureType).'
};

export const IC17 = {
    query: prefix() +
    '   ASK {  ' +
    '     {  ' +
    '         SELECT ?numMeasures (COUNT(?obs2) AS ?count) WHERE {  ' +
    '             {  ' +
    '                 SELECT ?dsd (COUNT(?m) AS ?numMeasures) WHERE {  ' +
    '                     ?dsd qb:component/qb:componentProperty ?m.  ' +
    '                     ?m a qb:MeasureProperty .  ' +
    '                 } GROUP BY ?dsd  ' +
    '             }  ' +
    '             ' +
    '             ?obs1 qb:dataSet/qb:structure ?dsd;  ' +
    '                   qb:dataSet ?dataset ;  ' +
    '                   qb:measureType ?m1 .  ' +
    '         ' +
    '             ?obs2 qb:dataSet ?dataset ;  ' +
    '                   qb:measureType ?m2 .  ' +
    '             FILTER NOT EXISTS {   ' +
    '                 ?dsd qb:component/qb:componentProperty ?dim .  ' +
    '                 FILTER (?dim != qb:measureType)  ' +
    '                 ?dim a qb:DimensionProperty .  ' +
    '                 ?obs1 ?dim ?v1 .   ' +
    '                 ?obs2 ?dim ?v2.   ' +
    '                 FILTER (?v1 != ?v2)  ' +
    '             }  ' +
    '               ' +
    '         } GROUP BY ?obs1 ?numMeasures  ' +
    '           HAVING (?count != ?numMeasures)  ' +
    '     }  ' +
    '  }  ',
    name: 'IC-17. All measures present in measures dimension cube',
    disc: 'In a qb:DataSet which uses a Measure dimension then if there is a Observation for some combination of non-measure dimensions then there must be other Observations with the same non-measure dimension values for each of the declared measures.'
};
