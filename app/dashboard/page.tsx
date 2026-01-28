'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useApp } from '@/lib/app-context'
import { IssueMap } from '@/components/dashboard/issue-map'
import { CATEGORY_CONFIG, STATUS_CONFIG } from '@/lib/types'
import { PlusCircle, MapPin, Calendar, ArrowRight, TrendingUp } from 'lucide-react'

export default function DashboardPage() {
  const { user, issues, events } = useApp()

  const myReports = issues.filter(i => i.reporterId === user?.id)
  const nearbyIssues = issues.filter(i => i.status !== 'resolved').slice(0, 5)
  const upcomingEvents = events
    .filter(e => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3)

  const stats = {
    totalReports: myReports.length,
    resolved: myReports.filter(i => i.status === 'resolved').length,
    inProgress: myReports.filter(i => i.status === 'in-progress').length,
    points: user?.points || 0,
  }

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back, {user?.name?.split(' ')[0] || 'Neighbor'}!
          </h1>
          <p className="text-muted-foreground">Here is what is happening in your community</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/report">
            <PlusCircle className="mr-2 h-4 w-4" />
            Report Issue
          </Link>
        </Button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{stats.totalReports}</div>
                <div className="text-sm text-muted-foreground">My Reports</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-green-500/10">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{stats.resolved}</div>
                <div className="text-sm text-muted-foreground">Resolved</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <Calendar className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{stats.inProgress}</div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-accent/10">
                <TrendingUp className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{stats.points}</div>
                <div className="text-sm text-muted-foreground">Points</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Map section */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Community Issues Map</CardTitle>
              <CardDescription>View and track issues in your area</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/issues">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <IssueMap issues={issues} className="h-[400px] rounded-lg" />
        </CardContent>
      </Card>

      {/* Bottom grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Nearby issues */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Nearby Issues</CardTitle>
                <CardDescription>Recent reports in your area</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/issues">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nearbyIssues.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-8">
                  No nearby issues reported
                </p>
              ) : (
                nearbyIssues.map(issue => (
                  <Link
                    key={issue.id}
                    href={`/dashboard/issues/${issue.id}`}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div
                      className={`w-3 h-3 rounded-full mt-1.5 ${CATEGORY_CONFIG[issue.category].color}`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground truncate">{issue.title}</div>
                      <div className="text-sm text-muted-foreground truncate">
                        {issue.location.address}
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className={`${STATUS_CONFIG[issue.status].color} text-white shrink-0`}
                    >
                      {STATUS_CONFIG[issue.status].label}
                    </Badge>
                  </Link>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming events */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Volunteer opportunities near you</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/events">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-8">
                  No upcoming events
                </p>
              ) : (
                upcomingEvents.map(event => (
                  <Link
                    key={event.id}
                    href={`/dashboard/events/${event.id}`}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex flex-col items-center justify-center text-primary shrink-0">
                      <div className="text-xs font-medium uppercase">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                      <div className="text-lg font-bold leading-none">
                        {new Date(event.date).getDate()}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground truncate">{event.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {event.startTime} - {event.endTime}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {event.participants.length}/{event.maxParticipants} volunteers
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
