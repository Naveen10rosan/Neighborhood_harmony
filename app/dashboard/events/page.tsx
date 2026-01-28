'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useApp } from '@/lib/app-context'
import { cn } from '@/lib/utils'
import { PlusCircle, Search, Calendar, MapPin, Users, Clock } from 'lucide-react'

const categoryColors: Record<string, string> = {
  cleanup: 'bg-emerald-500',
  repair: 'bg-amber-500',
  gardening: 'bg-green-600',
  other: 'bg-slate-500',
}

const categoryLabels: Record<string, string> = {
  cleanup: 'Cleanup',
  repair: 'Repair',
  gardening: 'Gardening',
  other: 'Other',
}

export default function EventsPage() {
  const { events, user } = useApp()
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'my'>('upcoming')

  const now = new Date()

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase()) ||
      event.location.address.toLowerCase().includes(search.toLowerCase())
    
    const eventDate = new Date(event.date)
    const isUpcoming = eventDate >= now
    const isPast = eventDate < now
    const isMine = event.organizerId === user?.id || event.participants.some(p => p.userId === user?.id)

    if (activeTab === 'upcoming') return matchesSearch && isUpcoming
    if (activeTab === 'past') return matchesSearch && isPast
    if (activeTab === 'my') return matchesSearch && isMine
    return matchesSearch
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Volunteer Events</h1>
          <p className="text-muted-foreground">Find and join community improvement activities</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/events/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Event
          </Link>
        </Button>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={v => setActiveTab(v as 'upcoming' | 'past' | 'my')}>
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="my">My Events</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filteredEvents.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No events found</h3>
                <p className="text-muted-foreground mb-4">
                  {activeTab === 'upcoming' && 'There are no upcoming events. Why not create one?'}
                  {activeTab === 'past' && 'No past events to show.'}
                  {activeTab === 'my' && 'You haven\'t joined or created any events yet.'}
                </p>
                {activeTab === 'upcoming' && (
                  <Button asChild>
                    <Link href="/dashboard/events/create">Create Event</Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map(event => {
                const isParticipant = event.participants.some(p => p.userId === user?.id)
                const isOrganizer = event.organizerId === user?.id
                const isFull = event.participants.length >= event.maxParticipants
                const eventDate = new Date(event.date)
                
                return (
                  <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    {/* Date header */}
                    <div className="bg-primary px-4 py-3 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-primary-foreground/10 flex flex-col items-center justify-center text-primary-foreground">
                        <div className="text-xs font-medium uppercase">
                          {eventDate.toLocaleDateString('en-US', { month: 'short' })}
                        </div>
                        <div className="text-xl font-bold leading-none">
                          {eventDate.getDate()}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-primary-foreground font-medium truncate">{event.title}</div>
                        <div className="text-primary-foreground/70 text-sm">
                          {event.startTime} - {event.endTime}
                        </div>
                      </div>
                    </div>

                    <CardContent className="pt-4">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Badge className={cn(categoryColors[event.category], 'text-white')}>
                          {categoryLabels[event.category]}
                        </Badge>
                        {isOrganizer && (
                          <Badge variant="outline">Organizer</Badge>
                        )}
                        {isParticipant && !isOrganizer && (
                          <Badge variant="secondary">Joined</Badge>
                        )}
                        {isFull && (
                          <Badge variant="destructive">Full</Badge>
                        )}
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {event.description}
                      </p>

                      <div className="space-y-2 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 shrink-0" />
                          <span className="truncate">{event.location.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 shrink-0" />
                          <span>{event.participants.length}/{event.maxParticipants} volunteers</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 shrink-0" />
                          <span>Organized by {event.organizerName}</span>
                        </div>
                      </div>

                      <Button asChild className="w-full">
                        <Link href={`/dashboard/events/${event.id}`}>View Details</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
