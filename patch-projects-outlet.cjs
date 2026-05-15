const fs = require('fs');
const file = '/Users/seetharamgn/Documents/design-delight/src/routes/projects.tsx';
let content = fs.readFileSync(file, 'utf8');

const oldComp = `function ProjectsPage() {
  useProjectsMetadata();

  return (
    <>
      <main className="bg-[#f7f2eb] text-[#163849]">
        <ProjectsNavigation />
        <ProjectsHero />
        <ProjectPortfolio />
        <ContactPanel />
      </main>
      <SiteFooter />
    </>
  );
}`;

const newComp = `function ProjectsPage() {
  useProjectsMetadata();

  const matchRoute = useMatchRoute();
  const isExactProjects = matchRoute({ to: '/projects' });
  
  if (!isExactProjects) {
    return <Outlet />;
  }

  return (
    <>
      <main className="bg-[#f7f2eb] text-[#163849]">
        <ProjectsNavigation />
        <ProjectsHero />
        <ProjectPortfolio />
        <ContactPanel />
      </main>
      <SiteFooter />
    </>
  );
}`;

content = content.replace(oldComp, newComp);
fs.writeFileSync(file, content);
console.log('patched real bottom component');
