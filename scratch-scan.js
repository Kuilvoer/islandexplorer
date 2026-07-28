import fs from 'fs';

let content = fs.readFileSync('src/data/islandsData.js', 'utf8');

// Find HTML tags
const htmlRegex = /<[^>]+>/g;
let match;
console.log("--- HTML TAGS ---");
while ((match = htmlRegex.exec(content)) !== null) {
  const line = content.substring(0, match.index).split('\n').length;
  console.log(`Line ${line}: found ${match[0]}`);
}

// Find replacement characters
const weirdRegex = //g;
console.log("--- REPLACEMENT CHARS ---");
while ((match = weirdRegex.exec(content)) !== null) {
  const line = content.substring(0, match.index).split('\n').length;
  console.log(`Line ${line}: found `);
}

// Check for other potential bad encoding like 'Ã«' (ë in latin1)
const latin1Regex = /[Ã]/g;
console.log("--- LATIN1 ARTIFACTS ---");
while ((match = latin1Regex.exec(content)) !== null) {
  const line = content.substring(0, match.index).split('\n').length;
  console.log(`Line ${line}: found possible latin1 artifact`);
}
