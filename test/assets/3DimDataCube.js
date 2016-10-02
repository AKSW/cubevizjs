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
      "@id": "http://example.cubeviz.org/compare/mortalityEurope/GenderCS"
    },
    {
      "@id": "http://example.cubeviz.org/compare/mortalityEurope/unitCS"
    },
    {
      "@id": "http://example.cubeviz.org/compare/mortalityEurope/valueCS"
    },
    {
      "@id": "http://example.cubeviz.org/compare/mortalityEurope/yearCS"
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
    "@id": "http://example.cubeviz.org/compare/mortalityEurope/gender",
    "@type": [
      "http://purl.org/linked-data/cube#DimensionProperty"
    ],
    "http://www.w3.org/2000/01/rdf-schema#label": [
      {
        "@value": "Gender",
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
      "@id": "http://example.cubeviz.org/compare/mortalityEurope/England",
      "@type": [
        "http://example.cubeviz.org/compare/mortalityEurope/country"
      ]
    },
    {
      "@id": "http://example.cubeviz.org/compare/mortalityEurope/Germany",
      "@type": [
        "http://example.cubeviz.org/compare/mortalityEurope/country"
      ],
      "http://www.w3.org/2000/01/rdf-schema#label": [
        {
          "@value": "Germany",
          "@language": "en"
        }
      ]
    }
  ],
  "http://example.cubeviz.org/compare/mortalityEurope/gender": [
    {
      "@id": "http://example.cubeviz.org/compare/mortalityEurope/Female",
      "@type": [
        "http://example.cubeviz.org/compare/mortalityEurope/gender"
      ],
      "http://www.w3.org/2000/01/rdf-schema#label": [
        {
          "@value": "Female",
          "@language": "en"
        }
      ]
    },
    {
      "@id": "http://example.cubeviz.org/compare/mortalityEurope/Male",
      "@type": [
        "http://example.cubeviz.org/compare/mortalityEurope/gender"
      ],
      "http://www.w3.org/2000/01/rdf-schema#label": [
        {
          "@value": "Male",
          "@language": "en"
        }
      ]
    },
    {
      "@id": "http://example.cubeviz.org/compare/mortalityEurope/Transgender",
      "@type": [
        "http://example.cubeviz.org/compare/mortalityEurope/gender"
      ],
      "http://www.w3.org/2000/01/rdf-schema#label": [
        {
          "@value": "Transgender",
          "@language": "en"
        }
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
      "@id": "http://example.cubeviz.org/compare/mortalityEurope/Y2010",
      "@type": [
        "http://example.cubeviz.org/compare/mortalityEurope/year"
      ],
      "http://www.w3.org/2000/01/rdf-schema#label": [
        {
          "@value": "2010",
          "@language": "en"
        }
      ]
    },
    {
      "@id": "http://example.cubeviz.org/compare/mortalityEurope/Y2011",
      "@type": [
        "http://example.cubeviz.org/compare/mortalityEurope/year"
      ],
      "http://www.w3.org/2000/01/rdf-schema#label": [
        {
          "@value": "2011",
          "@language": "en"
        }
      ]
    }
  ]
};

const observations =
[
  {
    "@id": "http://example.cubeviz.org/compare/mortalityEurope/obs0",
    "@type": [
      "http://purl.org/linked-data/cube#Observation"
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/gender": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Transgender"
      }
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
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/unit/deaths"
      }
    ],
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
    ]
  },
  {
    "@id": "http://example.cubeviz.org/compare/mortalityEurope/obs1",
    "@type": [
      "http://purl.org/linked-data/cube#Observation"
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/gender": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Female"
      }
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
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/unit/deaths"
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
  },
  {
    "@id": "http://example.cubeviz.org/compare/mortalityEurope/obs10",
    "@type": [
      "http://purl.org/linked-data/cube#Observation"
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/gender": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Female"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/country": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Germany"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/year": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Y2010"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/unit": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/unit/deaths"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/value": [
      {
        "@value": "902000",
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
    "@id": "http://example.cubeviz.org/compare/mortalityEurope/obs11",
    "@type": [
      "http://purl.org/linked-data/cube#Observation"
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/gender": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Transgender"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/country": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/England"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/year": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Y2011"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/unit": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/unit/deaths"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/value": [
      {
        "@value": "895440",
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
    "http://example.cubeviz.org/compare/mortalityEurope/gender": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Male"
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
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/unit/deaths"
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

const observationsAlt =
[
  {
    "@id": "http://example.cubeviz.org/compare/mortalityEurope/obs1",
    "@type": [
      "http://purl.org/linked-data/cube#Observation"
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/gender": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Female"
      }
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
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/unit/deaths"
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
  },
  {
    "@id": "http://example.cubeviz.org/compare/mortalityEurope/obs10",
    "@type": [
      "http://purl.org/linked-data/cube#Observation"
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/gender": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Female"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/country": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Germany"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/year": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Y2010"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/unit": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/unit/deaths"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/value": [
      {
        "@value": "902000",
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
    "@id": "http://example.cubeviz.org/compare/mortalityEurope/obs11",
    "@type": [
      "http://purl.org/linked-data/cube#Observation"
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/gender": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Transgender"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/country": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/England"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/year": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Y2011"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/unit": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/unit/deaths"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/value": [
      {
        "@value": "895440",
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
    "http://example.cubeviz.org/compare/mortalityEurope/gender": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Male"
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
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/unit/deaths"
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

const attributes =
[
  {
    "@id": "http://example.cubeviz.org/compare/mortalityEurope/unit",
    "@type": [
      "http://purl.org/linked-data/cube#AttributeProperty"
    ],
    "http://www.w3.org/2000/01/rdf-schema#label": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/unit/deaths"
      }
    ]
  }
];

const attributesElements=
{
  "http://example.cubeviz.org/compare/mortalityEurope/unit": [
    {
      "@id": "http://example.cubeviz.org/compare/mortalityEurope/unit/deaths",
      "@type": [
        "http://example.cubeviz.org/compare/mortalityEurope/unit"
      ]
    }
  ]
};

const dc = new DataCube({
    defaultLanguage: 'en',
    dataset,
    dataStructureDefinition,
    measures,
    dimensions,
    attributes,
    attributesElements,
    dimensionElements,
    observations
});

export const dcAlt = new DataCube({
    defaultLanguage: 'en',
    dataset,
    dataStructureDefinition,
    measures,
    dimensions,
    attributes,
    attributesElements,
    dimensionElements,
    observations: observationsAlt
});

export default dc;
