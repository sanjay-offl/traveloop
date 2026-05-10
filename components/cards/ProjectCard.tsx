type ProjectCardProps = {
  title: string;
  description: string;
};

export function ProjectCard({ title, description }: ProjectCardProps) {
  return (
    <article className="section-card flex min-h-[168px] flex-col rounded-3xl p-5">
      <div className="mb-4 h-10 w-10 shrink-0 rounded-[14px] bg-brand-cyan-dim ring-1 ring-brand-cyan/30" />
      <h3 className="mb-2 mt-0 text-lg font-semibold text-white">{title}</h3>
      <p className="m-0 text-sm leading-relaxed text-white/65">{description}</p>
    </article>
  );
}
