'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useApp } from '@/lib/app-context'
import { CATEGORY_CONFIG, STATUS_CONFIG, PRIORITY_CONFIG } from '@/lib/types'
import { cn } from '@/lib/utils'
import { ArrowLeft, MapPin, Clock, User, MessageSquare, Send, CheckCircle } from 'lucide-react'

export default function IssueDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { issues, updateIssue, user } = useApp()
  const [newComment, setNewComment] = useState('')

  const issue = issues.find(i => i.id === params.id)

  if (!issue) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-xl font-semibold text-foreground mb-2">Issue not found</h2>
        <p className="text-muted-foreground mb-4">This issue may have been removed or does not exist.</p>
        <Button asChild>
          <Link href="/dashboard/issues">Back to Issues</Link>
        </Button>
      </div>
    )
  }

  const handleAddComment = () => {
    if (!newComment.trim() || !user) return

    const comment = {
      id: `comment-${Date.now()}`,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      content: newComment,
      createdAt: new Date().toISOString(),
    }

    updateIssue(issue.id, {
      comments: [...issue.comments, comment],
    })
    setNewComment('')
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Button variant="ghost" onClick={() => router.back()} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      {/* Header */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main content */}
        <div className="flex-1 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge className={cn(CATEGORY_CONFIG[issue.category].color, 'text-white')}>
                  {CATEGORY_CONFIG[issue.category].label}
                </Badge>
                <Badge variant="secondary" className={cn(STATUS_CONFIG[issue.status].color, 'text-white')}>
                  {STATUS_CONFIG[issue.status].label}
                </Badge>
                <Badge variant="outline" className={cn(
                  'border-2',
                  issue.priority === 'high' ? 'border-red-500 text-red-600' :
                  issue.priority === 'medium' ? 'border-amber-500 text-amber-600' :
                  'border-blue-500 text-blue-600'
                )}>
                  {PRIORITY_CONFIG[issue.priority].label} Priority
                </Badge>
              </div>
              <CardTitle className="text-2xl">{issue.title}</CardTitle>
              <CardDescription className="flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {issue.location.address}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {new Date(issue.createdAt).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {issue.reporterName}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-foreground whitespace-pre-wrap">{issue.description}</p>
              
              {issue.photoUrl && (
                <div className="mt-4 rounded-lg overflow-hidden bg-muted aspect-video flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">Photo placeholder</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Comments section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Comments ({issue.comments.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add comment */}
              <div className="flex gap-3">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    className="min-h-[80px]"
                  />
                  <Button 
                    size="sm" 
                    className="mt-2"
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Post Comment
                  </Button>
                </div>
              </div>

              {/* Comments list */}
              {issue.comments.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No comments yet. Be the first to comment!
                </p>
              ) : (
                <div className="space-y-4 pt-4 border-t border-border">
                  {issue.comments.map(comment => (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-muted">
                          {comment.userName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-foreground">{comment.userName}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-foreground">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:w-80 space-y-6">
          {/* Status timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Status Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {issue.statusHistory.map((update, index) => (
                  <div key={update.id} className="relative flex gap-3">
                    {/* Timeline line */}
                    {index < issue.statusHistory.length - 1 && (
                      <div className="absolute left-[11px] top-6 w-0.5 h-full bg-border" />
                    )}
                    {/* Status dot */}
                    <div className={cn(
                      'w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10',
                      STATUS_CONFIG[update.status].color
                    )}>
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                    {/* Content */}
                    <div className="flex-1 pb-4">
                      <div className="font-medium text-foreground text-sm">
                        {STATUS_CONFIG[update.status].label}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {update.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(update.updatedAt).toLocaleString()} by {update.updatedBy}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Location card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-3">
                <MapPin className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-sm text-foreground">{issue.location.address}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {issue.location.lat.toFixed(4)}, {issue.location.lng.toFixed(4)}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
