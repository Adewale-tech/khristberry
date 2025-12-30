import Hero from "@/components/home/hero";
import BranchLocator from "@/components/home/branch-locator";

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <Hero />
      <BranchLocator />

      {/* Testimonials or Highlights could go here */}
      <section className="bg-muted/30 py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-background shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Fresh Ingredients</h3>
              <p className="text-muted-foreground">We source only the finest, freshest ingredients for our dishes.</p>
            </div>
            <div className="p-6 rounded-lg bg-background shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Expert Chefs</h3>
              <p className="text-muted-foreground">Our culinary team brings years of experience and passion.</p>
            </div>
            <div className="p-6 rounded-lg bg-background shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Atmosphere</h3>
              <p className="text-muted-foreground">Designed for comfort and style, perfect for any occasion.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
