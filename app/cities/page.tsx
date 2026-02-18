import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { getCities } from "../../lib/repository";
import { Section } from "../components/ui/Section";
import { Card, CardContent } from "../components/ui/Card";
import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Service Areas | A2Z Creation",
  description: "Find expert interior designers in your city.",
};

export default async function CitiesPage() {
  const cities = await getCities();

  return (
    <>
      <SiteHeader />
      <main className="bg-background min-h-screen">
        <Section className="bg-ink text-white py-16 md:py-24" spacing="none">
          <div className="container mx-auto px-4 text-center space-y-4">
            <p className="font-bold text-brand uppercase tracking-widest text-sm">Locations</p>
            <h1 className="font-fraunces text-4xl md:text-6xl font-bold">We Serve In</h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              Delivering premium interior design services across major cities.
            </p>
          </div>
        </Section>

        <Section>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cities.map((item: any, index: number) => (
              <Card key={item.slug} className="group overflow-hidden border-none shadow-lg hover:shadow-2xl h-full flex flex-col">
                <div className="h-64 bg-gray-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('https://source.unsplash.com/random/800x600?city,${index}')` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="absolute bottom-4 left-6 text-white bg-black/30 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20">
                    <h3 className="text-2xl font-bold font-fraunces">{item.name}</h3>
                  </div>
                </div>
                <CardContent className="p-6 flex flex-col grow">
                  <p className="text-muted mb-4 grow flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand" /> {item.coverage}
                  </p>
                  <Link href={`/cities/${item.slug}`} className="text-brand font-bold inline-flex items-center hover:translate-x-1 transition-transform mt-auto">
                    View City Services <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
