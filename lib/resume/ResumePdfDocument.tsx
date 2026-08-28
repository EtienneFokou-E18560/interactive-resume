import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import type { ResumeDocument } from "@/lib/resume/types";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#111",
  },
  header: {
    marginBottom: 14,
  },
  nameBlock: {
    marginBottom: 6,
  },
  name: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    lineHeight: 1.2,
  },
  titleBlock: {
    marginBottom: 8,
  },
  title: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    lineHeight: 1.3,
    color: "#333",
  },
  contactRow: {
    fontSize: 9,
    color: "#444",
    marginBottom: 3,
    lineHeight: 1.4,
  },
  link: {
    color: "#1a1a1a",
    textDecoration: "none",
  },
  section: {
    marginTop: 10,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 3,
    marginBottom: 6,
  },
  bodyText: {
    fontSize: 10,
    color: "#222",
    lineHeight: 1.5,
  },
  jobBlock: {
    marginBottom: 10,
  },
  jobTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    lineHeight: 1.3,
    marginBottom: 2,
  },
  jobMeta: {
    fontSize: 9,
    color: "#555",
    lineHeight: 1.4,
    marginBottom: 4,
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 4,
    paddingLeft: 8,
    paddingRight: 4,
  },
  bulletDot: {
    width: 10,
    fontSize: 9,
    lineHeight: 1.5,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.5,
  },
  projectBlock: {
    marginBottom: 8,
  },
  projectTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    lineHeight: 1.3,
    marginBottom: 3,
  },
  skillBlock: {
    marginBottom: 5,
  },
  skillLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    lineHeight: 1.3,
    marginBottom: 2,
  },
  skillValues: {
    fontSize: 9,
    lineHeight: 1.5,
    color: "#333",
  },
});

function BulletList({ items }: { items: string[] }) {
  return (
    <>
      {items.map((item) => (
        <View key={item.slice(0, 48)} style={styles.bullet} wrap={false}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </>
  );
}

export function ResumePdfDocument({ data }: { data: ResumeDocument }) {
  const { contact } = data;

  return (
    <Document title={`${contact.name} - ${data.targetTitle}`}>
      <Page size="LETTER" style={styles.page} wrap>
        <View style={styles.header} wrap={false}>
          <View style={styles.nameBlock}>
            <Text style={styles.name}>{contact.name}</Text>
          </View>
          <View style={styles.titleBlock}>
            <Text style={styles.title}>{data.targetTitle}</Text>
          </View>
          <Text style={styles.contactRow}>
            {contact.location}, {contact.phone}
          </Text>
          <Text style={styles.contactRow}>{contact.email}</Text>
          <Text style={styles.contactRow}>
            <Link src={contact.linkedin} style={styles.link}>
              LinkedIn
            </Link>
            {", "}
            <Link src={contact.github} style={styles.link}>
              GitHub
            </Link>
            {", "}
            <Link src={contact.portfolio} style={styles.link}>
              Portfolio
            </Link>
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.bodyText}>{data.summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {data.experience.map((job) => (
            <View key={job.company} style={styles.jobBlock} wrap={false}>
              <Text style={styles.jobTitle}>
                {job.role} - {job.company}
              </Text>
              <Text style={styles.jobMeta}>
                {job.start} - {job.end}
                {job.location ? `, ${job.location}` : ""}
              </Text>
              <BulletList items={job.bullets} />
            </View>
          ))}
        </View>

        {data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Selected Projects</Text>
            {data.projects.map((project) => (
              <View key={project.title} style={styles.projectBlock} wrap={false}>
                <Text style={styles.projectTitle}>{project.title}</Text>
                <Text style={styles.bodyText}>{project.description}</Text>
                <BulletList items={project.highlights} />
              </View>
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          {data.skills.map((group) => (
            <View key={group.name} style={styles.skillBlock} wrap={false}>
              <Text style={styles.skillLabel}>{group.name}</Text>
              <Text style={styles.skillValues}>{group.skills.join(", ")}</Text>
            </View>
          ))}
        </View>

        {data.education.length > 0 && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu) => (
              <Text key={edu.school} style={styles.bodyText}>
                {edu.degree} in {edu.field} - {edu.school} ({edu.end})
              </Text>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
