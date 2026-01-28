'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { Issue, IssueCategory } from '@/lib/types'
import { CATEGORY_CONFIG, STATUS_CONFIG } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Filter, X } from 'lucide-react'

interface IssueMapProps {
  issues: Issue[]
  className?: string
}

export function IssueMap({ issues, className }: IssueMapProps) {
  const [selectedCategory, setSelectedCategory] = useState<IssueCategory | 'all'>('all')
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null)

  const filteredIssues = selectedCategory === 'all' 
    ? issues 
    : issues.filter(i => i.category === selectedCategory)

  const categories: (IssueCategory | 'all')[] = ['all', 'roads', 'trash', 'graffiti', 'lights', 'parks', 'other']

  // Simulate map positions based on lat/lng relative to a center point
  const getPosition = (issue: Issue) => {
    const centerLat = 40.7128
    const centerLng = -74.006
    const scale = 3000 // Scale factor for positioning
    
    const x = ((issue.location.lng - centerLng) * scale + 50)
    const y = ((centerLat - issue.location.lat) * scale + 50)
    
    return {
      left: `${Math.max(5, Math.min(95, x))}%`,
      top: `${Math.max(5, Math.min(95, y))}%`,
    }
  }

  return (
    <div className={cn('relative bg-muted/50 overflow-hidden', className)}>
      {/* Map background grid pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* Simulated map roads */}
      <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
        <line x1="0%" y1="30%" x2="100%" y2="30%" stroke="currentColor" strokeWidth="8" />
        <line x1="0%" y1="70%" x2="100%" y2="70%" stroke="currentColor" strokeWidth="4" />
        <line x1="25%" y1="0%" x2="25%" y2="100%" stroke="currentColor" strokeWidth="6" />
        <line x1="60%" y1="0%" x2="60%" y2="100%" stroke="currentColor" strokeWidth="4" />
        <line x1="85%" y1="0%" x2="85%" y2="100%" stroke="currentColor" strokeWidth="3" />
      </svg>

      {/* Filter bar */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1 p-1 bg-background/90 backdrop-blur rounded-lg shadow-sm border border-border">
          <Filter className="h-4 w-4 ml-2 text-muted-foreground" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'px-2 py-1 text-xs font-medium rounded transition-colors',
                selectedCategory === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted'
              )}
            >
              {cat === 'all' ? 'All' : CATEGORY_CONFIG[cat].label}
            </button>
          ))}
        </div>
      </div>

      {/* Issue markers */}
      {filteredIssues.map(issue => {
        const pos = getPosition(issue)
        const isSelected = selectedIssue?.id === issue.id
        
        return (
          <button
            key={issue.id}
            onClick={() => setSelectedIssue(isSelected ? null : issue)}
            className={cn(
              'absolute z-20 transform -translate-x-1/2 -translate-y-full transition-all duration-200',
              isSelected ? 'z-30 scale-125' : 'hover:scale-110'
            )}
            style={{ left: pos.left, top: pos.top }}
            aria-label={`Issue: ${issue.title}`}
          >
            <div className="relative">
              <MapPin 
                className={cn(
                  'h-8 w-8 drop-shadow-md',
                  CATEGORY_CONFIG[issue.category].color.replace('bg-', 'text-')
                )}
                fill="currentColor"
              />
              {issue.priority === 'high' && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              )}
            </div>
          </button>
        )
      })}

      {/* Selected issue popup */}
      {selectedIssue && (
        <div className="absolute bottom-3 left-3 right-3 z-30 bg-background/95 backdrop-blur rounded-lg shadow-lg border border-border p-4">
          <button
            onClick={() => setSelectedIssue(null)}
            className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="flex items-start gap-3">
            <div className={cn('w-3 h-3 rounded-full mt-1.5', CATEGORY_CONFIG[selectedIssue.category].color)} />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground">{selectedIssue.title}</h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {selectedIssue.description}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className={cn(STATUS_CONFIG[selectedIssue.status].color, 'text-white')}>
                  {STATUS_CONFIG[selectedIssue.status].label}
                </Badge>
                <span className="text-xs text-muted-foreground">{selectedIssue.location.address}</span>
              </div>
              <Button size="sm" className="mt-3" asChild>
                <Link href={`/dashboard/issues/${selectedIssue.id}`}>View Details</Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {filteredIssues.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 mx-auto text-muted-foreground/50 mb-2" />
            <p className="text-muted-foreground">No issues found for this filter</p>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-3 right-3 z-10 p-2 bg-background/90 backdrop-blur rounded-lg shadow-sm border border-border">
        <div className="text-xs font-medium text-muted-foreground mb-2">Legend</div>
        <div className="space-y-1">
          {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
            <div key={key} className="flex items-center gap-2">
              <div className={cn('w-2 h-2 rounded-full', config.color)} />
              <span className="text-xs text-muted-foreground">{config.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
