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
  if (island.id === 'tromelin') {
    island.media.images.heroDesktop = "https://cdn.images.express.co.uk/img/dynamic/78/940x/secondary/Tromelin-Island-indian-ocean-africa-madagascar-5966154.avif?r=1740064988458";
    island.media.images.heroMobile = "https://cdn.images.express.co.uk/img/dynamic/78/940x/secondary/Tromelin-Island-indian-ocean-africa-madagascar-5966154.avif?r=1740064988458";
    modified = true;
  }
  if (island.id === 'oahu') {
    island.media.images.heroDesktop = "https://laurenslighthouse.com/wp-content/uploads/2022/11/DJI_0030.jpg";
    island.media.images.heroMobile = "https://laurenslighthouse.com/wp-content/uploads/2022/11/DJI_0030.jpg";
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
