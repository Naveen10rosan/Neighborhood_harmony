'use client'

import React from "react"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useApp } from '@/lib/app-context'
import type { VolunteerEvent } from '@/lib/types'
import { MapPin, Loader2, CheckCircle } from 'lucide-react'

type EventCategory = 'cleanup' | 'repair' | 'gardening' | 'other'

const categoryOptions: { value: EventCategory; label: string }[] = [
  { value: 'cleanup', label: 'Cleanup' },
  { value: 'repair', label: 'Repair' },
  { value: 'gardening', label: 'Gardening' },
  { value: 'other', label: 'Other' },
]

export default function CreateEventPage() {
  const router = useRouter()
  const { addEvent, user } = useApp()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<EventCategory>('cleanup')
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [address, setAddress] = useState('')
  const [maxParticipants, setMaxParticipants] = useState('20')
  const [isLocating, setIsLocating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleGetLocation = () => {
    setIsLocating(true)
    // Simulate geolocation
    setTimeout(() => {
      setAddress('Harmony Park, 100 Park Avenue, Harmony City')
      setIsLocating(false)
    }, 1000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    const newEvent: VolunteerEvent = {
      id: `event-${Date.now()}`,
      title,
      description,
      category,
      location: {
        lat: 40.7128 + (Math.random() - 0.5) * 0.01,
        lng: -74.006 + (Math.random() - 0.5) * 0.01,
        address: address || 'Harmony Park, Harmony City',
      },
      date,
      startTime,
      endTime,
      organizerId: user.id,
      organizerName: user.name,
      maxParticipants: parseInt(maxParticipants, 10),
      participants: [],
      createdAt: new Date().toISOString(),
    }

    addEvent(newEvent)
    setIsSubmitting(false)
    setShowSuccess(true)

    // Redirect after showing success
    setTimeout(() => {
      router.push('/dashboard/events')
    }, 2000)
  }

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <CheckCircle className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Event Created!</h2>
        <p className="text-muted-foreground text-center max-w-md mb-4">
          Your volunteer event has been created. You have earned 50 points for organizing!
        </p>
        <p className="text-sm text-muted-foreground">Redirecting to events list...</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Create Volunteer Event</h1>
        <p className="text-muted-foreground">Organize a community improvement activity</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
            <CardDescription>Fill in the details for your volunteer event</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Event Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Spring Park Cleanup"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label>Category *</Label>
              <Select value={category} onValueChange={v => setCategory(v as EventCategory)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe what volunteers will be doing, what to bring, and any other important details."
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
                className="min-h-[120px]"
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time *</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={e => setStartTime(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time *</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={e => setEndTime(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="address">Location *</Label>
              <div className="flex gap-2">
                <Input
                  id="address"
                  placeholder="Enter address"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGetLocation}
                  disabled={isLocating}
                >
                  {isLocating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <MapPin className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Max Participants */}
            <div className="space-y-2">
              <Label htmlFor="maxParticipants">Maximum Participants *</Label>
              <Input
                id="maxParticipants"
                type="number"
                min="1"
                max="100"
                value={maxParticipants}
                onChange={e => setMaxParticipants(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Set a limit based on space and supplies available
              </p>
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={isSubmitting || !title || !description || !date || !startTime || !endTime || !address}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Event'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
