'use client'

import React from "react"

import { useState, useRef } from 'react'
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
import { CATEGORY_CONFIG, PRIORITY_CONFIG } from '@/lib/types'
import type { IssueCategory, IssuePriority, Issue } from '@/lib/types'
import { MapPin, Camera, Mic, MicOff, Loader2, Upload, X, CheckCircle } from 'lucide-react'

export default function ReportIssuePage() {
  const router = useRouter()
  const { addIssue, user } = useApp()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<IssueCategory>('other')
  const [priority, setPriority] = useState<IssuePriority>('medium')
  const [address, setAddress] = useState('')
  const [photo, setPhoto] = useState<string | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [isLocating, setIsLocating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleGetLocation = () => {
    setIsLocating(true)
    // Simulate geolocation
    setTimeout(() => {
      setAddress('123 Main Street, Harmony City, HC 12345')
      setIsLocating(false)
    }, 1000)
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhoto(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleVoiceInput = () => {
    if (isRecording) {
      setIsRecording(false)
      // Simulate voice-to-text
      setDescription(prev => prev + ' (Voice input: There is a large pothole that needs repair.)')
    } else {
      setIsRecording(true)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    const newIssue: Issue = {
      id: `issue-${Date.now()}`,
      title,
      description,
      category,
      priority,
      status: 'reported',
      location: {
        lat: 40.7128 + (Math.random() - 0.5) * 0.01,
        lng: -74.006 + (Math.random() - 0.5) * 0.01,
        address: address || '123 Main Street, Harmony City',
      },
      photoUrl: photo || undefined,
      reporterId: user.id,
      reporterName: user.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      statusHistory: [
        {
          id: `sh-${Date.now()}`,
          status: 'reported',
          message: 'Issue reported by resident',
          updatedBy: user.name,
          updatedAt: new Date().toISOString(),
        },
      ],
      comments: [],
    }

    addIssue(newIssue)
    setIsSubmitting(false)
    setShowSuccess(true)

    // Redirect after showing success
    setTimeout(() => {
      router.push('/dashboard/issues')
    }, 2000)
  }

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <CheckCircle className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Issue Reported!</h2>
        <p className="text-muted-foreground text-center max-w-md mb-4">
          Thank you for helping improve our community. You have earned 25 points!
        </p>
        <p className="text-sm text-muted-foreground">Redirecting to issues list...</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Report an Issue</h1>
        <p className="text-muted-foreground">Help keep your neighborhood clean and safe</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Issue Details</CardTitle>
            <CardDescription>Provide as much detail as possible to help resolve the issue quickly</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Brief description of the issue"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Category and Priority */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select value={category} onValueChange={v => setCategory(v as IssueCategory)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
                      <SelectItem key={key} value={key}>{config.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Priority *</Label>
                <Select value={priority} onValueChange={v => setPriority(v as IssuePriority)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(PRIORITY_CONFIG).map(([key, config]) => (
                      <SelectItem key={key} value={key}>{config.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="description">Description *</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleVoiceInput}
                  className={isRecording ? 'text-red-500' : ''}
                >
                  {isRecording ? <MicOff className="h-4 w-4 mr-1" /> : <Mic className="h-4 w-4 mr-1" />}
                  {isRecording ? 'Stop' : 'Voice'}
                </Button>
              </div>
              <Textarea
                id="description"
                placeholder="Describe the issue in detail. Include size, severity, and any safety concerns."
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
                className="min-h-[120px]"
              />
              {isRecording && (
                <p className="text-sm text-red-500 animate-pulse">Recording... speak now</p>
              )}
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="address">Location *</Label>
              <div className="flex gap-2">
                <Input
                  id="address"
                  placeholder="Enter address or use current location"
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

            {/* Photo upload */}
            <div className="space-y-2">
              <Label>Photo (optional)</Label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              {photo ? (
                <div className="relative">
                  <img
                    src={photo || "/placeholder.svg"}
                    alt="Uploaded preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => setPhoto(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-32 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-muted">
                      <Camera className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="p-2 rounded-full bg-muted">
                      <Upload className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">Take a photo or upload from gallery</span>
                </button>
              )}
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
                disabled={isSubmitting || !title || !description || !address}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Report'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
