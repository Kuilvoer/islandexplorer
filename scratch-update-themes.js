import fs from 'fs';

let content = fs.readFileSync('src/data/islandsData.js', 'utf8');

const match = content.match(/export const islandsData = (\[[\s\S]+\]);/);
if (!match) {
  console.error("Could not find islandsData array in file!");
  process.exit(1);
}

const arrString = match[1];

let islandsData;
try {
  islandsData = eval('(' + arrString + ')');
} catch(e) {
  console.error("Eval failed", e);
  process.exit(1);
}

for (let island of islandsData) {
  if (island.id === 'christmaseiland' || island.id === 'christmas-island') {
    island.themeType = 'jungle';
  } else if (island.id === 'corvo') {
    island.themeType = 'volcanic';
  } else if (island.id === 'marquesas-islands' || island.id === 'marquesaseilanden') {
    island.themeType = 'jungle';
  } else if (island.id === 'norfolk-island' || island.id === 'norfolkeiland') {
    island.themeType = 'jungle';
  } else if (island.id === 'pagan-alamagan' || island.id === 'pagan') {
    island.story.description = "Twee ruige, uiterst afgelegen actieve vulkaaneilanden in de Stille Oceaan. Bekend uit waanzinnige avonturen-lore nadat een groep moderne ontdekkingsreizigers zonder brandstof kwam te zitten en onverwachts 42 uur moest zien te overleven op het strand van Alamagan.";
  } else if (island.id === 'tuvalu') {
    island.story.description = "Een van de kleinste en minst bezochte landen ter wereld, opgebouwd uit smalle atollen. Tuvalu vecht dagelijks een existentiële strijd tegen de stijgende zeespiegel; het hoogste punt ligt slechts een paar meter boven de golven.";
  } else if (island.id === 'tarawa') {
    island.story.description = "De fragiele hoofdstad-atol van Kiribati, extreem langgerekt en soms letterlijk maar enkele tientallen meters breed. Historisch beroemd door felle WOII-veldslagen, nu in een felle strijd met klimaatverandering.";
  }
}

const newArrString = JSON.stringify(islandsData, null, 2);
const finalContent = "export const islandsData = " + newArrString + ";\n";
fs.writeFileSync('src/data/islandsData.js', finalContent);
console.log('Updated themes and lore!');
