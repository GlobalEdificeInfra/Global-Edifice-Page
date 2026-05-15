const fs = require('fs');
const file = '/Users/seetharamgn/Documents/design-delight/src/components/global-overlay.tsx';
let content = fs.readFileSync(file, 'utf8');

const oldFab = `      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 left-6 z-40">
        <a
          href="tel:+918043760152"
          className="flex items-center gap-3 rounded-full bg-[#0a203b] py-2.5 px-4 text-white shadow-lg transition hover:scale-105"
        >
          <Phone className="h-[1.1rem] w-[1.1rem]" />
          <span className="text-[0.95rem] font-medium pr-1">Call us</span>
        </a>
      </div>`;

const newFab = `      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 left-6 z-40">
        <a
          href="tel:+918065480222"
          className="group flex items-center rounded-full bg-[#0a203b] p-3 text-white shadow-lg transition-all duration-300"
        >
          <Phone className="h-[1.2rem] w-[1.2rem]" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-[0.95rem] font-medium opacity-0 transition-all duration-300 group-hover:ml-3 group-hover:max-w-[100px] group-hover:opacity-100 group-hover:pr-1">Call us</span>
        </a>
      </div>`;

content = content.replace(oldFab, newFab);
fs.writeFileSync(file, content);
console.log('done fixed call fab');
