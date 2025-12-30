import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Utensils, CalendarDays, Coffee } from "lucide-react"

export default function Features() {
  const features = [
    {
      title: "Law School Nights",
      description: "Exclusive discounts and study combos for Bwari Law School students every Friday.",
      icon: <Utensils className="w-10 h-10 text-secondary" />,
      bg: "bg-[#004d40]" // Deep Emerald
    },
    {
      title: "Business Power Lunch",
      description: "Quick, premium 3-course meals for professionals in Kogo and Bwari.",
      icon: <Coffee className="w-10 h-10 text-secondary" />,
      bg: "bg-[#011f11]" // Very Dark Green
    },
    {
      title: "Weekend Family Feast",
      description: "Large pizza deals and chinese buffet platters perfect for family gatherings.",
      icon: <CalendarDays className="w-10 h-10 text-secondary" />,
      bg: "bg-[#004d40]"
    }
  ]

  return (
    <section className="py-20 bg-muted/20">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Experience Krisberry</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            More than just food. We create moments worth sharing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <Card key={idx} className={`${feature.bg} border-none text-white shadow-xl overflow-hidden group relative`}>
              <CardContent className="p-8 h-full flex flex-col justify-between min-h-[300px]">
                <div>
                  <div className="mb-6 p-3 bg-white/10 w-fit rounded-2xl backdrop-blur-sm">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-white/80 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-2 text-secondary font-medium group-hover:gap-4 transition-all cursor-pointer">
                  Learn More <ArrowRight className="w-4 h-4" />
                </div>

                {/* Decorative circle */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
