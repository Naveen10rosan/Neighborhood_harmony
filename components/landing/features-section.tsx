import { Card, CardContent } from '@/components/ui/card'
import { 
  MapPin, 
  Bell, 
  MessageSquare, 
  Calendar, 
  BookOpen, 
  Trophy,
  Camera,
  Users
} from 'lucide-react'

const features = [
  {
    icon: MapPin,
    title: 'Easy Issue Reporting',
    description: 'Report community issues with photos, location, and detailed descriptions. Categorize by type and priority.',
  },
  {
    icon: Bell,
    title: 'Real-Time Tracking',
    description: 'Get instant notifications when your reported issues are acknowledged, in progress, or resolved.',
  },
  {
    icon: MessageSquare,
    title: 'Community Communication',
    description: 'Chat with neighbors and local authorities. Comment on issues and collaborate on solutions.',
  },
  {
    icon: Calendar,
    title: 'Volunteer Events',
    description: 'Discover and join local cleanup events, repair workshops, and community improvement projects.',
  },
  {
    icon: BookOpen,
    title: 'Educational Resources',
    description: 'Access guides on effective reporting, volunteer safety, and community best practices.',
  },
  {
    icon: Trophy,
    title: 'Rewards & Recognition',
    description: 'Earn points and badges for your contributions. Climb the leaderboard and get recognized.',
  },
  {
    icon: Camera,
    title: 'Photo Documentation',
    description: 'Capture and upload photos directly from your device to document issues clearly.',
  },
  {
    icon: Users,
    title: 'Authority Dashboard',
    description: 'Local authorities get a dedicated dashboard to manage and respond to community reports.',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Everything You Need for a Better Neighborhood
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            From reporting issues to organizing events, Neighborhood Harmony provides 
            all the tools to make community maintenance collaborative and rewarding.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-border/50 bg-card hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
