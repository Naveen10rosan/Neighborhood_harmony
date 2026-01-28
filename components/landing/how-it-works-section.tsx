import { FileText, Search, Wrench, PartyPopper } from 'lucide-react'

const steps = [
  {
    icon: FileText,
    step: '01',
    title: 'Report an Issue',
    description: 'Spot a pothole, broken light, or graffiti? Take a photo, add details, and submit your report in seconds.',
  },
  {
    icon: Search,
    step: '02',
    title: 'Track Progress',
    description: 'Your report is sent to the right department. Watch real-time updates as it moves from reported to resolved.',
  },
  {
    icon: Wrench,
    step: '03',
    title: 'Get Involved',
    description: 'Join volunteer events, help resolve issues in your area, or organize your own community improvement project.',
  },
  {
    icon: PartyPopper,
    step: '04',
    title: 'Celebrate Together',
    description: 'Earn points and badges for your contributions. See the impact you and your neighbors are making.',
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            How Neighborhood Harmony Works
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Making your community better is as easy as 1-2-3-4. Here is how you can 
            start making a difference today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-border" />
              )}
              
              <div className="relative flex flex-col items-center text-center">
                {/* Step number badge */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center z-10">
                  {step.step}
                </div>
                
                {/* Icon */}
                <div className="flex items-center justify-center w-24 h-24 rounded-full bg-muted border-2 border-border mb-6">
                  <step.icon className="w-10 h-10 text-primary" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
