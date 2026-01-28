'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useApp } from '@/lib/app-context'
import { cn } from '@/lib/utils'
import { ArrowLeft, MapPin, Calendar, Clock, Users, User, CheckCircle } from 'lucide-react'

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

export default function EventDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { events, joinEvent, leaveEvent, user } = useApp()

  const event = events.find(e => e.id === params.id)

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-xl font-semibold text-foreground mb-2">Event not found</h2>
        <p className="text-muted-foreground mb-4">This event may have been removed or does not exist.</p>
        <Button asChild>
          <Link href="/dashboard/events">Back to Events</Link>
        </Button>
      </div>
    )
  }

  const eventDate = new Date(event.date)
  const isPast = eventDate < new Date()
  const isParticipant = event.participants.some(p => p.userId === user?.id)
  const isOrganizer = event.organizerId === user?.id
  const isFull = event.participants.length >= event.maxParticipants
  const spotsLeft = event.maxParticipants - event.participants.length

  const handleRSVP = () => {
    if (isParticipant) {
      leaveEvent(event.id)
    } else {
      joinEvent(event.id)
    }
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Button variant="ghost" onClick={() => router.back()} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main content */}
        <div className="flex-1 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge className={cn(categoryColors[event.category], 'text-white')}>
                  {categoryLabels[event.category]}
                </Badge>
                {isPast && (
                  <Badge variant="secondary">Past Event</Badge>
                )}
                {isOrganizer && (
                  <Badge variant="outline">You are the organizer</Badge>
                )}
              </div>
              <CardTitle className="text-2xl">{event.title}</CardTitle>
              <CardDescription>
                Organized by {event.organizerName}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Event details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Date</div>
                    <div className="font-medium text-foreground">
                      {eventDate.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Time</div>
                    <div className="font-medium text-foreground">
                      {event.startTime} - {event.endTime}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Location</div>
                    <div className="font-medium text-foreground">{event.location.address}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Volunteers</div>
                    <div className="font-medium text-foreground">
                      {event.participants.length}/{event.maxParticipants}
                      {!isFull && !isPast && (
                        <span className="text-muted-foreground font-normal"> ({spotsLeft} spots left)</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold text-foreground mb-2">About this event</h3>
                <p className="text-foreground whitespace-pre-wrap">{event.description}</p>
              </div>

              {/* RSVP button */}
              {!isPast && !isOrganizer && (
                <div className="pt-4 border-t border-border">
                  {isParticipant ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-primary">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">You are attending this event!</span>
                      </div>
                      <Button variant="outline" onClick={handleRSVP}>
                        Cancel RSVP
                      </Button>
                    </div>
                  ) : isFull ? (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">This event is full</p>
                    </div>
                  ) : (
                    <Button className="w-full" size="lg" onClick={handleRSVP}>
                      <Users className="mr-2 h-5 w-5" />
                      Join Event
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:w-80 space-y-6">
          {/* Participants */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5" />
                Participants ({event.participants.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {event.participants.length === 0 ? (
                <p className="text-center text-muted-foreground py-4 text-sm">
                  No participants yet. Be the first to join!
                </p>
              ) : (
                <div className="space-y-3">
                  {event.participants.map(participant => (
                    <div key={participant.userId} className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-muted">
                          {participant.userName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-foreground truncate">
                          {participant.userName}
                          {participant.userId === user?.id && (
                            <span className="text-muted-foreground font-normal"> (You)</span>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Joined {new Date(participant.rsvpAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Organizer */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5" />
                Organizer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {event.organizerName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-foreground">{event.organizerName}</div>
                  <div className="text-sm text-muted-foreground">Event Organizer</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location map placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-3">
                <MapPin className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-sm text-foreground">{event.location.address}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
