const fs = require('fs');
const file = '/Users/seetharamgn/Documents/design-delight/src/routes/projects.tsx';

let content = fs.readFileSync(file, 'utf8');

// The issue is that projects.tsx is a route layout right now because of TanStack's file-based routing.
// When we navigate to `/projects/the-clan`, it renders `projects.tsx` as the parent, but `projects.tsx` does NOT have an <Outlet /> so the child (`projects.the-clan.tsx`) never shows up!
// We can just add an `<Outlet />` at the top or replace the content appropriately IF we are on a child route, or we can use useRouter() to conditionally render.

if(!content.includes('import { Outlet, useMatchRoute }')) {
  // If we are currently AT /projects exactly, we render the project portfolio list.
  // If we are deeper (e.g. /projects/the-clan), we ONLY render the Outlet.

  content = content.replace(/import \{ Link, createFileRoute \} from "@tanstack\/react-router";/g, 'import { Link, createFileRoute, Outlet, useMatchRoute } from "@tanstack/react-router";');

  const oldComponent = `function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#1f1d1a] selection:bg-[#c7b08a] selection:text-[#1f1d1a]">
      <ProjectsNavigation />
      <ProjectPortfolio />
      <ContactPanel />
      <SiteFooter />
    </main>
  );
}`;

  const newComponent = `function ProjectsPage() {
  const matchRoute = useMatchRoute();
  const isExactProjects = matchRoute({ to: '/projects' });

  if (!isExactProjects) {
    return <Outlet />;
  }

  return (
    <main className="min-h-screen bg-[#1f1d1a] selection:bg-[#c7b08a] selection:text-[#1f1d1a]">
      <ProjectsNavigation />
      <ProjectPortfolio />
      <ContactPanel />
      <SiteFooter />
    </main>
  );
}`;
  content = content.replace(oldComponent, newComponent);
  fs.writeFileSync(file, content);
  console.log('Fixed projects layout to use Outlet!');
}
