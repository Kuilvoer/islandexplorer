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

function traverseAndReplace(obj) {
  for (let key in obj) {
    if (typeof obj[key] === 'string') {
      if (/<[^>]+>/.test(obj[key])) {
        console.log(`Replacing tags in: ${obj[key]}`);
        obj[key] = obj[key].replace(/<[^>]+>/g, '');
      }
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      traverseAndReplace(obj[key]);
    }
  }
}

traverseAndReplace(islandsData);

const newArrString = JSON.stringify(islandsData, null, 2);
const finalContent = "export const islandsData = " + newArrString + ";\n";
fs.writeFileSync('src/data/islandsData.js', finalContent);
console.log('HTML tags stripped successfully!');
