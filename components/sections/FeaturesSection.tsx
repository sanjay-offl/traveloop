import { ProjectCard } from '../cards/ProjectCard';

const experiences = [
  {
    title: 'Curated routes',
    description: 'Showcase destination collections and itinerary highlights with a polished card layout.',
  },
  {
    title: 'Travel stories',
    description: 'Share guides, recap posts, and editorial content in a section built for reading.',
  },
  {
    title: 'Simple conversion',
    description: 'Place clear calls to action where users can book, contact, or learn more.',
  },
];

export function Features() {
  return (
    <section id="experiences" className="mb-6 scroll-mt-28">
      <div className="mb-8 grid gap-4">
        <p className="m-0 text-xs uppercase tracking-[0.18em] text-[var(--accent-2)]">Experience blocks</p>
        <h2
          id="stories"
          className="m-0 max-w-2xl font-serif text-[clamp(1.85rem,3.2vw,2.85rem)] font-semibold leading-tight text-white"
        >
          A flexible structure for a travel brand.
        </h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {experiences.map((item) => (
          <ProjectCard key={item.title} title={item.title} description={item.description} />
        ))}
      </div>
    </section>
  );
}
