const fs = require('fs');

const file = '/Users/seetharamgn/Documents/design-delight/src/components/site-resource-menu.tsx';
let content = fs.readFileSync(file, 'utf8');

// The Clan might have a casing mismatch in the routeTree vs what's in the menu. 
// TanStack router paths are lowercase.
// "ALL PROJECTS" to "/projects" is fine, but they might not be redirecting if the Dropdown isn't properly wrapping a Link component or onClick is missing.

content = content.replace(/import \{ Link \} from "@tanstack\/react-router";/g, 'import { Link, useNavigate } from "@tanstack/react-router";');

const oldDropdown = `        {links.map((item) => (
          <DropdownMenuItem
            key={item.to}
            asChild
            className="rounded-[0.85rem] px-3 py-3 focus:bg-[#f6efe3] focus:text-[#173748]"
          >
            <Link
              to={item.to}
              className="block w-full whitespace-normal text-[0.78rem] font-medium uppercase tracking-[0.14em] text-[#173748]"
            >
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}`;

const newDropdown = `        {links.map((item) => (
          <DropdownMenuItem
            key={item.to}
            className="rounded-[0.85rem] px-3 py-3 focus:bg-[#f6efe3] focus:text-[#173748] cursor-pointer"
          >
            <Link
              to={item.to}
              className="block w-full whitespace-normal text-[0.78rem] font-medium uppercase tracking-[0.14em] text-[#173748]"
            >
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}`;

content = content.replace(oldDropdown, newDropdown);

fs.writeFileSync(file, content);
console.log('done fixing dropdown');
