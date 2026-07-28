import fs from 'fs';

const content = fs.readFileSync('src/data/islandsData.js', 'utf-8');
const names = [...content.matchAll(/"name":\s*"(.*?)"/g)].map(m => m[1]);
console.log(names);
