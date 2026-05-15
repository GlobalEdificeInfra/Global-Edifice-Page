const fs = require('fs');
const files = fs.readdirSync('/Users/seetharamgn/Documents/design-delight/src/routes/');

const phoneRegex = /tel:\+918065480222/;

console.log("Checking for missing phone numbers in navbars...");
for (const f of files) {
  if (!f.endsWith('.tsx')) continue;
  const content = fs.readFileSync('/Users/seetharamgn/Documents/design-delight/src/routes/' + f, 'utf8');
  if (content.includes('ENQUIRE') && !content.match(phoneRegex)) {
    console.log("Missing in: " + f);
  }
}
console.log("Done checking.");
