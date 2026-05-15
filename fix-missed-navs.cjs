const fs = require('fs');

const phoneSvg = `<a href="tel:+918065480222" className="hidden sm:inline-flex items-center gap-1.5 transition text-[#996317] hover:text-[#123a4c] mx-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone h-[1.1rem] w-[1.1rem]"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg><span className="font-semibold tracking-[0.05em]">+91 806 548 0222</span></a>`;

const files = [
  '/Users/seetharamgn/Documents/design-delight/src/routes/projects.the-clan.tsx',
  '/Users/seetharamgn/Documents/design-delight/src/routes/about.tsx'
];

for(const p of files) {
  let content = fs.readFileSync(p, 'utf8');

  // Replace Desktop Link
  content = content.replace(
      /<Link\s*to="[^"]*"\s*hash="contact"\s*className="rounded-full bg-\[\#b49a6c\] px-4 py-1\.5 text-white transition hover:bg-\[\#9f8658\]"\s*>\s*ENQUIRE\s*<\/Link>/s,
      `${phoneSvg}\n            <button onClick={() => window.dispatchEvent(new CustomEvent("open-enquiry-popup"))} className="rounded-full bg-[#b49a6c] px-4 py-1.5 text-white transition hover:bg-[#9f8658]">\n              ENQUIRE\n            </button>`
  );
  
  // Sometimes about section uses px-5 for padding
  content = content.replace(
      /<Link\s*to="[^"]*"\s*hash="contact"\s*className="rounded-full bg-\[\#b49a6c\] px-5 py-2 text-white transition hover:bg-\[\#9f8658\]"\s*>\s*ENQUIRE\s*<\/Link>/s,
      `${phoneSvg}\n            <button onClick={() => window.dispatchEvent(new CustomEvent("open-enquiry-popup"))} className="rounded-full bg-[#b49a6c] px-5 py-2 text-white transition hover:bg-[#9f8658]">\n              ENQUIRE\n            </button>`
  );

  // Replace Mobile Link
  const mobExp = /<Link\s*to="[^"]*"\s*hash="contact"\s*className="rounded-full border border-white\/40 bg-white\/10 px-3\.5 py-2 text-\[0\.68rem\] tracking-\[0\.16em\] text-white backdrop-blur sm:px-4 sm:text-\[0\.74rem\]"\s*>\s*ENQUIRE\s*<\/Link>/s;
  
  content = content.replace(
      mobExp,
      `<button onClick={() => window.dispatchEvent(new CustomEvent("open-enquiry-popup"))} className="rounded-full border border-white/40 bg-white/10 px-3.5 py-2 text-[0.68rem] tracking-[0.16em] text-white backdrop-blur sm:px-4 sm:text-[0.74rem]">\n            ENQUIRE\n          </button>`
  );

  fs.writeFileSync(p, content);
}
console.log("Done fixing missed TSX");
