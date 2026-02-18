import LeadCaptureForm from "../../components/LeadCaptureForm";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import { getCities, getCityBySlug } from "../../../lib/repository";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const rows = await getCities();
  return rows.map((item) => ({ city: item.slug }));
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const cityData = await getCityBySlug(city);
  if (!cityData) notFound();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <div className="container">
            <p className="eyebrow">City Services</p>
            <h1>Interior Designer in {cityData.name}</h1>
            <p>{cityData.coverage}</p>
          </div>
        </section>
        <section className="container cards-with-form">
          <article className="service-detail-card">
            <div className="idea-image idea-image-4" />
            <h2>Local Projects + Local Team</h2>
            <p>
              Our {cityData.name} team handles design consultation, site measurements and project
              execution end-to-end.
            </p>
          </article>
          <LeadCaptureForm />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
