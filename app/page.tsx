import Hero from "@/components/home/hero";
import Features from "@/components/home/features";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <Features />

      {/* Testimonials Section */}
      <section className="bg-background py-20">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold mb-12 text-foreground">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Chinedu O.", text: "The Suya Pizza at the Bwari branch is literally out of this world. Highly recommend!", role: "Law Student" },
              { name: "Sarah M.", text: "Best Chinese food in the area. The Chow Mein tastes just like what I had in London.", role: "Resident" },
              { name: "Emmanuel K.", text: "Perfect spot for our weekend meetings. The coffee and meat pies are top notch.", role: "Business Consultant" }
            ].map((t, i) => (
              <div key={i} className="p-8 rounded-2xl bg-muted/30 border border-border/50 hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-4 text-secondary text-2xl">★★★★★</div>
                <p className="text-muted-foreground mb-6 italic">"{t.text}"</p>
                <div>
                  <div className="font-bold text-foreground">{t.name}</div>
                  <div className="text-xs text-primary font-medium uppercase tracking-wide">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
