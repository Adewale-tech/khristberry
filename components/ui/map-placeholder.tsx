import { MapPin } from "lucide-react"

export default function MapPlaceholder() {
  return (
    <div className="relative w-full h-[400px] bg-slate-100 rounded-lg overflow-hidden border border-border shadow-sm group">
      {/* Mock Map Background - a static pattern or image could go here */}
      <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center opacity-10" />

      {/* Grid lines to look techy/map-like */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-muted-foreground text-sm font-medium bg-background/80 px-4 py-2 rounded-full backdrop-blur">
          Interactive Branch Locator
        </p>
      </div>

      {/* Simulated Pins */}
      <div className="absolute top-1/3 left-1/4 animate-bounce delay-0">
        <MapPin className="h-8 w-8 text-primary drop-shadow-lg fill-primary/20" />
      </div>
      <div className="absolute top-1/2 left-1/2 animate-bounce delay-75">
        <MapPin className="h-8 w-8 text-primary drop-shadow-lg fill-primary/20" />
      </div>
      <div className="absolute bottom-1/3 right-1/4 animate-bounce delay-150">
        <MapPin className="h-8 w-8 text-primary drop-shadow-lg fill-primary/20" />
      </div>
    </div>
  )
}
