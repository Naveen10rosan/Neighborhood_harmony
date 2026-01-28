'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useApp } from '@/lib/app-context'
import { mockLeaderboard } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { Trophy, Medal, Award, Star, Target, Heart, Calendar, Flag } from 'lucide-react'

const badgeIcons: Record<string, typeof Star> = {
  'First Report': Flag,
  'Community Helper': Heart,
  'Event Organizer': Calendar,
}

export default function LeaderboardPage() {
  const { user } = useApp()

  const userRank = mockLeaderboard.findIndex(l => l.userId === user?.id) + 1 || '-'
  const sortedLeaderboard = [...mockLeaderboard].sort((a, b) => b.points - a.points)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Leaderboard</h1>
        <p className="text-muted-foreground">See top contributors in your community</p>
      </div>

      {/* Your stats */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                  {user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold text-foreground">{user?.name || 'Your Name'}</h2>
                <p className="text-muted-foreground">Keep contributing to climb the ranks!</p>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-background/50">
                <div className="text-3xl font-bold text-primary">{userRank}</div>
                <div className="text-sm text-muted-foreground">Your Rank</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-background/50">
                <div className="text-3xl font-bold text-foreground">{user?.points || 0}</div>
                <div className="text-sm text-muted-foreground">Points</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-background/50">
                <div className="text-3xl font-bold text-foreground">{user?.badges?.length || 0}</div>
                <div className="text-sm text-muted-foreground">Badges</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Your badges */}
      {user?.badges && user.badges.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Your Badges
            </CardTitle>
            <CardDescription>Achievements you have earned</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {user.badges.map(badge => {
                const BadgeIcon = badgeIcons[badge.name] || Star
                return (
                  <div
                    key={badge.id}
                    className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border border-border"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <BadgeIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{badge.name}</div>
                      <div className="text-xs text-muted-foreground">{badge.description}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Leaderboard table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Top Contributors
          </CardTitle>
          <CardDescription>Community members making the biggest impact</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {sortedLeaderboard.map((entry, index) => {
              const rank = index + 1
              const isCurrentUser = entry.userId === user?.id

              return (
                <div
                  key={entry.userId}
                  className={cn(
                    'flex items-center gap-4 p-4 rounded-lg transition-colors',
                    isCurrentUser ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/50'
                  )}
                >
                  {/* Rank */}
                  <div className="w-10 flex justify-center">
                    {rank === 1 ? (
                      <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
                        <Trophy className="h-4 w-4 text-white" />
                      </div>
                    ) : rank === 2 ? (
                      <div className="w-8 h-8 rounded-full bg-slate-400 flex items-center justify-center">
                        <Medal className="h-4 w-4 text-white" />
                      </div>
                    ) : rank === 3 ? (
                      <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center">
                        <Medal className="h-4 w-4 text-white" />
                      </div>
                    ) : (
                      <span className="text-lg font-bold text-muted-foreground">{rank}</span>
                    )}
                  </div>

                  {/* User info */}
                  <Avatar>
                    <AvatarFallback className={cn(
                      'font-medium',
                      isCurrentUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    )}>
                      {entry.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground truncate">
                      {entry.name}
                      {isCurrentUser && (
                        <Badge variant="secondary" className="ml-2">You</Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {entry.badges} badges earned
                    </div>
                  </div>

                  {/* Points */}
                  <div className="text-right">
                    <div className="text-lg font-bold text-foreground">{entry.points.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">points</div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* How to earn points */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            How to Earn Points
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-muted/50 text-center">
              <div className="text-2xl font-bold text-primary mb-1">+25</div>
              <div className="text-sm text-foreground font-medium">Report an Issue</div>
              <div className="text-xs text-muted-foreground">Help identify problems</div>
            </div>
            <div className="p-4 rounded-lg bg-muted/50 text-center">
              <div className="text-2xl font-bold text-primary mb-1">+50</div>
              <div className="text-sm text-foreground font-medium">Organize an Event</div>
              <div className="text-xs text-muted-foreground">Lead community activities</div>
            </div>
            <div className="p-4 rounded-lg bg-muted/50 text-center">
              <div className="text-2xl font-bold text-primary mb-1">+30</div>
              <div className="text-sm text-foreground font-medium">Attend an Event</div>
              <div className="text-xs text-muted-foreground">Volunteer your time</div>
            </div>
            <div className="p-4 rounded-lg bg-muted/50 text-center">
              <div className="text-2xl font-bold text-primary mb-1">+100</div>
              <div className="text-sm text-foreground font-medium">Issue Resolved</div>
              <div className="text-xs text-muted-foreground">Your report gets fixed</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
