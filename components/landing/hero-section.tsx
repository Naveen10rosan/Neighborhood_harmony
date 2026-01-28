import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MapPin, Users, CheckCircle } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20 md:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tagline badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Building better neighborhoods together
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 text-balance">
            Report. Track. Resolve.
            <span className="block text-primary mt-2">Together.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty">
            Neighborhood Harmony connects residents, volunteers, and local authorities 
            to keep our community clean, safe, and beautiful. Report issues, volunteer 
            for events, and make a real difference.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button size="lg" asChild className="w-full sm:w-auto text-base px-8">
              <Link href="/signup">Join Your Community</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto text-base px-8 bg-transparent">
              <Link href="#how-it-works">See How It Works</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-foreground">2,500+</div>
              <div className="text-sm text-muted-foreground">Issues Reported</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-foreground">1,800+</div>
              <div className="text-sm text-muted-foreground">Issues Resolved</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-foreground">5,000+</div>
              <div className="text-sm text-muted-foreground">Active Members</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
