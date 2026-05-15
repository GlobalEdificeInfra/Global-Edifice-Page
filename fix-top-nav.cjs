const fs = require('fs');
const dir = '/Users/seetharamgn/Documents/design-delight/src/routes/';
const files = fs.readdirSync(dir);

for (let f of files) {
  if (f.endsWith('.tsx')) {
    let text = fs.readFileSync(dir + f, 'utf8');

    // Make sure we have the correct ENQUIRE button
    text = text.replace(/<a\s+href="\/#contact"\s+className="rounded-full bg-\[\#b49a6c\] px-5 py-2 text-white transition hover:bg-\[\#9f8658\]"\s*>\s*ENQUIRE\s*<\/a>/g, '<button onClick={() => window.dispatchEvent(new CustomEvent("open-enquiry-popup"))} className="rounded-full bg-[#b49a6c] px-5 py-2 text-white transition hover:bg-[#9f8658]">ENQUIRE</button>');
    text = text.replace(/<a\s+href="#contact"\s+className="rounded-full bg-\[\#b49a6c\] px-5 py-2 text-white transition hover:bg-\[\#9f8658\]"\s*>\s*ENQUIRE\s*<\/a>/g, '<button onClick={() => window.dispatchEvent(new CustomEvent("open-enquiry-popup"))} className="rounded-full bg-[#b49a6c] px-5 py-2 text-white transition hover:bg-[#9f8658]">ENQUIRE</button>');
    
    // Replace telephone anchor blocks that might look different
    const telRegex = /<a[^>]+href="tel:\+918065480222"[^>]*>[\s\S]*?<\/a>/g;
    
    text = text.replace(telRegex, `<a href="tel:+918065480222" className="hidden sm:inline-flex items-center gap-1.5 transition text-[#996317] hover:text-[#123a4c] mx-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone h-[1.1rem] w-[1.1rem]"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg><span className="font-semibold tracking-[0.05em]">+91 806 548 0222</span></a>`);

    fs.writeFileSync(dir + f, text);
  }
}
console.log('done unifying top nav numbers');
