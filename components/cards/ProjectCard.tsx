type ProjectCardProps = {
  title: string;
  description: string;
};

export function ProjectCard({ title, description }: ProjectCardProps) {
  return (
    <article className="card-premium flex min-h-[168px] flex-col p-6 group">
      <div className="mb-4 h-10 w-10 shrink-0 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.20), rgba(56,189,248,0.15))' }}>
        <div className="w-3 h-3 rounded-full bg-brand-accent" />
      </div>
      <h3 className="mb-2 mt-0 text-lg font-bold text-white tracking-tight">{title}</h3>
      <p className="m-0 text-sm leading-relaxed text-white/55">{description}</p>
    </article>
  );
}
