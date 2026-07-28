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

let modified = false;

for (let island of islandsData) {
  if (island.id === 'ascension') {
    island.media.images.heroDesktop = "https://www.ascension.gov.ac/wp-content/uploads/2019/09/Terrestrial-Conservation.jpg";
    island.media.images.heroMobile = "https://www.ascension.gov.ac/wp-content/uploads/2019/09/Terrestrial-Conservation.jpg";
    modified = true;
  }
}

if (modified) {
  const newArrString = JSON.stringify(islandsData, null, 2);
  const finalContent = "export const islandsData = " + newArrString + ";\n";
  fs.writeFileSync('src/data/islandsData.js', finalContent);
  console.log('Images updated successfully!');
} else {
  console.log('Islands not found.');
}
