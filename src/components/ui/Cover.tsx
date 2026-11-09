import type { ReactNode } from "react";
import type { CoverKind } from "../../types/content.ts";

export function Cover({ kind, index }: { kind: CoverKind; index: string }) {
  return (
    <div className="relative aspect-[5/4] overflow-hidden border border-line bg-panel" aria-hidden="true">
      <span className="absolute top-4 left-5 font-serif text-4xl font-[520] tracking-tight text-ink/25">
        {index}
      </span>
      <Diagram kind={kind} />
    </div>
  );
}

function Diagram({ kind }: { kind: CoverKind }) {
  if (kind === "bracket") {
    return <BracketDiagram />;
  }
  if (kind === "garden") {
    return <GardenDiagram />;
  }
  if (kind === "monitor") {
    return <MonitorDiagram />;
  }
  if (kind === "e2e") {
    return <E2eDiagram />;
  }
  return <CommercialDiagram />;
}

function Frame({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 360 280" className="h-full w-full" fill="none">
      {children}
    </svg>
  );
}

function BracketDiagram() {
  return (
    <Frame>
      <g className="stroke-ink" strokeWidth="1.25">
        <path d="M198 58H226V88H198" />
        <path d="M226 73H258" />
        <path d="M198 160H226V190H198" />
        <path d="M226 175H258" />
        <path d="M258 73V175" />
        <path d="M258 124H292" />
      </g>
      <rect x="120" y="48" width="78" height="20" className="fill-ink/15" />
      <rect x="120" y="78" width="78" height="20" className="fill-ink/15" />
      <rect x="120" y="150" width="78" height="20" className="fill-ink/15" />
      <rect x="120" y="180" width="78" height="20" className="fill-ink/15" />
      <rect x="292" y="114" width="40" height="20" className="fill-accent" />
    </Frame>
  );
}

function GardenDiagram() {
  return (
    <Frame>
      <g className="stroke-ink" strokeWidth="1.25">
        <rect x="118" y="58" width="52" height="40" />
        <rect x="170" y="58" width="52" height="40" />
        <rect x="222" y="58" width="52" height="40" />
        <rect x="118" y="98" width="52" height="40" />
        <rect x="222" y="98" width="52" height="40" />
        <rect x="118" y="138" width="52" height="40" />
        <rect x="170" y="138" width="52" height="40" />
        <rect x="222" y="138" width="52" height="40" />
      </g>
      <rect x="170" y="98" width="52" height="40" className="fill-accent" />
      <path d="M118 204H274" className="stroke-ink/40" strokeWidth="1.25" />
      <path d="M118 204H196" className="stroke-ink" strokeWidth="1.25" />
    </Frame>
  );
}

function MonitorDiagram() {
  return (
    <Frame>
      <path d="M108 40V220H320" className="stroke-ink" strokeWidth="1.25" />
      <rect x="116" y="56" width="70" height="16" className="fill-ink" />
      <rect x="116" y="84" width="130" height="16" className="fill-ink/70" />
      <rect x="116" y="112" width="54" height="16" className="fill-ink/45" />
      <rect x="116" y="140" width="190" height="16" className="fill-accent" />
      <rect x="116" y="168" width="110" height="16" className="fill-ink/70" />
    </Frame>
  );
}

function E2eDiagram() {
  return (
    <Frame>
      <rect x="108" y="46" width="108" height="176" className="stroke-ink" strokeWidth="1.25" />
      <path d="M120 70h80M120 92h56M120 110h72M120 128h40" className="stroke-ink/70" strokeWidth="1.25" />
      <rect x="120" y="176" width="40" height="16" className="fill-accent" />
      <path d="M220 130H236" className="stroke-accent" strokeWidth="1.25" />
      <path d="M230 124l6 6-6 6" className="stroke-accent" strokeWidth="1.25" />
      <rect x="236" y="70" width="92" height="132" className="stroke-ink" strokeWidth="1.25" />
      <path d="M248 92h64M248 110h72M248 128h40M248 146h68M248 164h48" className="stroke-ink/70" strokeWidth="1.25" />
    </Frame>
  );
}

function CommercialDiagram() {
  return (
    <Frame>
      <rect x="108" y="70" width="160" height="120" className="stroke-ink" strokeWidth="1.25" />
      <path d="M132 130H244" className="stroke-ink" strokeWidth="1.25" />
    </Frame>
  );
}
