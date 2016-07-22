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
  },
  {
    "@id": "http://example.cubeviz.org/compare/mortalityEurope/obs10",
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
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Y2010"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/unit": [
      {
        "@value": "straight deaths"
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
    "http://example.cubeviz.org/compare/mortalityEurope/country": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Germany"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/year": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Y2011"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/unit": [
      {
        "@value": "straight deaths"
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
    "@id": "http://example.cubeviz.org/compare/mortalityEurope/obs12",
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
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Y2012"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/unit": [
      {
        "@value": "straight deaths"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/value": [
      {
        "@value": "905280",
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
    "@id": "http://example.cubeviz.org/compare/mortalityEurope/obs13",
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
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Y2000"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/unit": [
      {
        "@value": "straight deaths"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/value": [
      {
        "@value": "617713",
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
    "@id": "http://example.cubeviz.org/compare/mortalityEurope/obs14",
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
        "@value": "617377",
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
    "@id": "http://example.cubeviz.org/compare/mortalityEurope/obs18",
    "http://example.cubeviz.org/compare/mortalityEurope/country": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/UnitedKingdom"
      }
    ],
    "@type": [
      "http://purl.org/linked-data/cube#Observation"
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/year": [
      {
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Y2005"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/unit": [
      {
        "@value": "straight deaths"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/value": [
      {
        "@value": "615279",
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
    "@id": "http://example.cubeviz.org/compare/mortalityEurope/obs19",
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
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Y2006"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/unit": [
      {
        "@value": "straight deaths"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/value": [
      {
        "@value": "613969",
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
    "@id": "http://example.cubeviz.org/compare/mortalityEurope/obs20",
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
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Y2007"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/unit": [
      {
        "@value": "straight deaths"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/value": [
      {
        "@value": "613229",
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
    "@id": "http://example.cubeviz.org/compare/mortalityEurope/obs21",
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
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Y2008"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/unit": [
      {
        "@value": "straight deaths"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/value": [
      {
        "@value": "612477",
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
    "@id": "http://example.cubeviz.org/compare/mortalityEurope/obs22",
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
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Y2009"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/unit": [
      {
        "@value": "straight deaths"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/value": [
      {
        "@value": "612352",
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
    "@id": "http://example.cubeviz.org/compare/mortalityEurope/obs23",
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
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Y2010"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/unit": [
      {
        "@value": "straight deaths"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/value": [
      {
        "@value": "581706",
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
    "@id": "http://example.cubeviz.org/compare/mortalityEurope/obs24",
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
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Y2011"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/unit": [
      {
        "@value": "straight deaths"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/value": [
      {
        "@value": "584972",
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
    "@id": "http://example.cubeviz.org/compare/mortalityEurope/obs25",
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
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Y2012"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/unit": [
      {
        "@value": "straight deaths"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/value": [
      {
        "@value": "588228",
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
    "@id": "http://example.cubeviz.org/compare/mortalityEurope/obs5",
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
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Y2005"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/unit": [
      {
        "@value": "straight deaths"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/value": [
      {
        "@value": "865100",
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
    "@id": "http://example.cubeviz.org/compare/mortalityEurope/obs6",
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
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Y2006"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/unit": [
      {
        "@value": "straight deaths"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/value": [
      {
        "@value": "870020",
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
    "@id": "http://example.cubeviz.org/compare/mortalityEurope/obs7",
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
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Y2007"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/unit": [
      {
        "@value": "straight deaths"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/value": [
      {
        "@value": "878220",
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
    "@id": "http://example.cubeviz.org/compare/mortalityEurope/obs8",
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
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Y2008"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/unit": [
      {
        "@value": "straight deaths"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/value": [
      {
        "@value": "885600",
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
    "@id": "http://example.cubeviz.org/compare/mortalityEurope/obs9",
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
        "@id": "http://example.cubeviz.org/compare/mortalityEurope/Y2009"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/unit": [
      {
        "@value": "straight deaths"
      }
    ],
    "http://example.cubeviz.org/compare/mortalityEurope/value": [
      {
        "@value": "892980",
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
];

const dc = new DataCube({
    defaultLanguage: 'en',
    dataset,
    dataStructureDefinition,
    defaultMeasureProperty,
    dimensions,
    dimensionElements,
    observations
});

export default dc;
