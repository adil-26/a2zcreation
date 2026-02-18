import LeadCaptureForm from "../../components/LeadCaptureForm";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import { getBlogBySlug, getBlogs } from "../../../lib/repository";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((item) => ({ blogSlug: item.slug }));
}

export default async function BlogDetailPage({ params }: { params: Promise<{ blogSlug: string }> }) {
  const { blogSlug } = await params;
  const blog = await getBlogBySlug(blogSlug);
  if (!blog) notFound();
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <div className="container">
            <p className="eyebrow">Blog Article</p>
            <h1>{blog.title}</h1>
            <p>{blog.excerpt}</p>
          </div>
        </section>
        <section className="container cards-with-form">
          <article className="service-detail-card">
            <div className="idea-image idea-image-2" />
            <p>{blog.content}</p>
            <a href="/contact" className="btn">
              Book free consultation
            </a>
          </article>
          <LeadCaptureForm />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
