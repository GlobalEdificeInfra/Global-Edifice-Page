const fs = require('fs');

const file = '/Users/seetharamgn/Documents/design-delight/src/components/global-overlay.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('geLogoGold')) {
  content = content.replace(/import \{ X, Phone \} from "lucide-react";/, 'import { X, Phone } from "lucide-react";\nimport geLogoGold from "@/assets/shared/ge-logo-gold.png";');
}

content = content.replace('bg-[#0d2a1f]', 'bg-[#0f4157]');

const oldLogoSection = `{/* Logo representation */}
          <div className="flex flex-col items-center mb-4">
            <div className="flex items-end text-[#daba81]">
              <span className="font-serif italic text-2xl mr-1 leading-none shadow-text text-shadow-sm">The</span>
              <span className="font-sans font-medium text-4xl tracking-tight leading-none">CLAN</span>
            </div>
            <div className="text-[#daba81] text-[0.45rem] tracking-[0.2em] mt-1 font-bold uppercase">
              Community is the new luxury
            </div>
          </div>`;

const newLogoSection = `{/* Logo representation */}
          <div className="flex flex-col items-center mb-5">
            <img src={geLogoGold} alt="Global Edifice" className="w-[140px] md:w-[160px]" />
          </div>`;

content = content.replace(oldLogoSection, newLogoSection);

// Fix button text color to match new bg
content = content.replace('text-[#0d2a1f]', 'text-[#0f4157]');

fs.writeFileSync(file, content);
console.log('done');
