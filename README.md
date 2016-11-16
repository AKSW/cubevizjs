CubeViz.js
==========

[![Build Status](https://travis-ci.org/AKSW/cubevizjs.svg?branch=develop)](https://travis-ci.org/AKSW/cubevizjs)

CubeViz.js is the successor of [CubeViz, the OntoWiki component](https://github.com/AKSW/cubeviz.ontowiki). Its an Javascript application and doesn't need a PHP backend anymore. Its currently under heavy development, but expect new releases in the near future.

CubeViz is utilizing the RDF DataCube vocabulary which is the state-of-the-art in representing statistical data in Resource Description Framework (RDF). This vocabulary is compatible with SDMX and increasingly being adopted. Based on the vocabulary and the encoded Data Cube, CubeViz is generating a faceted browsing widget that can be used to filter interactively observations to be visualized in charts. Based on the selected structure, CubeViz offer beneficiary chart types and options which can be selected by users.

This document tries to give an overview about CubeViz.js and some of its features.

Getting Started
---------------

To start developing just clone the repository and download all necessary dependencies. 
```
npm install
```
After that start the Webpack server and open your browser at `http://localhost:8080/`.
```
npm start
```
Webpack will automaticly build a new bundle file if the source code will be changed. 
To build a production bundle of CubeViz.js just run
```
npm run build
```
and Webpack will build a bundle to the `dist` folder.  

If you just want to use CubeViz.js you could find further instructions on the [demo page](http://cubevizjs.demo.aksw.org). To use the latest release version link to `dist/cubeviz.min.js` in the master branch and respectively to develop branch if you want to use the current development version.

Features
--------

### Import

The user could import RDF data via SPARQL, file URL or file upload. Please see [RDF Support](#rdf-support) and [CORS](#cors) for further details.

### Data Selections

Different parts (if available) of a data cube could be selected to visualize a specific set of observation points in a cube. The user can select data sets, measures, attributes and dimension properties.

### Appropriate Chart Visualization

After the user selected all necessary components CubeViz.js tries to suggest reasonable chart visualizations which will be ordered by relevance. The steps can be understood by looking into the log box.

Browser Support
---------------

-	Chrome ✔
-	Firefox ✔
-	Safari ✔
-	Opera ✔
-	Edge ❌ (not tested)
-	Internet Explorer ❌ (not tested)

RDF Support
-----------

If data is imported through a SPARQL endpoint then of course all RDF formats of the store will be supported.

At the time CubeViz.js supports the following formats:

-	N-Triples
-	Turtle
-	N-Quads
-	TriG

Internally, CubeViz.js handles all RDF related data as JSON-LD data.

CORS
----

For importing data through an file URL or SPARQL endpoint from another domain (which is usually the case) please keep in mind that [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) has to be activated on the respective server to allow the request.

Debugging
---------

Because of the [Redux implementation](https://github.com/AKSW/cubevizjs/releases/tag/v0.2.0) CubeViz.js shows a new log statement every time the user or the application changes state. So the application behavior can be understood more easy.  
For further understanding of the chart selection process the UI Log Box shows helpful logs.
