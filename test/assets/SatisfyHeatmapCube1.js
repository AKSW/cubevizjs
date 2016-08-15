import DataCube from '../../src/api/DataCube.js';

const dataset =
{
  "@id": "http://example.cubeviz.org/compare/mortalityEurope/dataset",
  "@type": [
    "http://purl.org/linked-data/cube#DataSet"
  ],
  "http://www.w3.org/2000/01/rdf-schema#label": [
    {
      "@value": "Mortality"
    }
  ],
  "http://purl.org/linked-data/cube#structure": [
    {
      "@id": "http://example.cubeviz.org/compare/mortalityEurope/dsd"
    }
  ]
};

const dataStructureDefinition =
{
  "@id": "http://example.cubeviz.org/compare/mortalityEurope/dsd",
  "@type": [
    "http://purl.org/linked-data/cube#DataStructureDefinition"
  ],
  "http://www.w3.org/2000/01/rdf-schema#label": [
    {
      "@value": "dsd",
      "@language": "en"
    }
  ],
  "http://purl.org/linked-data/cube#component": [
    {
      "@id": "http://example.cubeviz.org/compare/mortalityEurope/countryCS"
    },
    {
      "@id": "http://example.cubeviz.org/compare/mortalityEurope/yearCS"
    },
    {
      "@id": "http://example.cubeviz.org/compare/mortalityEurope/unitCS"
    },
    {
      "@id": "http://example.cubeviz.org/compare/mortalityEurope/valueCS"
    }
  ]
};

const measures =
[
    {
      "@id": "http://example.cubeviz.org/compare/mortalityEurope/value",
      "@type": [
        "http://purl.org/linked-data/cube#MeasureProperty"
      ],
      "http://www.w3.org/2000/01/rdf-schema#label": [
        {
          "@value": "deaths (CS)",
          "@language": "en"
        }
      ]
    }
];

const dimensions =
[
  {
    "@id": "http://example.cubeviz.org/compare/mortalityEurope/country",
    "@type": [
      "http://purl.org/linked-data/cube#DimensionProperty"
    ],
    "http://www.w3.org/2000/01/rdf-schema#label": [
      {
        "@value": "Country",
        "@language": "en"
      }
    ]
  },
  {
    "@id": "http://example.cubeviz.org/compare/mortalityEurope/year",
    "@type": [
      "http://purl.org/linked-data/cube#DimensionProperty"
    ],
    "http://www.w3.org/2000/01/rdf-schema#label": [
      {
        "@value": "Year",
        "@language": "en"
      }
    ]
  }
];

const dimensionElements =
{
  "http://example.cubeviz.org/compare/mortalityEurope/country": [
    {
      "@id": "http://example.cubeviz.org/compare/mortalityEurope/Germany",
      "http://www.w3.org/2000/01/rdf-schema#label": [
        {
          "@value": "Germany",
          "@language": "en"
        }
      ],
      "@type": [
        "http://example.cubeviz.org/compare/mortalityEurope/country"
      ]
    }
  ],
  "http://example.cubeviz.org/compare/mortalityEurope/year": [
    {
      "@id": "http://example.cubeviz.org/compare/mortalityEurope/Y2000",
      "@type": [
        "http://example.cubeviz.org/compare/mortalityEurope/year"
      ],
      "http://www.w3.org/2000/01/rdf-schema#label": [
        {
          "@value": "2000",
          "@language": "en"
        }
      ],
      "http://www.w3.org/2002/07/owl#sameAs": [
        {
          "@id": "http://example.cubeviz.org/compare/populationEurope/Y2000"
        }
      ]
    },
    {
      "@id": "http://example.cubeviz.org/compare/mortalityEurope/Y2001",
      "@type": [
        "http://example.cubeviz.org/compare/mortalityEurope/year"
      ],
      "http://www.w3.org/2000/01/rdf-schema#label": [
        {
          "@value": "2001",
          "@language": "en"
        }
      ],
      "http://www.w3.org/2002/07/owl#sameAs": [
        {
          "@id": "http://example.cubeviz.org/compare/populationEurope/Y2001"
        }
      ]
    }
  ]
};

const observations =
[
  {
    "@id": "http://example.cubeviz.org/compare/mortalityEurope/obs0",
    "http://example.cubeviz.org/compare/mortalityEurope/value": [
      {
        "@value": "861000",
        "@type": "http://www.w3.org/2001/XMLSchema#float"
      }
    ],
    "http://purl.org/linked-data/cube#dataSet": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/dataset"
      }
    ],
    "@type": [
      "http://purl.org/linked-data/cube#Observation"
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/country": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Germany"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/year": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Y2000"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/unit": [
      {
        "@value": "straight deaths"
      }
    ]
  },
  {
    "@id": "http://example.cubeviz.org/compare/mortalityEurope/obs1",
    "@type": [
      "http://purl.org/linked-data/cube#Observation"
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/country": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Germany"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/year": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Y2001"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/unit": [
      {
        "@value": "straight deaths"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/value": [
      {
        "@value": "856000",
        "@type": "http://www.w3.org/2001/XMLSchema#float"
      }
    ],
    "http://purl.org/linked-data/cube#dataSet": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/dataset"
      }
    ]
  }
];

const dc = new DataCube({
    defaultLanguage: 'en',
    dataset,
    dataStructureDefinition,
    measures,
    dimensions,
    dimensionElements,
    observations,
    attributes: [],
    attributesElements: {}
});

export default dc;
