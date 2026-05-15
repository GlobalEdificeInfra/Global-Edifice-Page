const fs = require('fs');
const glob = require('fs').promises.readdir;
// A script to read all route files and see what their menus look like.
(async () => {
  const dir = '/Users/seetharamgn/Documents/design-delight/src/routes/';
  const files = await require('fs/promises').readdir(dir);
  for (let f of files) {
    if (f.endsWith('.tsx')) {
        const c = fs.readFileSync(dir + f, 'utf8');
        const match = c.match(/const [a-zA-Z]+Nav.*?\[([\s\S]*?)\] as const;/);
        const match2 = c.match(/const navLinks.*?\[([\s\S]*?)\];/);
        
        if (match) console.log(f, match[1]);
        if (match2) console.log(f, match2[1]);
    }
  }
})();
