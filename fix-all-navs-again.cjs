const fs = require('fs');
const files = fs.readdirSync('/Users/seetharamgn/Documents/design-delight/src/routes/');

function fixPage(f) {
  const path = '/Users/seetharamgn/Documents/design-delight/src/routes/' + f;
  if (!fs.statSync(path).isFile()) return;
  if (!f.endsWith('.tsx') || f.startsWith('_') || f === 'index.tsx' || f === 'contact.tsx') return;
  
  let content = fs.readFileSync(path, 'utf8');

  // Insert phone before desktop enquire
  const deskEnq1 = /<a\s+href="[^"]*#contact"\s+className="rounded-full bg-\[\#b49a6c\]/g;
  if (content.match(deskEnq1)) {
    content = content.replace(deskEnq1, `<a href="tel:+918065480222" className="hidden sm:inline-flex items-center gap-1.5 transition text-[#996317] hover:text-[#123a4c] mx-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone h-[1.1rem] w-[1.1rem]"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg><span className="font-semibold tracking-[0.05em]">+91 806 548 0222</span></a>
            <button onClick={() => window.dispatchEvent(new CustomEvent("open-enquiry-popup"))} className="rounded-full bg-[#b49a6c]`);
    content = content.replace(/ENQUIRE\s*<\/a>/, 'ENQUIRE</button>');
  }

  // Insert phone before mobile enquire
  const mobEnq = /<a\s+href="[^"]*#contact"\s+className="rounded-full border border-white\/40 bg-white\/10 px-3\.5 py-2/g;
  if(content.match(mobEnq)) {
      content = content.replace(mobEnq, `<button onClick={() => window.dispatchEvent(new CustomEvent("open-enquiry-popup"))} className="rounded-full border border-white/40 bg-white/10 px-3.5 py-2`);
      content = content.replace(/ENQUIRE\s*<\/a>/, 'ENQUIRE</button>');
  }

  fs.writeFileSync(path, content);
}

for(let f of files) fixPage(f);
console.log('done targeting broken files');
