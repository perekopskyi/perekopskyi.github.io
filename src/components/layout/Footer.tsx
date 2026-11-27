import { site } from "../../data/site.ts";
import { PageContainer } from "./PageContainer.tsx";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <PageContainer className="flex flex-col gap-2 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          {site.fullName} · {site.role}
        </p>
        <p className="flex items-center gap-4">
          <a
            href={site.sourceUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex min-h-11 items-center underline decoration-line underline-offset-4 hover:decoration-ink"
          >
            Source of this site
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <time dateTime={String(year)}>{year}</time>
        </p>
      </PageContainer>
    </footer>
  );
}
