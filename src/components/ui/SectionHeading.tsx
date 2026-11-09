interface SectionHeadingProps {
  index: string;
  title: string;
  lede?: string;
}

export function SectionHeading({ index, title, lede }: SectionHeadingProps) {
  return (
    <div className="mb-12 grid gap-3 md:mb-16 md:grid-cols-12">
      <p className="text-xs tracking-[0.18em] text-muted uppercase md:col-span-2">{index}</p>
      <div className="md:col-span-10">
        <h2 className="font-serif text-[clamp(2.25rem,4vw,3.5rem)] leading-none font-[520] tracking-[-0.03em] text-balance text-ink">
          {title}
        </h2>
        {lede ? <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-muted">{lede}</p> : null}
      </div>
    </div>
  );
}
