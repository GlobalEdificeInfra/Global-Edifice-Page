const fs = require('fs');
const files = fs.readdirSync('/Users/seetharamgn/Documents/design-delight/src/routes/');
for(let f of files) {
  if (f.endsWith('.tsx') && !f.startsWith('_')) {
    let content = fs.readFileSync('/Users/seetharamgn/Documents/design-delight/src/routes/' + f, 'utf8');
    const hasPhone = content.includes('href="tel:+91');
    const hasEnquire = content.includes('ENQUIRE</button>');
    if(content.includes('<nav')) {
      console.log(f, 'hasPhone:', hasPhone, 'hasEnquire:', hasEnquire);
    }
  }
}
