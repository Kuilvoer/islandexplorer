import fs from 'fs';

const newIslands = [
  {
    "id": "christmaseiland",
    "name": "Christmaseiland",
    "country": "Australië",
    "region": "Indische Oceaan",
    "themeType": "tropical",
    "geographyType": "Eiland",
    "location": {
      "lat": -10.4475,
      "lng": 105.6904,
      "timezone": "Indian/Christmas"
    },
    "stats": {
      "population": 1843,
      "distanceToMainlandKm": 1550,
      "areaSqKm": 135,
      "highestPointMeters": 361
    },
    "logistics": {
      "route": "Vluchten vanaf Perth, Australië.",
      "permitRequired": false,
      "tags": ["Natuur", "Luchthaven"],
      "journey": {
        "vanaf": "Perth, Australië",
        "vervoer": "Vliegtuig",
        "tussenstops": "",
        "afstand": "~2.600 kilometer",
        "reistijd": "~3,5 uur"
      }
    },
    "story": {
      "description": "Beroemd om de spectaculaire jaarlijkse rode krabbenmigratie. Het is een afgelegen Australisch territorium in de Indische Oceaan met unieke flora en fauna.",
      "floraFauna": "Miljoenen rode krabben, zeldzame zeevogels.",
      "history": [
        { "year": 1643, "event": "Ontdekt op Eerste Kerstdag door kapitein William Mynors." }
      ]
    },
    "economyAndCulture": {
      "currencyCode": "AUD",
      "connectivity": "Matig. Satelliet en lokaal mobiel netwerk.",
      "souvenirTip": "Krab-gerelateerde souvenirs."
    },
    "hazards": [
      "Wilde oceaanstromingen",
      "Krabben op de weg tijdens migratie"
    ],
    "media": {
      "countryCode": "cx",
      "ambientAudioUrl": "/assets/audio/jungle-birds.mp3",
      "images": {
        "heroDesktop": "https://images.unsplash.com/photo-1544642878-5a2a22026194?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        "heroMobile": "https://images.unsplash.com/photo-1544642878-5a2a22026194?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "gallery": []
      }
    }
  },
  {
    "id": "cocoseilanden",
    "name": "Cocoseilanden",
    "country": "Australië",
    "region": "Indische Oceaan",
    "themeType": "tropical",
    "geographyType": "Atol",
    "location": {
      "lat": -12.1642,
      "lng": 96.8710,
      "timezone": "Indian/Cocos"
    },
    "stats": {
      "population": 544,
      "distanceToMainlandKm": 2100,
      "areaSqKm": 14,
      "highestPointMeters": 5
    },
    "logistics": {
      "route": "Vluchten vanaf Perth via Christmaseiland.",
      "permitRequired": false,
      "tags": ["Atol", "Tropisch", "Luchthaven"],
      "journey": {
        "vanaf": "Perth, Australië",
        "vervoer": "Vliegtuig",
        "tussenstops": "Christmaseiland",
        "afstand": "~3.000 kilometer",
        "reistijd": "~4,5 uur"
      }
    },
    "story": {
      "description": "Twee atollen en 27 koraaleilanden, waarvan er slechts twee bewoond zijn. Perfect voor snorkelen en ontsnappen aan de bewoonde wereld in een echt tropisch paradijs.",
      "floraFauna": "Kokospalmen, koraalriffen, karetschildpadden.",
      "history": [
        { "year": 1609, "event": "Ontdekt door kapitein William Keeling." }
      ]
    },
    "economyAndCulture": {
      "currencyCode": "AUD",
      "connectivity": "Beperkt tot de twee bewoonde eilanden.",
      "souvenirTip": "Lokaal houtsnijwerk of kokosproducten."
    },
    "hazards": [
      "Kans op cyclonen"
    ],
    "media": {
      "countryCode": "cc",
      "ambientAudioUrl": "/assets/audio/ocean-waves.mp3",
      "images": {
        "heroDesktop": "https://images.unsplash.com/photo-1596489379685-6187766f6424?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        "heroMobile": "https://images.unsplash.com/photo-1596489379685-6187766f6424?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "gallery": []
      }
    }
  },
  {
    "id": "corvo",
    "name": "Corvo",
    "country": "Portugal",
    "region": "Noord-Atlantische Oceaan",
    "themeType": "temperate",
    "geographyType": "Eiland",
    "location": {
      "lat": 39.7022,
      "lng": -31.1116,
      "timezone": "Atlantic/Azores"
    },
    "stats": {
      "population": 430,
      "distanceToMainlandKm": 1500,
      "areaSqKm": 17,
      "highestPointMeters": 718
    },
    "logistics": {
      "route": "Vluchten of veerboten vanaf andere Azoren (bijv. Flores).",
      "permitRequired": false,
      "tags": ["Europees", "Dorp", "Vulkanisch"],
      "journey": {
        "vanaf": "Lissabon via Ponta Delgada en Flores.",
        "vervoer": "Vliegtuig & Veerboot",
        "tussenstops": "Meerdere",
        "afstand": "~1.900 kilometer",
        "reistijd": "~6 uur"
      }
    },
    "story": {
      "description": "Het kleinste en meest afgelegen eiland van de Azoren-archipel. Met slechts 400 inwoners is Vila do Corvo een van de meest geïsoleerde dorpen van Europa.",
      "floraFauna": "Graslanden, trekvogels uit Amerika.",
      "history": [
        { "year": 1452, "event": "Ontdekt door de Portugese ontdekkingsreiziger Diogo de Teive." }
      ]
    },
    "economyAndCulture": {
      "currencyCode": "EUR",
      "connectivity": "Goed, Europees netwerk.",
      "souvenirTip": "Traditionele wollen mutsen ('barrete de orelhas')."
    },
    "hazards": [
      "Onvoorspelbaar Atlantisch weer"
    ],
    "media": {
      "countryCode": "pt",
      "ambientAudioUrl": "/assets/audio/wind.mp3",
      "images": {
        "heroDesktop": "https://images.unsplash.com/photo-1588691524388-7e3e4a9e3b1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        "heroMobile": "https://images.unsplash.com/photo-1588691524388-7e3e4a9e3b1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "gallery": []
      }
    }
  },
  {
    "id": "oahu",
    "name": "Oahu",
    "country": "Verenigde Staten",
    "region": "Stille Oceaan",
    "themeType": "tropical",
    "geographyType": "Eiland",
    "location": {
      "lat": 21.4389,
      "lng": -158.0001,
      "timezone": "Pacific/Honolulu"
    },
    "stats": {
      "population": 995638,
      "distanceToMainlandKm": 3970,
      "areaSqKm": 1545,
      "highestPointMeters": 1220
    },
    "logistics": {
      "route": "Internationale vluchten naar Honolulu (HNL).",
      "permitRequired": false,
      "tags": ["Luchthaven", "Toeristisch", "Druk"],
      "journey": {
        "vanaf": "Los Angeles (LAX).",
        "vervoer": "Vliegtuig",
        "tussenstops": "",
        "afstand": "~4.100 kilometer",
        "reistijd": "~5,5 uur"
      }
    },
    "story": {
      "description": "Het kloppend hart van Hawaï, met de wereldberoemde Waikiki Beach, Pearl Harbor en weelderige groene bergen. Hoewel drukbevolkt, blijft het duizenden kilometers geïsoleerd in de oceaan.",
      "floraFauna": "Tropische regenwouden, zeeschildpadden, bultrugwalvissen.",
      "history": [
        { "year": 1778, "event": "Eerste Europees contact door James Cook." }
      ]
    },
    "economyAndCulture": {
      "currencyCode": "USD",
      "connectivity": "Uitstekend.",
      "souvenirTip": "Macadamianoten, Kona-koffie of een traditionele lei."
    },
    "hazards": [
      "Grote oceaangolven in de winter (North Shore)"
    ],
    "media": {
      "countryCode": "us",
      "ambientAudioUrl": "/assets/audio/ocean-waves.mp3",
      "images": {
        "heroDesktop": "https://images.unsplash.com/photo-1542259009477-d625272157b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        "heroMobile": "https://images.unsplash.com/photo-1542259009477-d625272157b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "gallery": []
      }
    }
  },
  {
    "id": "tarawa",
    "name": "Tarawa",
    "country": "Kiribati",
    "region": "Stille Oceaan",
    "themeType": "tropical",
    "geographyType": "Atol",
    "location": {
      "lat": 1.4300,
      "lng": 173.0000,
      "timezone": "Pacific/Tarawa"
    },
    "stats": {
      "population": 70000,
      "distanceToMainlandKm": 4000,
      "areaSqKm": 31,
      "highestPointMeters": 3
    },
    "logistics": {
      "route": "Vluchten vanuit Fiji (Nadi) of Brisbane.",
      "permitRequired": false,
      "tags": ["Atol", "Extreem Afgelegen"],
      "journey": {
        "vanaf": "Nadi, Fiji.",
        "vervoer": "Vliegtuig",
        "tussenstops": "",
        "afstand": "~2.100 kilometer",
        "reistijd": "~3 uur"
      }
    },
    "story": {
      "description": "De hoofdstad van de eilandennatie Kiribati. Een smalle strook land omringd door koraalriffen en de Stille Oceaan, bedreigd door zeespiegelstijging.",
      "floraFauna": "Uitgestrekte mariene ecosystemen, kokospalmen.",
      "history": [
        { "year": 1943, "event": "Locatie van de bloedige Slag om Tarawa in de Tweede Wereldoorlog." }
      ]
    },
    "economyAndCulture": {
      "currencyCode": "AUD",
      "connectivity": "Matig. Trager internet.",
      "souvenirTip": "Geweven pandanus-matten."
    },
    "hazards": [
      "Overstromingen door stijgende zeespiegel"
    ],
    "media": {
      "countryCode": "ki",
      "ambientAudioUrl": "/assets/audio/ocean-waves.mp3",
      "images": {
        "heroDesktop": "https://images.unsplash.com/photo-1589307004242-b4369a40507a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        "heroMobile": "https://images.unsplash.com/photo-1589307004242-b4369a40507a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "gallery": []
      }
    }
  },
  {
    "id": "marquesaseilanden",
    "name": "Marquesaseilanden",
    "country": "Frans-Polynesië",
    "region": "Stille Oceaan",
    "themeType": "jungle",
    "geographyType": "Archipel",
    "location": {
      "lat": -9.0000,
      "lng": -139.5000,
      "timezone": "Pacific/Marquesas"
    },
    "stats": {
      "population": 9346,
      "distanceToMainlandKm": 4800,
      "areaSqKm": 1049,
      "highestPointMeters": 1276
    },
    "logistics": {
      "route": "Binnenlandse vluchten vanuit Papeete (Tahiti).",
      "permitRequired": false,
      "tags": ["Jungle", "Vulkanisch", "Historisch"],
      "journey": {
        "vanaf": "Papeete, Tahiti.",
        "vervoer": "Vliegtuig",
        "tussenstops": "",
        "afstand": "~1.400 kilometer",
        "reistijd": "~3,5 uur"
      }
    },
    "story": {
      "description": "Een ruige vulkanische archipel ver weg van alles, bekend om zijn spectaculaire steile kliffen, weelderige groene valleien en rijke Polynesische tradities.",
      "floraFauna": "Wilde paarden, weelderige jungle flora, zeevogels.",
      "history": [
        { "year": 1595, "event": "Ontdekt door de Spaanse ontdekkingsreiziger Álvaro de Mendaña." }
      ]
    },
    "economyAndCulture": {
      "currencyCode": "XPF",
      "connectivity": "Beperkt tot de hoofddorpen.",
      "souvenirTip": "Fijn houtsnijwerk of een Polynesische tattoo (als je durft)."
    },
    "hazards": [
      "Tropische stormen, moeilijk begaanbaar terrein"
    ],
    "media": {
      "countryCode": "pf",
      "ambientAudioUrl": "/assets/audio/jungle-waterfall.mp3",
      "images": {
        "heroDesktop": "https://images.unsplash.com/photo-1590453530006-218fc8db93cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        "heroMobile": "https://images.unsplash.com/photo-1590453530006-218fc8db93cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "gallery": []
      }
    }
  },
  {
    "id": "norfolkeiland",
    "name": "Norfolkeiland",
    "country": "Australië",
    "region": "Stille Oceaan",
    "themeType": "temperate",
    "geographyType": "Eiland",
    "location": {
      "lat": -29.0408,
      "lng": 167.9547,
      "timezone": "Pacific/Norfolk"
    },
    "stats": {
      "population": 1748,
      "distanceToMainlandKm": 1400,
      "areaSqKm": 34,
      "highestPointMeters": 319
    },
    "logistics": {
      "route": "Vluchten vanuit Sydney of Brisbane.",
      "permitRequired": false,
      "tags": ["Historisch", "Natuur", "Luchthaven"],
      "journey": {
        "vanaf": "Sydney, Australië.",
        "vervoer": "Vliegtuig",
        "tussenstops": "",
        "afstand": "~1.600 kilometer",
        "reistijd": "~2,5 uur"
      }
    },
    "story": {
      "description": "Een fascinerend eiland met pijnbomen en kliffen. Bekend om zijn verleden als strafkolonie en als thuisbasis voor nakomelingen van de Bounty-muiters.",
      "floraFauna": "De beroemde Norfolkden, groene papegaaien.",
      "history": [
        { "year": 1774, "event": "Ontdekt door kapitein James Cook." },
        { "year": 1856, "event": "Aankomst van de Bounty-muiters vanuit Pitcairn." }
      ]
    },
    "economyAndCulture": {
      "currencyCode": "AUD",
      "connectivity": "Goed, maar prijzig.",
      "souvenirTip": "Houtsnijwerk van de Norfolkden."
    },
    "hazards": [
      "Steile kliffen"
    ],
    "media": {
      "countryCode": "nf",
      "ambientAudioUrl": "/assets/audio/wind.mp3",
      "images": {
        "heroDesktop": "https://images.unsplash.com/photo-1616254707166-3d2b27cc3b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        "heroMobile": "https://images.unsplash.com/photo-1616254707166-3d2b27cc3b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "gallery": []
      }
    }
  },
  {
    "id": "pagan",
    "name": "Pagan (en Alamagan)",
    "country": "Noordelijke Marianen",
    "region": "Stille Oceaan",
    "themeType": "volcanic",
    "geographyType": "Vulkanisch Eiland",
    "location": {
      "lat": 18.1167,
      "lng": 145.7667,
      "timezone": "Pacific/Guam"
    },
    "stats": {
      "population": 0,
      "distanceToMainlandKm": 2000,
      "areaSqKm": 47,
      "highestPointMeters": 570
    },
    "logistics": {
      "route": "Geen commerciële routes. Toegang uitsluitend via gecharterde boten vanuit Saipan.",
      "permitRequired": true,
      "tags": ["Onbewoond", "Vulkaan", "Extreem Afgelegen"],
      "journey": {
        "vanaf": "Saipan.",
        "vervoer": "Boot",
        "tussenstops": "Alamagan",
        "afstand": "~300 kilometer",
        "reistijd": "~Vele uren per boot"
      }
    },
    "story": {
      "description": "Ruige, onbewoonde vulkanische eilanden. Ooit bewoond, maar geëvacueerd door uitbarstingen. Yes Theory reisde hierheen, maar raakte zonder brandstof en strandde 42 uur op het nabijgelegen eiland Alamagan.",
      "floraFauna": "Verwilderde veestapels, zwarte vulkaanasstranden.",
      "history": [
        { "year": 1981, "event": "Grote vulkaanuitbarsting dwong volledige evacuatie af." }
      ]
    },
    "economyAndCulture": {
      "currencyCode": "USD",
      "connectivity": "Nul. Satelliettelefoons vereist.",
      "souvenirTip": "Vulkanisch gesteente (als het mag van de natuurwetten)."
    },
    "hazards": [
      "Actieve vulkaan",
      "Onbereikbaarheid bij nood",
      "Brandstoftekort (vraag Yes Theory)"
    ],
    "media": {
      "countryCode": "mp",
      "ambientAudioUrl": "/assets/audio/volcano.mp3",
      "images": {
        "heroDesktop": "https://images.unsplash.com/photo-1601053075253-27c13a0198de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        "heroMobile": "https://images.unsplash.com/photo-1601053075253-27c13a0198de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "gallery": []
      }
    }
  },
  {
    "id": "tahiti",
    "name": "Tahiti",
    "country": "Frans-Polynesië",
    "region": "Stille Oceaan",
    "themeType": "tropical",
    "geographyType": "Eiland",
    "location": {
      "lat": -17.6509,
      "lng": -149.4260,
      "timezone": "Pacific/Tahiti"
    },
    "stats": {
      "population": 189517,
      "distanceToMainlandKm": 5700,
      "areaSqKm": 1043,
      "highestPointMeters": 2241
    },
    "logistics": {
      "route": "Internationale luchthaven Fa'a'ā (PPT).",
      "permitRequired": false,
      "tags": ["Paradijs", "Luchthaven", "Toeristisch"],
      "journey": {
        "vanaf": "Los Angeles (LAX).",
        "vervoer": "Vliegtuig",
        "tussenstops": "",
        "afstand": "~6.600 kilometer",
        "reistijd": "~8 uur"
      }
    },
    "story": {
      "description": "Het grootste eiland van Frans-Polynesië, een tropisch meesterwerk met zwarte zandstranden, majestueuze watervallen, uitgedoofde vulkanen en wereldklasse surfgolven (Teahupo'o).",
      "floraFauna": "Koraalriffen, roggen, tropische bloemen (Tiare).",
      "history": [
        { "year": 1767, "event": "Aangemeerd door Samuel Wallis." }
      ]
    },
    "economyAndCulture": {
      "currencyCode": "XPF",
      "connectivity": "Zeer goed op de toeristische plekken.",
      "souvenirTip": "Zwarte parels of geurende Monoi-olie."
    },
    "hazards": [
      "Tropische wervelstormen, gevaarlijke branding bij riffen"
    ],
    "media": {
      "countryCode": "pf",
      "ambientAudioUrl": "/assets/audio/ocean-waves.mp3",
      "images": {
        "heroDesktop": "https://images.unsplash.com/photo-1589309736404-2e142a2acdf0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        "heroMobile": "https://images.unsplash.com/photo-1589309736404-2e142a2acdf0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "gallery": []
      }
    }
  },
  {
    "id": "tuvalu",
    "name": "Tuvalu",
    "country": "Tuvalu",
    "region": "Stille Oceaan",
    "themeType": "tropical",
    "geographyType": "Atol",
    "location": {
      "lat": -8.5167,
      "lng": 179.2167,
      "timezone": "Pacific/Funafuti"
    },
    "stats": {
      "population": 11200,
      "distanceToMainlandKm": 3400,
      "areaSqKm": 26,
      "highestPointMeters": 4
    },
    "logistics": {
      "route": "Uiterst zeldzame vluchten vanaf Fiji.",
      "permitRequired": false,
      "tags": ["Extreem Afgelegen", "Minst Bezochte Land"],
      "journey": {
        "vanaf": "Suva, Fiji.",
        "vervoer": "Vliegtuig (Fiji Airways)",
        "tussenstops": "",
        "afstand": "~1.100 kilometer",
        "reistijd": "~2,5 uur"
      }
    },
    "story": {
      "description": "Een van de kleinste en minst bezochte onafhankelijke landen ter wereld. Bestaat volledig uit laaggelegen atollen die ernstig worden bedreigd door de stijgende zeespiegel.",
      "floraFauna": "Uitgestrekte lagunes, koraalriffen.",
      "history": [
        { "year": 1978, "event": "Onafhankelijk van het Verenigd Koninkrijk." }
      ]
    },
    "economyAndCulture": {
      "currencyCode": "AUD",
      "connectivity": "Zwak en onbetrouwbaar internet.",
      "souvenirTip": "Traditionele sieraden van schelpen of postzegels."
    },
    "hazards": [
      "Stijgende zeespiegel (klimaatverandering)"
    ],
    "media": {
      "countryCode": "tv",
      "ambientAudioUrl": "/assets/audio/ocean-waves.mp3",
      "images": {
        "heroDesktop": "https://images.unsplash.com/photo-1563242691-8d26456f91f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        "heroMobile": "https://images.unsplash.com/photo-1563242691-8d26456f91f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "gallery": []
      }
    }
  }
];

const content = fs.readFileSync('src/data/islandsData.js', 'utf8');
const appended = content.replace('];', newIslands.map(i => '  ' + JSON.stringify(i, null, 2).replace(/\n/g, '\n  ') + ',').join('\n') + '\n];');
fs.writeFileSync('src/data/islandsData.js', appended);
console.log('Done appending!');
