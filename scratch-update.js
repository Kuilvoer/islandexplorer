import fs from 'fs';

const islandsFile = fs.readFileSync('src/data/islandsData.js', 'utf8');
const batch6 = fs.readFileSync('batch6.txt', 'utf8');

const idIndex = islandsFile.indexOf('"id": "christmaseiland"');
if (idIndex === -1) {
    console.error("Could not find christmaseiland");
    process.exit(1);
}

// Find the opening brace before it
let splitIndex = islandsFile.lastIndexOf('{', idIndex);
// Go back to the preceding whitespace to remove the whole object
while(splitIndex > 0 && /\s/.test(islandsFile[splitIndex - 1])) {
    splitIndex--;
}

let original50 = islandsFile.substring(0, splitIndex).trim();

if (original50.endsWith(',')) {
    original50 = original50.substring(0, original50.length - 1);
}
original50 += ',\n';

const newIslandsArray = JSON.parse(batch6);
const newIslandsString = newIslandsArray.map(i => '  ' + JSON.stringify(i, null, 2).replace(/\n/g, '\n  ')).join(',\n');

const finalContent = original50 + newIslandsString + '\n];\n';

fs.writeFileSync('src/data/islandsData.js', finalContent);
console.log('Successfully updated islandsData.js');
