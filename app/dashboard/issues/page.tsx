'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useApp } from '@/lib/app-context'
import { CATEGORY_CONFIG, STATUS_CONFIG, PRIORITY_CONFIG } from '@/lib/types'
import type { IssueCategory, IssueStatus, IssuePriority } from '@/lib/types'
import { cn } from '@/lib/utils'
import { PlusCircle, Search, MapPin, Clock, Filter } from 'lucide-react'

export default function IssuesPage() {
  const { issues } = useApp()
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<IssueCategory | 'all'>('all')
  const [statusFilter, setStatusFilter] = useState<IssueStatus | 'all'>('all')
  const [priorityFilter, setPriorityFilter] = useState<IssuePriority | 'all'>('all')

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(search.toLowerCase()) ||
      issue.description.toLowerCase().includes(search.toLowerCase()) ||
      issue.location.address.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || issue.category === categoryFilter
    const matchesStatus = statusFilter === 'all' || issue.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || issue.priority === priorityFilter
    return matchesSearch && matchesCategory && matchesStatus && matchesPriority
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Community Issues</h1>
          <p className="text-muted-foreground">Browse and track reported issues in your area</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/report">
            <PlusCircle className="mr-2 h-4 w-4" />
            Report Issue
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search issues..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={categoryFilter} onValueChange={v => setCategoryFilter(v as IssueCategory | 'all')}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
                    <SelectItem key={key} value={key}>{config.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={v => setStatusFilter(v as IssueStatus | 'all')}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                    <SelectItem key={key} value={key}>{config.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={v => setPriorityFilter(v as IssuePriority | 'all')}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  {Object.entries(PRIORITY_CONFIG).map(([key, config]) => (
                    <SelectItem key={key} value={key}>{config.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredIssues.length} of {issues.length} issues
      </div>

      {/* Issues list */}
      <div className="space-y-4">
        {filteredIssues.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <MapPin className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No issues found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your filters or search terms</p>
              <Button asChild>
                <Link href="/dashboard/report">Report New Issue</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredIssues.map(issue => (
            <Card key={issue.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <Link href={`/dashboard/issues/${issue.id}`} className="block">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    {/* Category indicator */}
                    <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center shrink-0', CATEGORY_CONFIG[issue.category].color)}>
                      <MapPin className="h-6 w-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{issue.title}</h3>
                        <Badge variant="secondary" className={cn(STATUS_CONFIG[issue.status].color, 'text-white')}>
                          {STATUS_CONFIG[issue.status].label}
                        </Badge>
                        <Badge variant="outline" className={cn(
                          'border-2',
                          issue.priority === 'high' ? 'border-red-500 text-red-600' :
                          issue.priority === 'medium' ? 'border-amber-500 text-amber-600' :
                          'border-blue-500 text-blue-600'
                        )}>
                          {PRIORITY_CONFIG[issue.priority].label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {issue.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {issue.location.address}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(issue.createdAt).toLocaleDateString()}
                        </span>
                        <span>Reported by {issue.reporterName}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
