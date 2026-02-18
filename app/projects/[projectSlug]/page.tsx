import LeadCaptureForm from "../../components/LeadCaptureForm";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import { getProjectBySlug, getProjects } from "../../../lib/repository";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((item) => ({ projectSlug: item.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ projectSlug: string }> }) {
  const { projectSlug } = await params;
  const project = await getProjectBySlug(projectSlug);
  if (!project) notFound();
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <div className="container">
            <p className="eyebrow">Project Case Study</p>
            <h1>{project.title}</h1>
            <p>
              {project.city} | {project.area} | Budget {project.budget}
            </p>
          </div>
        </section>
        <section className="container cards-with-form">
          <article className="service-detail-card">
            <div className="idea-image idea-image-1" />
            <h2>Client Feedback</h2>
            <p>{project.testimonial}</p>
          </article>
          <LeadCaptureForm />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
