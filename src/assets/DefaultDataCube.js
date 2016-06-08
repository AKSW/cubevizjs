/*eslint no-debugger: 0*/
/*eslint max-len: 0*/

// import Immutable from 'immutable';
/*eslint-disable*/
const DataCube =  '   <http://example.cubeviz.org/compare/mortalityEurope/> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/2002/07/owl#Ontology> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/> <http://www.w3.org/2000/01/rdf-schema#label> "DataCube: Estimated Mortality in Europe" .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/> <http://purl.org/dc/elements/1.1/description> "Its purpose is to participate as an example use case for comparision. Source: http://www.indexmundi.com" .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Germany> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://example.cubeviz.org/compare/mortalityEurope/country> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Germany> <http://www.w3.org/2000/01/rdf-schema#label> "Germany"@en .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/UnitedKingdom> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://example.cubeviz.org/compare/mortalityEurope/country> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/UnitedKingdom> <http://www.w3.org/2000/01/rdf-schema#label> "United Kingdom"@en .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2000> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://example.cubeviz.org/compare/mortalityEurope/year> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2000> <http://www.w3.org/2002/07/owl#sameAs> <http://example.cubeviz.org/compare/populationEurope/Y2000> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2000> <http://www.w3.org/2000/01/rdf-schema#label> "2000"@en .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2001> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://example.cubeviz.org/compare/mortalityEurope/year> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2001> <http://www.w3.org/2002/07/owl#sameAs> <http://example.cubeviz.org/compare/populationEurope/Y2001> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2001> <http://www.w3.org/2000/01/rdf-schema#label> "2001"@en .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2002> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://example.cubeviz.org/compare/mortalityEurope/year> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2002> <http://www.w3.org/2002/07/owl#sameAs> <http://example.cubeviz.org/compare/populationEurope/Y2002> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2002> <http://www.w3.org/2000/01/rdf-schema#label> "2002"@en .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2003> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://example.cubeviz.org/compare/mortalityEurope/year> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2003> <http://www.w3.org/2000/01/rdf-schema#label> "2003"@en .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2004> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://example.cubeviz.org/compare/mortalityEurope/year> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2004> <http://www.w3.org/2000/01/rdf-schema#label> "2004"@en .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2005> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://example.cubeviz.org/compare/mortalityEurope/year> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2005> <http://www.w3.org/2000/01/rdf-schema#label> "2005"@en .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2006> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://example.cubeviz.org/compare/mortalityEurope/year> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2006> <http://www.w3.org/2000/01/rdf-schema#label> "2006"@en .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2007> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://example.cubeviz.org/compare/mortalityEurope/year> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2007> <http://www.w3.org/2000/01/rdf-schema#label> "2007"@en .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2008> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://example.cubeviz.org/compare/mortalityEurope/year> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2008> <http://www.w3.org/2000/01/rdf-schema#label> "2008"@en .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2009> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://example.cubeviz.org/compare/mortalityEurope/year> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2009> <http://www.w3.org/2000/01/rdf-schema#label> "2009"@en .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2010> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://example.cubeviz.org/compare/mortalityEurope/year> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2010> <http://www.w3.org/2000/01/rdf-schema#label> "2010"@en .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2011> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://example.cubeviz.org/compare/mortalityEurope/year> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2011> <http://www.w3.org/2000/01/rdf-schema#label> "2011"@en .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2012> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://example.cubeviz.org/compare/mortalityEurope/year> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2012> <http://www.w3.org/2002/07/owl#sameAs> <http://example.cubeviz.org/compare/populationEurope/Y2012> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2012> <http://www.w3.org/2000/01/rdf-schema#label> "2012"@en .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/country> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#DimensionProperty> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/country> <http://www.w3.org/2000/01/rdf-schema#label> "Country"@en .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/countryCS> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#ComponentSpecification> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/countryCS> <http://www.w3.org/2002/07/owl#sameAs> <http://example.cubeviz.org/compare/populationEurope/countryCS> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/countryCS> <http://www.w3.org/2000/01/rdf-schema#label> "country (CS)" .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/countryCS> <http://purl.org/linked-data/cube#dimension> <http://example.cubeviz.org/compare/mortalityEurope/country> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/dataset> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#DataSet> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/dataset> <http://www.w3.org/2000/01/rdf-schema#label> "Mortality"^^<http://www.w3.org/2001/XMLSchema#string> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/dataset> <http://purl.org/linked-data/cube#structure> <http://example.cubeviz.org/compare/mortalityEurope/dsd> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/dsd> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#DataStructureDefinition> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/dsd> <http://www.w3.org/2000/01/rdf-schema#label> "dsd"@en .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/dsd> <http://purl.org/linked-data/cube#component> <http://example.cubeviz.org/compare/mortalityEurope/countryCS> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/dsd> <http://purl.org/linked-data/cube#component> <http://example.cubeviz.org/compare/mortalityEurope/yearCS> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/dsd> <http://purl.org/linked-data/cube#component> <http://example.cubeviz.org/compare/mortalityEurope/unitCS> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/dsd> <http://purl.org/linked-data/cube#component> <http://example.cubeviz.org/compare/mortalityEurope/valueCS> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs0> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#Observation> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs0> <http://example.cubeviz.org/compare/mortalityEurope/country> <http://example.cubeviz.org/compare/mortalityEurope/Germany> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs0> <http://example.cubeviz.org/compare/mortalityEurope/year> <http://example.cubeviz.org/compare/mortalityEurope/Y2000> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs0> <http://example.cubeviz.org/compare/mortalityEurope/unit> "straight deaths" .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs0> <http://example.cubeviz.org/compare/mortalityEurope/value> "861000"^^<http://www.w3.org/2001/XMLSchema#float> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs0> <http://purl.org/linked-data/cube#dataSet> <http://example.cubeviz.org/compare/mortalityEurope/dataset> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs1> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#Observation> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs1> <http://example.cubeviz.org/compare/mortalityEurope/country> <http://example.cubeviz.org/compare/mortalityEurope/Germany> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs1> <http://example.cubeviz.org/compare/mortalityEurope/year> <http://example.cubeviz.org/compare/mortalityEurope/Y2001> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs1> <http://example.cubeviz.org/compare/mortalityEurope/unit> "straight deaths" .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs1> <http://example.cubeviz.org/compare/mortalityEurope/value> "856000"^^<http://www.w3.org/2001/XMLSchema#float> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs1> <http://purl.org/linked-data/cube#dataSet> <http://example.cubeviz.org/compare/mortalityEurope/dataset> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs10> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#Observation> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs10> <http://example.cubeviz.org/compare/mortalityEurope/country> <http://example.cubeviz.org/compare/mortalityEurope/Germany> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs10> <http://example.cubeviz.org/compare/mortalityEurope/year> <http://example.cubeviz.org/compare/mortalityEurope/Y2010> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs10> <http://example.cubeviz.org/compare/mortalityEurope/unit> "straight deaths" .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs10> <http://example.cubeviz.org/compare/mortalityEurope/value> "902000"^^<http://www.w3.org/2001/XMLSchema#float> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs10> <http://purl.org/linked-data/cube#dataSet> <http://example.cubeviz.org/compare/mortalityEurope/dataset> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs11> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#Observation> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs11> <http://example.cubeviz.org/compare/mortalityEurope/country> <http://example.cubeviz.org/compare/mortalityEurope/Germany> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs11> <http://example.cubeviz.org/compare/mortalityEurope/year> <http://example.cubeviz.org/compare/mortalityEurope/Y2011> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs11> <http://example.cubeviz.org/compare/mortalityEurope/unit> "straight deaths" .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs11> <http://example.cubeviz.org/compare/mortalityEurope/value> "895440"^^<http://www.w3.org/2001/XMLSchema#float> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs11> <http://purl.org/linked-data/cube#dataSet> <http://example.cubeviz.org/compare/mortalityEurope/dataset> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs12> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#Observation> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs12> <http://example.cubeviz.org/compare/mortalityEurope/country> <http://example.cubeviz.org/compare/mortalityEurope/Germany> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs12> <http://example.cubeviz.org/compare/mortalityEurope/year> <http://example.cubeviz.org/compare/mortalityEurope/Y2012> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs12> <http://example.cubeviz.org/compare/mortalityEurope/unit> "straight deaths" .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs12> <http://example.cubeviz.org/compare/mortalityEurope/value> "905280"^^<http://www.w3.org/2001/XMLSchema#float> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs12> <http://purl.org/linked-data/cube#dataSet> <http://example.cubeviz.org/compare/mortalityEurope/dataset> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs13> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#Observation> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs13> <http://example.cubeviz.org/compare/mortalityEurope/country> <http://example.cubeviz.org/compare/mortalityEurope/UnitedKingdom> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs13> <http://example.cubeviz.org/compare/mortalityEurope/year> <http://example.cubeviz.org/compare/mortalityEurope/Y2000> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs13> <http://example.cubeviz.org/compare/mortalityEurope/unit> "straight deaths" .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs13> <http://example.cubeviz.org/compare/mortalityEurope/value> "617713"^^<http://www.w3.org/2001/XMLSchema#float> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs13> <http://purl.org/linked-data/cube#dataSet> <http://example.cubeviz.org/compare/mortalityEurope/dataset> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs14> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#Observation> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs14> <http://example.cubeviz.org/compare/mortalityEurope/country> <http://example.cubeviz.org/compare/mortalityEurope/UnitedKingdom> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs14> <http://example.cubeviz.org/compare/mortalityEurope/year> <http://example.cubeviz.org/compare/mortalityEurope/Y2001> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs14> <http://example.cubeviz.org/compare/mortalityEurope/unit> "straight deaths" .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs14> <http://example.cubeviz.org/compare/mortalityEurope/value> "617377"^^<http://www.w3.org/2001/XMLSchema#float> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs14> <http://purl.org/linked-data/cube#dataSet> <http://example.cubeviz.org/compare/mortalityEurope/dataset> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs15> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#Observation> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs15> <http://example.cubeviz.org/compare/mortalityEurope/country> <http://example.cubeviz.org/compare/mortalityEurope/UnitedKingdom> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs15> <http://example.cubeviz.org/compare/mortalityEurope/year> <http://example.cubeviz.org/compare/mortalityEurope/Y2002> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs15> <http://example.cubeviz.org/compare/mortalityEurope/unit> "straight deaths" .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs15> <http://example.cubeviz.org/compare/mortalityEurope/value> "615734"^^<http://www.w3.org/2001/XMLSchema#float> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs15> <http://purl.org/linked-data/cube#dataSet> <http://example.cubeviz.org/compare/mortalityEurope/dataset> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs16> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#Observation> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs16> <http://example.cubeviz.org/compare/mortalityEurope/country> <http://example.cubeviz.org/compare/mortalityEurope/UnitedKingdom> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs16> <http://example.cubeviz.org/compare/mortalityEurope/year> <http://example.cubeviz.org/compare/mortalityEurope/Y2003> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs16> <http://example.cubeviz.org/compare/mortalityEurope/unit> "straight deaths" .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs16> <http://example.cubeviz.org/compare/mortalityEurope/value> "613518"^^<http://www.w3.org/2001/XMLSchema#float> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs16> <http://purl.org/linked-data/cube#dataSet> <http://example.cubeviz.org/compare/mortalityEurope/dataset> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs17> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#Observation> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs17> <http://example.cubeviz.org/compare/mortalityEurope/country> <http://example.cubeviz.org/compare/mortalityEurope/UnitedKingdom> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs17> <http://example.cubeviz.org/compare/mortalityEurope/year> <http://example.cubeviz.org/compare/mortalityEurope/Y2004> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs17> <http://example.cubeviz.org/compare/mortalityEurope/unit> "straight deaths" .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs17> <http://example.cubeviz.org/compare/mortalityEurope/value> "614151"^^<http://www.w3.org/2001/XMLSchema#float> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs17> <http://purl.org/linked-data/cube#dataSet> <http://example.cubeviz.org/compare/mortalityEurope/dataset> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs18> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#Observation> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs18> <http://example.cubeviz.org/compare/mortalityEurope/country> <http://example.cubeviz.org/compare/mortalityEurope/UnitedKingdom> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs18> <http://example.cubeviz.org/compare/mortalityEurope/year> <http://example.cubeviz.org/compare/mortalityEurope/Y2005> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs18> <http://example.cubeviz.org/compare/mortalityEurope/unit> "straight deaths" .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs18> <http://example.cubeviz.org/compare/mortalityEurope/value> "615279"^^<http://www.w3.org/2001/XMLSchema#float> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs18> <http://purl.org/linked-data/cube#dataSet> <http://example.cubeviz.org/compare/mortalityEurope/dataset> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs19> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#Observation> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs19> <http://example.cubeviz.org/compare/mortalityEurope/country> <http://example.cubeviz.org/compare/mortalityEurope/UnitedKingdom> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs19> <http://example.cubeviz.org/compare/mortalityEurope/year> <http://example.cubeviz.org/compare/mortalityEurope/Y2006> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs19> <http://example.cubeviz.org/compare/mortalityEurope/unit> "straight deaths" .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs19> <http://example.cubeviz.org/compare/mortalityEurope/value> "613969"^^<http://www.w3.org/2001/XMLSchema#float> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs19> <http://purl.org/linked-data/cube#dataSet> <http://example.cubeviz.org/compare/mortalityEurope/dataset> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs2> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#Observation> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs2> <http://example.cubeviz.org/compare/mortalityEurope/country> <http://example.cubeviz.org/compare/mortalityEurope/Germany> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs2> <http://example.cubeviz.org/compare/mortalityEurope/year> <http://example.cubeviz.org/compare/mortalityEurope/Y2002> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs2> <http://example.cubeviz.org/compare/mortalityEurope/unit> "straight deaths" .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs2> <http://example.cubeviz.org/compare/mortalityEurope/value> "848700"^^<http://www.w3.org/2001/XMLSchema#float> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs2> <http://purl.org/linked-data/cube#dataSet> <http://example.cubeviz.org/compare/mortalityEurope/dataset> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs20> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#Observation> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs20> <http://example.cubeviz.org/compare/mortalityEurope/country> <http://example.cubeviz.org/compare/mortalityEurope/UnitedKingdom> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs20> <http://example.cubeviz.org/compare/mortalityEurope/year> <http://example.cubeviz.org/compare/mortalityEurope/Y2007> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs20> <http://example.cubeviz.org/compare/mortalityEurope/unit> "straight deaths" .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs20> <http://example.cubeviz.org/compare/mortalityEurope/value> "613229"^^<http://www.w3.org/2001/XMLSchema#float> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs20> <http://purl.org/linked-data/cube#dataSet> <http://example.cubeviz.org/compare/mortalityEurope/dataset> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs21> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#Observation> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs21> <http://example.cubeviz.org/compare/mortalityEurope/country> <http://example.cubeviz.org/compare/mortalityEurope/UnitedKingdom> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs21> <http://example.cubeviz.org/compare/mortalityEurope/year> <http://example.cubeviz.org/compare/mortalityEurope/Y2008> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs21> <http://example.cubeviz.org/compare/mortalityEurope/unit> "straight deaths" .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs21> <http://example.cubeviz.org/compare/mortalityEurope/value> "612477"^^<http://www.w3.org/2001/XMLSchema#float> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs21> <http://purl.org/linked-data/cube#dataSet> <http://example.cubeviz.org/compare/mortalityEurope/dataset> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs22> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#Observation> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs22> <http://example.cubeviz.org/compare/mortalityEurope/country> <http://example.cubeviz.org/compare/mortalityEurope/UnitedKingdom> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs22> <http://example.cubeviz.org/compare/mortalityEurope/year> <http://example.cubeviz.org/compare/mortalityEurope/Y2009> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs22> <http://example.cubeviz.org/compare/mortalityEurope/unit> "straight deaths" .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs22> <http://example.cubeviz.org/compare/mortalityEurope/value> "612352"^^<http://www.w3.org/2001/XMLSchema#float> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs22> <http://purl.org/linked-data/cube#dataSet> <http://example.cubeviz.org/compare/mortalityEurope/dataset> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs23> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#Observation> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs23> <http://example.cubeviz.org/compare/mortalityEurope/country> <http://example.cubeviz.org/compare/mortalityEurope/UnitedKingdom> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs23> <http://example.cubeviz.org/compare/mortalityEurope/year> <http://example.cubeviz.org/compare/mortalityEurope/Y2010> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs23> <http://example.cubeviz.org/compare/mortalityEurope/unit> "straight deaths" .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs23> <http://example.cubeviz.org/compare/mortalityEurope/value> "581706"^^<http://www.w3.org/2001/XMLSchema#float> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs23> <http://purl.org/linked-data/cube#dataSet> <http://example.cubeviz.org/compare/mortalityEurope/dataset> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs24> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#Observation> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs24> <http://example.cubeviz.org/compare/mortalityEurope/country> <http://example.cubeviz.org/compare/mortalityEurope/UnitedKingdom> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs24> <http://example.cubeviz.org/compare/mortalityEurope/year> <http://example.cubeviz.org/compare/mortalityEurope/Y2011> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs24> <http://example.cubeviz.org/compare/mortalityEurope/unit> "straight deaths" .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs24> <http://example.cubeviz.org/compare/mortalityEurope/value> "584972"^^<http://www.w3.org/2001/XMLSchema#float> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs24> <http://purl.org/linked-data/cube#dataSet> <http://example.cubeviz.org/compare/mortalityEurope/dataset> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs25> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#Observation> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs25> <http://example.cubeviz.org/compare/mortalityEurope/country> <http://example.cubeviz.org/compare/mortalityEurope/UnitedKingdom> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs25> <http://example.cubeviz.org/compare/mortalityEurope/year> <http://example.cubeviz.org/compare/mortalityEurope/Y2012> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs25> <http://example.cubeviz.org/compare/mortalityEurope/unit> "straight deaths" .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs25> <http://example.cubeviz.org/compare/mortalityEurope/value> "588228"^^<http://www.w3.org/2001/XMLSchema#float> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs25> <http://purl.org/linked-data/cube#dataSet> <http://example.cubeviz.org/compare/mortalityEurope/dataset> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs3> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#Observation> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs3> <http://example.cubeviz.org/compare/mortalityEurope/country> <http://example.cubeviz.org/compare/mortalityEurope/Germany> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs3> <http://example.cubeviz.org/compare/mortalityEurope/year> <http://example.cubeviz.org/compare/mortalityEurope/Y2003> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs3> <http://example.cubeviz.org/compare/mortalityEurope/unit> "straight deaths" .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs3> <http://example.cubeviz.org/compare/mortalityEurope/value> "847880"^^<http://www.w3.org/2001/XMLSchema#float> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs3> <http://purl.org/linked-data/cube#dataSet> <http://example.cubeviz.org/compare/mortalityEurope/dataset> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs4> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#Observation> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs4> <http://example.cubeviz.org/compare/mortalityEurope/country> <http://example.cubeviz.org/compare/mortalityEurope/Germany> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs4> <http://example.cubeviz.org/compare/mortalityEurope/year> <http://example.cubeviz.org/compare/mortalityEurope/Y2004> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs4> <http://example.cubeviz.org/compare/mortalityEurope/unit> "straight deaths" .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs4> <http://example.cubeviz.org/compare/mortalityEurope/value> "855260"^^<http://www.w3.org/2001/XMLSchema#float> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs4> <http://purl.org/linked-data/cube#dataSet> <http://example.cubeviz.org/compare/mortalityEurope/dataset> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs5> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#Observation> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs5> <http://example.cubeviz.org/compare/mortalityEurope/country> <http://example.cubeviz.org/compare/mortalityEurope/Germany> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs5> <http://example.cubeviz.org/compare/mortalityEurope/year> <http://example.cubeviz.org/compare/mortalityEurope/Y2005> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs5> <http://example.cubeviz.org/compare/mortalityEurope/unit> "straight deaths" .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs5> <http://example.cubeviz.org/compare/mortalityEurope/value> "865100"^^<http://www.w3.org/2001/XMLSchema#float> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs5> <http://purl.org/linked-data/cube#dataSet> <http://example.cubeviz.org/compare/mortalityEurope/dataset> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs6> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#Observation> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs6> <http://example.cubeviz.org/compare/mortalityEurope/country> <http://example.cubeviz.org/compare/mortalityEurope/Germany> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs6> <http://example.cubeviz.org/compare/mortalityEurope/year> <http://example.cubeviz.org/compare/mortalityEurope/Y2006> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs6> <http://example.cubeviz.org/compare/mortalityEurope/unit> "straight deaths" .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs6> <http://example.cubeviz.org/compare/mortalityEurope/value> "870020"^^<http://www.w3.org/2001/XMLSchema#float> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs6> <http://purl.org/linked-data/cube#dataSet> <http://example.cubeviz.org/compare/mortalityEurope/dataset> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs7> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#Observation> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs7> <http://example.cubeviz.org/compare/mortalityEurope/country> <http://example.cubeviz.org/compare/mortalityEurope/Germany> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs7> <http://example.cubeviz.org/compare/mortalityEurope/year> <http://example.cubeviz.org/compare/mortalityEurope/Y2007> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs7> <http://example.cubeviz.org/compare/mortalityEurope/unit> "straight deaths" .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs7> <http://example.cubeviz.org/compare/mortalityEurope/value> "878220"^^<http://www.w3.org/2001/XMLSchema#float> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs7> <http://purl.org/linked-data/cube#dataSet> <http://example.cubeviz.org/compare/mortalityEurope/dataset> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs8> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#Observation> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs8> <http://example.cubeviz.org/compare/mortalityEurope/country> <http://example.cubeviz.org/compare/mortalityEurope/Germany> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs8> <http://example.cubeviz.org/compare/mortalityEurope/year> <http://example.cubeviz.org/compare/mortalityEurope/Y2008> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs8> <http://example.cubeviz.org/compare/mortalityEurope/unit> "straight deaths" .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs8> <http://example.cubeviz.org/compare/mortalityEurope/value> "885600"^^<http://www.w3.org/2001/XMLSchema#float> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs8> <http://purl.org/linked-data/cube#dataSet> <http://example.cubeviz.org/compare/mortalityEurope/dataset> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs9> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#Observation> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs9> <http://example.cubeviz.org/compare/mortalityEurope/country> <http://example.cubeviz.org/compare/mortalityEurope/Germany> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs9> <http://example.cubeviz.org/compare/mortalityEurope/year> <http://example.cubeviz.org/compare/mortalityEurope/Y2009> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs9> <http://example.cubeviz.org/compare/mortalityEurope/unit> "straight deaths" .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs9> <http://example.cubeviz.org/compare/mortalityEurope/value> "892980"^^<http://www.w3.org/2001/XMLSchema#float> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs9> <http://purl.org/linked-data/cube#dataSet> <http://example.cubeviz.org/compare/mortalityEurope/dataset> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/unit> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#AttributeProperty> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/unit> <http://www.w3.org/2000/01/rdf-schema#label> "straight deaths" .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/unitCS> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#ComponentSpecification> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/unitCS> <http://www.w3.org/2000/01/rdf-schema#label> "straight deaths" .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/unitCS> <http://purl.org/linked-data/cube#attribute> <http://example.cubeviz.org/compare/mortalityEurope/unit> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/value> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#MeasureProperty> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/value> <http://www.w3.org/2000/01/rdf-schema#label> "deaths (CS)"@en .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/valueCS> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#ComponentSpecification> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/valueCS> <http://www.w3.org/2000/01/rdf-schema#label> "deaths (CS)" .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/valueCS> <http://purl.org/linked-data/cube#measure> <http://example.cubeviz.org/compare/mortalityEurope/value> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/year> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#DimensionProperty> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/year> <http://www.w3.org/2000/01/rdf-schema#label> "Year"@en .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/yearCS> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#ComponentSpecification> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/yearCS> <http://www.w3.org/2002/07/owl#sameAs> <http://example.cubeviz.org/compare/populationEurope/yearCS> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/yearCS> <http://www.w3.org/2000/01/rdf-schema#label> "year (CS)" .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/mortalityEurope/yearCS> <http://purl.org/linked-data/cube#dimension> <http://example.cubeviz.org/compare/mortalityEurope/year> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/populationEurope/obs4> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#Observation> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/populationEurope/obs4> <http://example.cubeviz.org/compare/mortalityEurope/country> <http://example.cubeviz.org/compare/mortalityEurope/Germany> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/populationEurope/obs4> <http://example.cubeviz.org/compare/mortalityEurope/year> <http://example.cubeviz.org/compare/mortalityEurope/Y2004> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/populationEurope/obs4> <http://example.cubeviz.org/compare/mortalityEurope/unit> "straight number of people" .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/populationEurope/obs4> <http://example.cubeviz.org/compare/mortalityEurope/value> "1337"^^<http://www.w3.org/2001/XMLSchema#float> .  '  + '\n' +
 '   <http://example.cubeviz.org/compare/populationEurope/obs4> <http://purl.org/linked-data/cube#dataSet> <http://example.cubeviz.org/compare/mortalityEurope/dataset> .  '  + '\n' +
 '   <http://localhost/cubeviz/MortalityEU/> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/2002/07/owl#Ontology> .  '  + '\n' +
 '  <http://localhost/cubeviz/MortalityEU/> <http://www.w3.org/2000/01/rdf-schema#label> "Mortality EU" .  ' ;
/*eslint-enable*/

export default DataCube;
