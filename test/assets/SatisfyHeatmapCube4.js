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

const defaultMeasureProperty =
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
};

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
    },
    {
      "@id": "http://example.cubeviz.org/compare/mortalityEurope/UnitedKingdom",
      "@type": [
        "http://example.cubeviz.org/compare/mortalityEurope/country"
      ],
      "http://www.w3.org/2000/01/rdf-schema#label": [
        {
          "@value": "United Kingdom",
          "@language": "en"
        }
      ]
    }
  ],
  "http://example.cubeviz.org/compare/mortalityEurope/year": [
    {
      "@id": "http://example.cubeviz.org/compare/mortalityEurope/Y2002",
      "@type": [
        "http://example.cubeviz.org/compare/mortalityEurope/year"
      ],
      "http://www.w3.org/2000/01/rdf-schema#label": [
        {
          "@value": "2002",
          "@language": "en"
        }
      ],
      "http://www.w3.org/2002/07/owl#sameAs": [
        {
          "@id": "http://example.cubeviz.org/compare/populationEurope/Y2002"
        }
      ]
    },
    {
      "@id": "http://example.cubeviz.org/compare/mortalityEurope/Y2003",
      "@type": [
        "http://example.cubeviz.org/compare/mortalityEurope/year"
      ],
      "http://www.w3.org/2000/01/rdf-schema#label": [
        {
          "@value": "2003",
          "@language": "en"
        }
      ]
    },
    {
      "@id": "http://example.cubeviz.org/compare/mortalityEurope/Y2004",
      "@type": [
        "http://example.cubeviz.org/compare/mortalityEurope/year"
      ],
      "http://www.w3.org/2000/01/rdf-schema#label": [
        {
          "@value": "2004",
          "@language": "en"
        }
      ]
    }
  ]
};

const observations =
[
  {
    "@id": "http://example.cubeviz.org/compare/mortalityEurope/obs15",
    "http://example.cubeviz.org/compare/mortalityEurope/year": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Y2002"
      }
    ],
    "@type": [
      "http://purl.org/linked-data/cube#Observation"
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/country": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/UnitedKingdom"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/unit": [
      {
        "@value": "straight deaths"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/value": [
      {
        "@value": "615734",
        "@type": "http://www.w3.org/2001/XMLSchema#float"
      }
    ],
    "http://purl.org/linked-data/cube#dataSet": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/dataset"
      }
    ]
  },
  {
    "@id": "http://example.cubeviz.org/compare/mortalityEurope/obs16",
    "http://example.cubeviz.org/compare/mortalityEurope/unit": [
      {
        "@value": "straight deaths"
      }
    ],
    "@type": [
      "http://purl.org/linked-data/cube#Observation"
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/country": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/UnitedKingdom"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/year": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Y2003"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/value": [
      {
        "@value": "613518",
        "@type": "http://www.w3.org/2001/XMLSchema#float"
      }
    ],
    "http://purl.org/linked-data/cube#dataSet": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/dataset"
      }
    ]
  },
  {
    "@id": "http://example.cubeviz.org/compare/mortalityEurope/obs17",
    "@type": [
      "http://purl.org/linked-data/cube#Observation"
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/country": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/UnitedKingdom"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/year": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Y2004"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/unit": [
      {
        "@value": "straight deaths"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/value": [
      {
        "@value": "614151",
        "@type": "http://www.w3.org/2001/XMLSchema#float"
      }
    ],
    "http://purl.org/linked-data/cube#dataSet": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/dataset"
      }
    ]
  },
  {
    "@id": "http://example.cubeviz.org/compare/mortalityEurope/obs2",
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
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Y2002"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/unit": [
      {
        "@value": "straight deaths"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/value": [
      {
        "@value": "848700",
        "@type": "http://www.w3.org/2001/XMLSchema#float"
      }
    ],
    "http://purl.org/linked-data/cube#dataSet": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/dataset"
      }
    ]
  },
  {
    "@id": "http://example.cubeviz.org/compare/mortalityEurope/obs3",
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
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Y2003"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/unit": [
      {
        "@value": "straight deaths"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/value": [
      {
        "@value": "847880",
        "@type": "http://www.w3.org/2001/XMLSchema#float"
      }
    ],
    "http://purl.org/linked-data/cube#dataSet": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/dataset"
      }
    ]
  },
  {
    "@id": "http://example.cubeviz.org/compare/mortalityEurope/obs4",
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
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Y2004"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/unit": [
      {
        "@value": "straight deaths"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/value": [
      {
        "@value": "855260",
        "@type": "http://www.w3.org/2001/XMLSchema#float"
      }
    ],
    "http://purl.org/linked-data/cube#dataSet": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/dataset"
      }
    ]
  },
  {
    "@id": "http://example.cubeviz.org/compare/populationEurope/obs4",
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
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Y2004"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/unit": [
      {
        "@value": "straight number of people"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/value": [
      {
        "@value": "1337",
        "@type": "http://www.w3.org/2001/XMLSchema#float"
      }
    ],
    "http://purl.org/linked-data/cube#dataSet": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/dataset"
      }
    ]
  }
]

const dc = new DataCube({
    defaultLanguage: 'en',
    dataset,
    dataStructureDefinition,
    defaultMeasureProperty,
    dimensions,
    dimensionElements,
    observations,
    attributes: [],
    attributesElements: {}
});

export default dc;
