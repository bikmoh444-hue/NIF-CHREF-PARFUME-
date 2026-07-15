export default function SectionTitle({ label, title, copy }: { label?: string; title: string; copy?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {label && <p className="luxury-label">{label}</p>}
      <h2 className="mt-2 font-serif text-3xl text-ink md:text-4xl">{title}</h2>
      {copy && <p className="mt-4 text-sm leading-7 text-muted">{copy}</p>}
      <div className="separator mt-6">◆</div>
    </div>
  );
}
