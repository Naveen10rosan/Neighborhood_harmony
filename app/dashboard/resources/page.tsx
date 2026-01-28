'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { mockResources } from '@/lib/mock-data'
import type { Resource } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Search, BookOpen, FileText, Shield, Users, ChevronRight } from 'lucide-react'

const categoryConfig: Record<string, { label: string; icon: typeof BookOpen; color: string }> = {
  reporting: { label: 'Reporting', icon: FileText, color: 'bg-blue-500' },
  safety: { label: 'Safety', icon: Shield, color: 'bg-red-500' },
  volunteering: { label: 'Volunteering', icon: Users, color: 'bg-green-500' },
  community: { label: 'Community', icon: BookOpen, color: 'bg-amber-500' },
}

export default function ResourcesPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)

  const filteredResources = mockResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(search.toLowerCase()) ||
      resource.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory
    return matchesSearch && matchesCategory
  })

  if (selectedResource) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => setSelectedResource(null)} className="gap-2">
          <ChevronRight className="h-4 w-4 rotate-180" />
          Back to Resources
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              {(() => {
                const config = categoryConfig[selectedResource.category]
                const Icon = config.icon
                return (
                  <div className={cn('p-2 rounded-lg', config.color)}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                )
              })()}
              <span className="text-sm font-medium text-muted-foreground">
                {categoryConfig[selectedResource.category].label}
              </span>
            </div>
            <CardTitle className="text-2xl">{selectedResource.title}</CardTitle>
            <CardDescription>{selectedResource.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              {selectedResource.content.split('\n').map((line, index) => {
                if (line.startsWith('## ')) {
                  return <h2 key={index} className="text-xl font-bold text-foreground mt-6 mb-4">{line.replace('## ', '')}</h2>
                }
                if (line.startsWith('### ')) {
                  return <h3 key={index} className="text-lg font-semibold text-foreground mt-4 mb-2">{line.replace('### ', '')}</h3>
                }
                if (line.startsWith('- ')) {
                  return <li key={index} className="text-foreground ml-4">{line.replace('- ', '')}</li>
                }
                if (line.startsWith('**') && line.endsWith('**')) {
                  return <p key={index} className="font-semibold text-foreground">{line.replace(/\*\*/g, '')}</p>
                }
                if (line.trim() === '') {
                  return <br key={index} />
                }
                return <p key={index} className="text-foreground mb-2">{line}</p>
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Resources</h1>
        <p className="text-muted-foreground">Guides and tips for community engagement</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search resources..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category tabs */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          {Object.entries(categoryConfig).map(([key, config]) => (
            <TabsTrigger key={key} value={key} className="gap-2">
              <config.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{config.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeCategory} className="mt-6">
          {filteredResources.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No resources found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredResources.map(resource => {
                const config = categoryConfig[resource.category]
                const Icon = config.icon

                return (
                  <Card 
                    key={resource.id} 
                    className="hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedResource(resource)}
                  >
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className={cn('p-3 rounded-lg', config.color)}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg mb-1">{resource.title}</CardTitle>
                          <CardDescription className="line-clamp-2">
                            {resource.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{config.label}</span>
                        <Button variant="ghost" size="sm" className="gap-1">
                          Read More
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Quick tips */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/10">
        <CardHeader>
          <CardTitle className="text-lg">Quick Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-background/50">
              <div className="font-medium text-foreground mb-1">Be Specific</div>
              <p className="text-sm text-muted-foreground">Include exact locations and detailed descriptions when reporting.</p>
            </div>
            <div className="p-4 rounded-lg bg-background/50">
              <div className="font-medium text-foreground mb-1">Take Photos</div>
              <p className="text-sm text-muted-foreground">Clear photos help authorities understand and resolve issues faster.</p>
            </div>
            <div className="p-4 rounded-lg bg-background/50">
              <div className="font-medium text-foreground mb-1">Stay Safe</div>
              <p className="text-sm text-muted-foreground">Always prioritize safety when volunteering or documenting issues.</p>
            </div>
            <div className="p-4 rounded-lg bg-background/50">
              <div className="font-medium text-foreground mb-1">Stay Connected</div>
              <p className="text-sm text-muted-foreground">Check notifications to stay updated on your reports and events.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
