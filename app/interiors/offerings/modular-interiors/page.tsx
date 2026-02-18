import LeadCaptureForm from "../../../components/LeadCaptureForm";
import SiteFooter from "../../../components/SiteFooter";
import SiteHeader from "../../../components/SiteHeader";
import data from "../../../../data/modular-interiors.json";

export default function ModularInteriorsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <div className="container">
            <p className="eyebrow">{data.hero.eyebrow}</p>
            <h1>{data.hero.title}</h1>
            <p>{data.hero.description}</p>
          </div>
        </section>

        <section className="container cards-with-form">
          <div>
            <div className="section-head">
              <h2>Why choose modular interiors</h2>
            </div>
            <div className="highlight-grid">
              {data.highlights.map((item) => (
                <article key={item}>
                  <span>v</span>
                  <p>{item}</p>
                </article>
              ))}
            </div>

            <div className="section-head section-gap">
              <h2>Packages</h2>
            </div>
            <div className="package-grid">
              {data.packages.map((item, index) => (
                <article className="package-card" key={item.name}>
                  <div className={`idea-image idea-image-${(index % 6) + 1}`} />
                  <h3>{item.name}</h3>
                  <strong>{item.price}</strong>
                  <p>{item.features}</p>
                </article>
              ))}
            </div>
          </div>
          <LeadCaptureForm />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
