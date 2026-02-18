import LeadCaptureForm from "../../components/LeadCaptureForm";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import { getDesignIdeasByRoom } from "../../../lib/repository";
import { notFound } from "next/navigation";

const rooms = ["kitchen", "bedroom", "living-room"];

export function generateStaticParams() {
  return rooms.map((room) => ({ room }));
}

export default async function DesignIdeasRoomPage({ params }: { params: Promise<{ room: string }> }) {
  const { room } = await params;
  const data = await getDesignIdeasByRoom(room);
  if (!data) notFound();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <div className="container">
            <p className="eyebrow">Design Ideas</p>
            <h1>{room.replace("-", " ")} inspirations</h1>
            <p>Filter by style, budget and size to find the right design for your project.</p>
          </div>
        </section>
        <section className="container cards-with-form">
          <div className="cards-grid">
            {data.items.map((item: { title: string; style: string; budget: string }, index: number) => (
              <article className="idea-card" key={item.title}>
                <div className={`idea-image idea-image-${(index % 6) + 1}`} />
                <h3>{item.title}</h3>
                <p>{item.style}</p>
                <strong>{item.budget}</strong>
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
