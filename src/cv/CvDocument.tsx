import { Document, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { ReactNode } from "react";
import { shippedProjects } from "../data/cv.ts";
import { publishedRoles } from "../data/experience.ts";
import { site } from "../data/site.ts";
import { skillGroups } from "../data/skills.ts";

// Built-in PDF fonts keep the file small and the text extractable by ATS parsers.
const ink = "#1c1915";
const muted = "#5c564c";
const line = "#ddd6c8";
const accent = "#1b4736";

const styles = StyleSheet.create({
  page: {
    paddingTop: 44,
    paddingBottom: 48,
    paddingHorizontal: 48,
    fontFamily: "Helvetica",
    fontSize: 9.5,
    lineHeight: 1.45,
    color: ink,
  },
  name: { fontFamily: "Times-Roman", fontSize: 26, lineHeight: 1.1 },
  role: { marginTop: 4, fontSize: 11, color: muted },
  contacts: { marginTop: 8, flexDirection: "row", flexWrap: "wrap", color: muted },
  contactItem: { marginRight: 12 },
  link: { color: accent, textDecoration: "none" },
  section: { marginTop: 18 },
  sectionTitle: {
    // No letter spacing: spaced capitals extract as "S U M M A R Y" in ATS parsers.
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    color: muted,
    paddingBottom: 4,
    borderBottomWidth: 0.75,
    borderBottomColor: line,
    marginBottom: 8,
  },
  entry: { marginBottom: 10 },
  entryHeader: { flexDirection: "row", justifyContent: "space-between" },
  entryTitle: { fontFamily: "Helvetica-Bold", fontSize: 10.5 },
  entryMeta: { color: muted },
  bullet: { flexDirection: "row", marginTop: 2 },
  bulletMark: { width: 10, color: muted },
  bulletText: { flex: 1 },
  tech: { marginTop: 3, color: muted },
  skillRow: { flexDirection: "row", marginBottom: 3 },
  skillLabel: { width: 120, fontFamily: "Helvetica-Bold" },
  skillItems: { flex: 1 },
});

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function Bullets({ items }: { items: string[] }) {
  return items.map((item) => (
    <View key={item} style={styles.bullet} wrap={false}>
      <Text style={styles.bulletMark}>–</Text>
      <Text style={styles.bulletText}>{item}</Text>
    </View>
  ));
}

function stripScheme(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

/** The CV, rendered from the same src/data files as the site. */
export function CvDocument() {
  const roles = publishedRoles();
  const work = shippedProjects();
  const contacts = [
    site.email ? { label: site.email, href: `mailto:${site.email}` } : null,
    site.linkedin ? { label: stripScheme(site.linkedin), href: site.linkedin } : null,
    { label: stripScheme(site.github), href: site.github },
    { label: stripScheme(site.url), href: site.url },
  ].filter((contact) => contact !== null);

  return (
    <Document
      title={`${site.fullName} — CV`}
      author={site.fullName}
      subject={site.role}
      keywords={skillGroups.flatMap((group) => group.items).join(", ")}
      language="en"
    >
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{site.fullName}</Text>
        <Text style={styles.role}>
          {site.role} · {site.location} · {site.yearsLabel}
        </Text>
        <View style={styles.contacts}>
          {contacts.map((contact) => (
            <Link key={contact.href} src={contact.href} style={[styles.contactItem, styles.link]}>
              {contact.label}
            </Link>
          ))}
        </View>

        <Section title="Summary">
          <Text>
            {site.headline} {site.summary}
          </Text>
        </Section>

        {roles.length > 0 ? (
          <Section title="Experience">
            {roles.map((role) => (
              <View key={role.id} style={styles.entry}>
                <View style={styles.entryHeader} wrap={false}>
                  <Text style={styles.entryTitle}>
                    {role.position} · {role.company}
                  </Text>
                  <Text style={styles.entryMeta}>{role.period}</Text>
                </View>
                {role.description ? <Text>{role.description}</Text> : null}
                <Bullets items={[...role.achievements, ...role.responsibilities]} />
                {role.technologies.length > 0 ? (
                  <Text style={styles.tech}>{role.technologies.join(" · ")}</Text>
                ) : null}
              </View>
            ))}
          </Section>
        ) : null}

        {work.length > 0 ? (
          <Section title="Selected work">
            {work.map((project) => (
              <View key={project.id} style={styles.entry}>
                <View style={styles.entryHeader} wrap={false}>
                  <Text style={styles.entryTitle}>{project.name}</Text>
                  <Text style={styles.entryMeta}>{project.statusLabel}</Text>
                </View>
                <Text>{project.summary}</Text>
                <Bullets items={project.achievements} />
                {project.technologies.length > 0 ? (
                  <Text style={styles.tech}>{project.technologies.join(" · ")}</Text>
                ) : null}
                {project.url ? (
                  <Link src={project.url} style={styles.link}>
                    {stripScheme(project.url)}
                  </Link>
                ) : null}
              </View>
            ))}
          </Section>
        ) : null}

        <Section title="Skills">
          {skillGroups.map((group) => (
            <View key={group.id} style={styles.skillRow} wrap={false}>
              <Text style={styles.skillLabel}>{group.label}</Text>
              <Text style={styles.skillItems}>{group.items.join(", ")}</Text>
            </View>
          ))}
        </Section>

      </Page>
    </Document>
  );
}
