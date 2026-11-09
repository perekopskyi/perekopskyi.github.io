import { site } from "../../data/site.ts";
import { PageContainer } from "./PageContainer.tsx";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <PageContainer className="flex flex-col gap-2 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          {site.name} · {site.role}
        </p>
        <p>
          <time dateTime={String(year)}>{year}</time>
        </p>
      </PageContainer>
    </footer>
  );
}
