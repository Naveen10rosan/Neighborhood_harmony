'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Bell, Sun, Moon } from 'lucide-react'
import { useApp } from '@/lib/app-context'
import { cn } from '@/lib/utils'

export function DashboardHeader() {
  const { notifications, unreadCount, markNotificationRead } = useApp()
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <header className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border px-4 md:px-6">
      <div className="flex h-16 items-center justify-end gap-4">
        {/* Theme toggle */}
        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="px-4 py-3 border-b border-border">
              <h3 className="font-semibold text-foreground">Notifications</h3>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="px-4 py-8 text-center text-muted-foreground text-sm">
                  No notifications yet
                </div>
              ) : (
                notifications.slice(0, 5).map(notif => (
                  <DropdownMenuItem
                    key={notif.id}
                    className={cn(
                      'flex flex-col items-start gap-1 px-4 py-3 cursor-pointer',
                      !notif.read && 'bg-primary/5'
                    )}
                    onClick={() => markNotificationRead(notif.id)}
                    asChild={!!notif.link}
                  >
                    {notif.link ? (
                      <Link href={notif.link}>
                        <div className="font-medium text-sm text-foreground">{notif.title}</div>
                        <div className="text-xs text-muted-foreground">{notif.message}</div>
                      </Link>
                    ) : (
                      <div>
                        <div className="font-medium text-sm text-foreground">{notif.title}</div>
                        <div className="text-xs text-muted-foreground">{notif.message}</div>
                      </div>
                    )}
                  </DropdownMenuItem>
                ))
              )}
            </div>
            {notifications.length > 0 && (
              <div className="px-4 py-2 border-t border-border">
                <Button variant="ghost" size="sm" className="w-full text-primary" asChild>
                  <Link href="/dashboard/notifications">View all notifications</Link>
                </Button>
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
