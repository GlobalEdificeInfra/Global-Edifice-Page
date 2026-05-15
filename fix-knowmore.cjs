const fs = require('fs');

const files = [
  '/Users/seetharamgn/Documents/design-delight/src/routes/index.tsx',
  '/Users/seetharamgn/Documents/design-delight/src/routes/projects.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // Find the 'Know More' link which is an anchor tag.
  // In index.tsx: href={project.detailHref} ... > Know More </a>
  // In projects.tsx: href={project.detailHref ?? "#contact"} ... > Know More </a>

  content = content.replace(
      /<a\s+href=\{project\.detailHref( \?\? "#contact")?\}\n?\s+className="(.*?)"(.*?)>\s*Know More\s*<\/a>/gs,
      (match, p1, p2, p3) => {
        return `<Link to={project.detailHref as any} className="${p2}"${p3}>Know More</Link>`;
      }
  );

  if(!content.includes('import { Link }') && !content.includes('import { Link,')) {
     content = content.replace(/import \{ createFileRoute \}/, 'import { createFileRoute, Link }');
  } else if (!content.includes('Link') && content.includes('@tanstack/react-router')) {
     content = content.replace(/\} from '@tanstack\/react-router'/, ', Link } from "@tanstack/react-router"');
  }

  fs.writeFileSync(file, content);
}
console.log('done fixing know more');
