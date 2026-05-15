const fs = require('fs');
const dir = '/Users/seetharamgn/Documents/design-delight/src/routes/';

// Fix about.tsx
let about = fs.readFileSync(dir + 'about.tsx', 'utf8');
about = about.replace('{ label: "TIMELINE", kind: "anchor", href: "#timeline" }', '{ label: "CONTACT", kind: "route", to: "/contact" as const }');
fs.writeFileSync(dir + 'about.tsx', about);

const files = fs.readdirSync(dir);
for (let f of files) {
  if (f.endsWith('.tsx')) {
    let content = fs.readFileSync(dir + f, 'utf8');
    
    // Change hover phone color everywhere to standard or gold #b49a6c, 
    // update phone number to +91 806 548 0222
    content = content.replace(/\+91 80 4376 0152/g, '+91 806 548 0222');
    content = content.replace(/\+918043760152/g, '+918065480222');
    
    // Update the telephone anchor style to match the request more closely
    content = content.replace(/className="hidden sm:inline-flex items-center gap-2 mr-3 px-3 transition text-inherit hover:text-\[#5f3e0f\]"/g, 'className="hidden sm:inline-flex items-center gap-2 mr-6 font-semibold text-[0.95rem] tracking-wide text-[#b49a6c] transition hover:opacity-80"');
    content = content.replace(/className="hidden sm:inline-flex items-center gap-2 mr-3 px-3 transition hover:text-\[#5f3e0f\]"/g, 'className="hidden sm:inline-flex items-center gap-2 mr-6 font-semibold text-[0.95rem] tracking-wide text-[#b49a6c] transition hover:opacity-80"');
    
    fs.writeFileSync(dir + f, content);
  }
}
console.log('updated all files.');
