import fs from 'fs';

// Load file
let content = fs.readFileSync('src/data/islandsData.js', 'utf8');

const mapping = {
  "christmas-island": {
    img: "https://cruisingindonesia.com/wp-content/uploads/2025/03/christmas-island-120-beach.jpg",
    route: "Ondanks de afgelegen locatie zijn er geregelde commerciële vluchten via Virgin Australia, die tweemaal per week vertrekken vanaf Perth International Airport op het Australische vasteland.",
    journey: {
      vanaf: "Perth (PER), West-Australië",
      vervoer: "Commerciële vlucht (Virgin Australia of lokale charters).",
      tussenstops: "Soms via de Cocoseilanden, afhankelijk van het vliegschema.",
      afstand: "~2.600 kilometer vliegen over de Indische Oceaan.",
      reistijd: "~3,5 tot 4 uur directe vlucht."
    }
  },
  "cocos-keeling-islands": {
    img: "https://blogassets.airtel.in/wp-content/uploads/2024/11/cocos.png",
    route: "Dit afgelegen koraalatol is exclusief per vliegtuig te bereiken. Virgin Australia verzorgt de verbinding vanuit Perth, die cruciaal is voor de bevoorrading en het toerisme.",
    journey: {
      vanaf: "Perth (PER), West-Australië",
      vervoer: "Vliegtuig, met aankomst op West Island Airport (CCK).",
      tussenstops: "Vrijwel altijd gecombineerd met een stop-over op Christmaseiland.",
      afstand: "~2.750 kilometer vanaf het Australische vasteland.",
      reistijd: "~4,5 tot 5 uur, exclusief de tussenstop."
    }
  },
  "corvo": {
    img: "https://randomtrip.net/wp-content/uploads/2024/05/corvo-dron-aeropuerto-fuente-paralelo-39.jpg",
    route: "Het piepkleine Corvo is enkel te bereiken via binnenlandse SATA Air Açores vluchten of, wanneer de ruige Atlantische oceaan het toelaat, met passagiersboten vanaf het nabijgelegen eiland Flores.",
    journey: {
      vanaf: "Lissabon (LIS) of Ponta Delgada (PDL), Portugal",
      vervoer: "Vliegtuig (Dash-8 propeller) of lokale veerboot (Atlanticoline).",
      tussenstops: "Verplichte overstap op São Miguel, Terceira of Flores.",
      afstand: "~1.900 kilometer vanaf continentaal Portugal.",
      reistijd: "~6 tot 9 uur reisduur inclusief binnenlandse overstappen."
    }
  },
  "oahu": {
    img: "https://usarejser.dk/media/4ocfoz4q/island-of-hawaii.jpeg?width=2000&height=968&format=webp&quality=80&v=1db7e358c1cdd70",
    route: "Oahu fungeert als dé internationale hub van Hawaï. Dagelijks landen tientallen rechtstreekse intercontinentale vluchten op Daniel K. Inouye International Airport vanuit de VS, Azië en Oceanië.",
    journey: {
      vanaf: "Los Angeles (LAX) of San Francisco (SFO), Verenigde Staten.",
      vervoer: "Vliegtuig, via grote maatschappijen zoals Hawaiian Airlines of Delta.",
      tussenstops: "Rechtstreekse verbinding, geen tussenstops nodig.",
      afstand: "~4.100 kilometer over de Stille Oceaan.",
      reistijd: "~5,5 tot 6 uur non-stop vliegen."
    }
  },
  "tarawa": {
    img: "https://mtp-public.s3.us-west-1.amazonaws.com/uploads/1J6Wb1f7rtAJ806qgnhcb5.large?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4QNWC5JK4KYXJBVU%2F20260726%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20260726T160843Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Signature=45d4058cc7346be2386f9ff50a378868690f87f4842f949be7a5cbb72f99a010",
    route: "Tarawa ligt extreem geïsoleerd en is vrijwel alleen bereikbaar via Fiji Airways. De vluchten zijn beperkt tot twee à drie keer per week vanaf de regionale hub Nadi, Fiji.",
    journey: {
      vanaf: "Nadi (NAN), Fiji",
      vervoer: "Vliegtuig naar Bonriki International Airport (TRW).",
      tussenstops: "Soms via Nauru of de Marshalleilanden, afhankelijk van de airline.",
      afstand: "~2.200 kilometer ten noorden van Fiji.",
      reistijd: "~3 uur vliegen vanaf Nadi."
    }
  },
  "marquesas-islands": {
    img: "https://www.tahiti.com/images1/gallery/Hatiheu2-2000x1200_276.jpg",
    route: "Een reis naar de uiterst afgelegen Marquesas vereist planning. Air Tahiti vliegt met kleine toestellen vanuit Papeete. Voor een authentieke, trage ervaring reis je mee op het iconische vracht/passagiersschip Aranui 5.",
    journey: {
      vanaf: "Papeete (PPT) op Tahiti, Frans-Polynesië",
      vervoer: "Binnenlandse vlucht of een 14-daagse expeditiecruise (Aranui 5).",
      tussenstops: "Meestal direct vanuit Papeete, boten stoppen bij de Tuamotu-archipel.",
      afstand: "~1.400 kilometer noordoostelijk van Tahiti.",
      reistijd: "~3,5 uur vliegen, of meerdere zeedagen per vrachtschip."
    }
  },
  "norfolk-island": {
    img: "https://norfolk.hideawayholidays.com.au/wp-content/uploads/2024/05/Best_Time_to_Visit_Norfolk_Blog_1200px_02.jpg",
    route: "Norfolkeiland is verbonden via een stabiele vliegverbinding met de Australische oostkust. Qantas voert wekelijks meerdere lijndiensten uit vanuit zowel Sydney als Brisbane.",
    journey: {
      vanaf: "Sydney (SYD) of Brisbane (BNE), Australië",
      vervoer: "Vliegtuig, Qantas-lijndiensten naar Norfolk Island Airport (NLK).",
      tussenstops: "Rechtstreekse verbinding, geen tussenstops.",
      afstand: "~1.680 kilometer vliegen over de Tasmanzee.",
      reistijd: "~2,5 uur non-stop."
    }
  },
  "pagan-alamagan": {
    img: "https://media.rnztools.nz/rnz/image/upload/s--CllkwNd2--/c_scale,f_auto,q_auto,w_1050/v1643771697/4O5OS94_copyright_image_128985?_a=BACCd2AD",
    route: "Omdat Pagan en Alamagan na vulkaanuitbarstingen officieel zijn geëvacueerd, is er geen lijndienst of luchthaven. Transport is exclusief voorbehouden aan gecharterde expeditieboten of zeldzame helikoptervluchten vanuit Saipan, waarbij overheidstoestemming strikt vereist is.",
    journey: {
      vanaf: "Saipan (SPN), Noordelijke Marianen",
      vervoer: "Private of wetenschappelijke expeditieboot (of marinehelikopter).",
      tussenstops: "Varieert per route en de staat van de zee.",
      afstand: "~310 tot 360 kilometer gevaarlijke oceaanwateren.",
      reistijd: "~15 tot 20 uur ruige vaartijd, afhankelijk van weersomstandigheden."
    }
  },
  "tahiti": {
    img: "https://dx466kr41l2b.cloudfront.net/images/tahiti-society-islands-hero.jpg",
    route: "Tahiti is de belangrijkste gateway tot Frans-Polynesië. Grote airlines zoals Air Tahiti Nui en Air France verzorgen dagelijks intercontinentale vluchten via de Verenigde Staten of Nieuw-Zeeland.",
    journey: {
      vanaf: "Los Angeles (LAX) of San Francisco (SFO), Verenigde Staten.",
      vervoer: "Intercontinentale vlucht naar Fa'a'ā International Airport (PPT).",
      tussenstops: "Vaak directe vluchten vanuit LAX, of via Auckland.",
      afstand: "~6.600 kilometer vliegen vanuit Californië.",
      reistijd: "~8 uur non-stop vliegen over de Stille Oceaan."
    }
  },
  "tuvalu": {
    img: "https://s.france24.com/media/display/adf11456-6797-11f0-8f27-005056a90284/w:1280/p:1x1/2025-06-29T094258Z-355101633-RC2TU9AOHJI1-RTRMADP-3-TUVALU-AUSTRALIA-CLIMATE.jpg",
    route: "Als een van 's werelds minst bezochte naties heeft Tuvalu een zeer kwetsbare infrastructuur. Fiji Airways biedt als enige een lijndienst (drie keer per week) vanaf Suva, Fiji.",
    journey: {
      vanaf: "Suva (SUV), Fiji",
      vervoer: "Turboprop vliegtuig naar Funafuti International Airport (FUN).",
      tussenstops: "Rechtstreekse, maar sterk weer-afhankelijke verbinding.",
      afstand: "~1.050 kilometer ten noorden van Fiji.",
      reistijd: "~2,5 uur vliegen, met regelmatig vertraging door tropische systemen."
    }
  }
};

// We will extract the JSON array, parse it, update it, and write it back
const match = content.match(/export const islandsData = (\[[\s\S]+\]);/);
if (!match) {
  console.error("Could not find islandsData array in file!");
  process.exit(1);
}

const arrString = match[1];
// Because it's purely JSON-like, we can actually eval it or use a trick since the file only contains that.
// But earlier we just parsed it safely. Wait, there might be single quotes or something?
// Actually, earlier we did string replacement. Let's just use JSON.parse by doing a strict replace if necessary, 
// OR since it's just a JS file, we can eval it to get the object, update it, and stringify it back.
// Since it's our own controlled file, eval is safe.

let islandsData;
try {
  islandsData = eval('(' + arrString + ')');
} catch(e) {
  console.error("Eval failed", e);
  process.exit(1);
}

for (let island of islandsData) {
  if (mapping[island.id]) {
    const data = mapping[island.id];
    island.media.images.heroDesktop = data.img;
    island.media.images.heroMobile = data.img;
    island.logistics.route = data.route;
    island.logistics.journey = data.journey;
  }
}

const newArrString = JSON.stringify(islandsData, null, 2);
const finalContent = "export const islandsData = " + newArrString + ";\n";
fs.writeFileSync('src/data/islandsData.js', finalContent);
console.log('Updated islandsData.js with new images and logistics!');
