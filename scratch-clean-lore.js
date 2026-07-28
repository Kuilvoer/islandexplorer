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
  if (island.id === 'pagan-alamagan' || island.id === 'pagan') {
    // Fix Description
    island.story.description = "Twee ruige, uiterst afgelegen actieve vulkaaneilanden in de Noordelijke Marianen. Pagan bestaat uit twee indrukwekkende stratovulkanen, terwijl Alamagan een extreem steile vulkaankegel is. Het gebied wordt gekenmerkt door ongerepte natuur en zware vulkanische activiteit.";
    
    // Fix Tags
    island.logistics.tags = island.logistics.tags.map(tag => tag === "Avontuur-Lore" ? "Mariana Trog" : tag);
    
    // Fix History
    island.story.history = [
      {
        year: 1981,
        event: "Zware eruptie van Mount Pagan dwingt tot de algehele evacuatie van de bewoners naar Saipan."
      },
      {
        year: 2010,
        event: "Hernieuwde vulkanische activiteit en aswolken zorgen ervoor dat langetermijnplannen voor herbevolking worden opgeschort."
      }
    ];
  }
}

const newArrString = JSON.stringify(islandsData, null, 2);
const finalContent = "export const islandsData = " + newArrString + ";\n";
fs.writeFileSync('src/data/islandsData.js', finalContent);
console.log('Cleaned lore for Pagan en Alamagan!');
