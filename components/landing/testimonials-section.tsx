import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    quote: 'I reported a broken streetlight and it was fixed within a week. The tracking feature kept me informed every step of the way. Amazing!',
    name: 'Sarah Chen',
    role: 'Resident for 5 years',
    initials: 'SC',
  },
  {
    quote: 'As a volunteer coordinator, this platform has transformed how we organize community cleanups. Sign-ups are up 300%!',
    name: 'Marcus Thompson',
    role: 'Volunteer Leader',
    initials: 'MT',
  },
  {
    quote: 'The gamification aspect really motivates people. My kids love earning badges for helping keep our neighborhood clean.',
    name: 'Elena Rodriguez',
    role: 'Parent & Active Member',
    initials: 'ER',
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Loved by Communities Everywhere
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            See what residents, volunteers, and local officials are saying about 
            how Neighborhood Harmony is transforming their communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border/50 bg-card">
              <CardContent className="pt-6">
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                <p className="text-foreground mb-6 text-pretty leading-relaxed">
                  {`"${testimonial.quote}"`}
                </p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
