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
 '   <http://localhost/cubeviz/MortalityEU/> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/2002/07/owl#Ontology> .  '  + '\n' +
 '  <http://localhost/cubeviz/MortalityEU/> <http://www.w3.org/2000/01/rdf-schema#label> "Mortality EU" .  ' ;
/*eslint-enable*/

export default DataCube;
