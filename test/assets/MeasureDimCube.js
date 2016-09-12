/*eslint no-debugger: 0*/
/*eslint max-len: 0*/

// import Immutable from 'immutable';
/*eslint-disable*/
const DataCube =   '   <http://example.cubeviz.org/compare/mortalityEurope/> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/2002/07/owl#Ontology> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/> <http://www.w3.org/2000/01/rdf-schema#label> "DataCube: Estimated Mortality in Europe" .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/> <http://purl.org/dc/elements/1.1/description> "Its purpose is to participate as an example use case for comparision. Source: http://www.indexmundi.com" .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Germany> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://example.cubeviz.org/compare/mortalityEurope/country> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Germany> <http://www.w3.org/2000/01/rdf-schema#label> "Germany"@en .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/UnitedKingdom> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://example.cubeviz.org/compare/mortalityEurope/country> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/UnitedKingdom> <http://www.w3.org/2000/01/rdf-schema#label> "United Kingdom"@en .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2000> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://example.cubeviz.org/compare/mortalityEurope/year> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2000> <http://www.w3.org/2002/07/owl#sameAs> <http://example.cubeviz.org/compare/populationEurope/Y2000> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2000> <http://www.w3.org/2000/01/rdf-schema#label> "2000"@en .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2001> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://example.cubeviz.org/compare/mortalityEurope/year> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2001> <http://www.w3.org/2002/07/owl#sameAs> <http://example.cubeviz.org/compare/populationEurope/Y2001> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2001> <http://www.w3.org/2000/01/rdf-schema#label> "2001"@en .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2002> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://example.cubeviz.org/compare/mortalityEurope/year> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2002> <http://www.w3.org/2002/07/owl#sameAs> <http://example.cubeviz.org/compare/populationEurope/Y2002> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2002> <http://www.w3.org/2000/01/rdf-schema#label> "2002"@en .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2003> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://example.cubeviz.org/compare/mortalityEurope/year> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2003> <http://www.w3.org/2000/01/rdf-schema#label> "2003"@en .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2004> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://example.cubeviz.org/compare/mortalityEurope/year> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2004> <http://www.w3.org/2000/01/rdf-schema#label> "2004"@en .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2005> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://example.cubeviz.org/compare/mortalityEurope/year> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2005> <http://www.w3.org/2000/01/rdf-schema#label> "2005"@en .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2006> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://example.cubeviz.org/compare/mortalityEurope/year> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2006> <http://www.w3.org/2000/01/rdf-schema#label> "2006"@en .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2007> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://example.cubeviz.org/compare/mortalityEurope/year> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2007> <http://www.w3.org/2000/01/rdf-schema#label> "2007"@en .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2008> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://example.cubeviz.org/compare/mortalityEurope/year> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2008> <http://www.w3.org/2000/01/rdf-schema#label> "2008"@en .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2009> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://example.cubeviz.org/compare/mortalityEurope/year> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2009> <http://www.w3.org/2000/01/rdf-schema#label> "2009"@en .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2010> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://example.cubeviz.org/compare/mortalityEurope/year> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2010> <http://www.w3.org/2000/01/rdf-schema#label> "2010"@en .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2011> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://example.cubeviz.org/compare/mortalityEurope/year> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2011> <http://www.w3.org/2000/01/rdf-schema#label> "2011"@en .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2012> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://example.cubeviz.org/compare/mortalityEurope/year> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2012> <http://www.w3.org/2002/07/owl#sameAs> <http://example.cubeviz.org/compare/populationEurope/Y2012> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/Y2012> <http://www.w3.org/2000/01/rdf-schema#label> "2012"@en .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/country> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#DimensionProperty> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/country> <http://www.w3.org/2000/01/rdf-schema#label> "Country"@en .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/countryCS> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#ComponentSpecification> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/countryCS> <http://www.w3.org/2002/07/owl#sameAs> <http://example.cubeviz.org/compare/populationEurope/countryCS> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/countryCS> <http://www.w3.org/2000/01/rdf-schema#label> "country (CS)" .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/countryCS> <http://purl.org/linked-data/cube#dimension> <http://example.cubeviz.org/compare/mortalityEurope/country> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/dataset> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#DataSet> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/dataset> <http://www.w3.org/2000/01/rdf-schema#label> "Mortality"^^<http://www.w3.org/2001/XMLSchema#string> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/dataset> <http://purl.org/linked-data/cube#structure> <http://example.cubeviz.org/compare/mortalityEurope/dsd> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/dsd> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#DataStructureDefinition> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/dsd> <http://www.w3.org/2000/01/rdf-schema#label> "dsd"@en .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/dsd> <http://purl.org/linked-data/cube#component> <http://example.cubeviz.org/compare/mortalityEurope/countryCS> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/dsd> <http://purl.org/linked-data/cube#component> <http://example.cubeviz.org/compare/mortalityEurope/yearCS> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/dsd> <http://purl.org/linked-data/cube#component> <http://example.cubeviz.org/compare/mortalityEurope/value1CS> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/dsd> <http://purl.org/linked-data/cube#component> <http://example.cubeviz.org/compare/mortalityEurope/value2CS> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/dsd> <http://purl.org/linked-data/cube#component> <http://example.cubeviz.org/compare/mortalityEurope/measureDimCS> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs0> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#Observation> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs0> <http://example.cubeviz.org/compare/mortalityEurope/country> <http://example.cubeviz.org/compare/mortalityEurope/Germany> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs0> <http://example.cubeviz.org/compare/mortalityEurope/year> <http://example.cubeviz.org/compare/mortalityEurope/Y2000> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs0> <http://example.cubeviz.org/compare/mortalityEurope/value1> "861000"^^<http://www.w3.org/2001/XMLSchema#float> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs0> <http://purl.org/linked-data/cube#dataSet> <http://example.cubeviz.org/compare/mortalityEurope/dataset> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs1> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#Observation> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs1> <http://example.cubeviz.org/compare/mortalityEurope/country> <http://example.cubeviz.org/compare/mortalityEurope/Germany> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs1> <http://example.cubeviz.org/compare/mortalityEurope/year> <http://example.cubeviz.org/compare/mortalityEurope/Y2001> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs1> <http://example.cubeviz.org/compare/mortalityEurope/value1> "856000"^^<http://www.w3.org/2001/XMLSchema#float> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs1> <http://purl.org/linked-data/cube#dataSet> <http://example.cubeviz.org/compare/mortalityEurope/dataset> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs10> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#Observation> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs10> <http://example.cubeviz.org/compare/mortalityEurope/country> <http://example.cubeviz.org/compare/mortalityEurope/Germany> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs10> <http://example.cubeviz.org/compare/mortalityEurope/year> <http://example.cubeviz.org/compare/mortalityEurope/Y2010> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs10> <http://example.cubeviz.org/compare/mortalityEurope/value2> "902000"^^<http://www.w3.org/2001/XMLSchema#float> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/obs10> <http://purl.org/linked-data/cube#dataSet> <http://example.cubeviz.org/compare/mortalityEurope/dataset> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/value1> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#MeasureProperty> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/value2> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#MeasureProperty> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/value1CS> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#ComponentSpecification> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/value1CS> <http://www.w3.org/2000/01/rdf-schema#label> "deaths (CS)" .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/value1CS> <http://purl.org/linked-data/cube#measure> <http://example.cubeviz.org/compare/mortalityEurope/value1> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/value2CS> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#ComponentSpecification> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/value2CS> <http://www.w3.org/2000/01/rdf-schema#label> "deaths (CS)" .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/value2CS> <http://purl.org/linked-data/cube#measure> <http://example.cubeviz.org/compare/mortalityEurope/value2> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/measureDim> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#DimensionProperty> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/measureDimCS> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#ComponentSpecification> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/measureDimCS> <http://purl.org/linked-data/cube#dimension> <http://example.cubeviz.org/compare/mortalityEurope/measureDim> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/year> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#DimensionProperty> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/year> <http://www.w3.org/2000/01/rdf-schema#label> "Year"@en .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/yearCS> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/linked-data/cube#ComponentSpecification> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/yearCS> <http://www.w3.org/2002/07/owl#sameAs> <http://example.cubeviz.org/compare/populationEurope/yearCS> .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/yearCS> <http://www.w3.org/2000/01/rdf-schema#label> "year (CS)" .  '  +
 '   <http://example.cubeviz.org/compare/mortalityEurope/yearCS> <http://purl.org/linked-data/cube#dimension> <http://example.cubeviz.org/compare/mortalityEurope/year> .  '  +
 '   <http://localhost/cubeviz/MortalityEU/> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/2002/07/owl#Ontology> .  '  +
 '   <http://localhost/cubeviz/MortalityEU/> <http://www.w3.org/2000/01/rdf-schema#label> "Mortality EU" .  '  +
 '    ' ;
/*eslint-enable*/

export default DataCube;
