import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Download } from "lucide-react";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  /** Marks a same-origin file link as a download. */
  download?: boolean;
}

export function Button({ href, children, variant = "primary", download = false }: ButtonProps) {
  const external = href.startsWith("http");
  const styles =
    variant === "primary"
      ? "bg-ink px-5 text-paper hover:bg-accent"
      : "px-1 text-ink underline decoration-line underline-offset-[6px] hover:decoration-ink";

  return (
    <a
      href={href}
      className={`inline-flex min-h-11 items-center gap-2 text-sm ${styles}`}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      {...(download ? { download: "" } : {})}
    >
      {children}
      {download ? (
        <Download className="size-4" aria-hidden="true" />
      ) : external ? (
        <ArrowUpRight className="size-4" aria-hidden="true" />
      ) : (
        <ArrowRight className="size-4" aria-hidden="true" />
      )}
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}
