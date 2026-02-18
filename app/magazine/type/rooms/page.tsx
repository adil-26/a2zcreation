import LeadCaptureForm from "../../../components/LeadCaptureForm";
import SiteFooter from "../../../components/SiteFooter";
import SiteHeader from "../../../components/SiteHeader";
import data from "../../../../data/magazine-rooms.json";

export default function MagazineRoomsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <div className="container">
            <p className="eyebrow">{data.hero.eyebrow}</p>
            <h1>{data.hero.title}</h1>
            <p>{data.hero.description}</p>
            <div className="chip-row">
              {data.categories.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="container cards-with-form">
          <div className="cards-grid">
            {data.articles.map((item, index) => (
              <article className="idea-card article-card" key={item.title}>
                <div className={`idea-image idea-image-${(index % 6) + 1}`} />
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
                <a href="#" className="text-link">
                  Read more
                </a>
              </article>
            ))}
          </div>
          <LeadCaptureForm />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
