'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { Issue, User, VolunteerEvent, Notification } from './types'
import { mockUser, mockIssues, mockEvents, mockNotifications } from './mock-data'

interface AppContextType {
  user: User | null
  setUser: (user: User | null) => void
  issues: Issue[]
  addIssue: (issue: Issue) => void
  updateIssue: (id: string, updates: Partial<Issue>) => void
  events: VolunteerEvent[]
  addEvent: (event: VolunteerEvent) => void
  joinEvent: (eventId: string) => void
  leaveEvent: (eventId: string) => void
  notifications: Notification[]
  markNotificationRead: (id: string) => void
  unreadCount: number
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  // Initialize with mock user for demo purposes
  const [user, setUser] = useState<User | null>(mockUser)
  const [issues, setIssues] = useState<Issue[]>(mockIssues)
  const [events, setEvents] = useState<VolunteerEvent[]>(mockEvents)
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)

  const isAuthenticated = user !== null

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    // Simulate login - in production this would call an API
    await new Promise(resolve => setTimeout(resolve, 500))
    if (email) {
      setUser(mockUser)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const addIssue = useCallback((issue: Issue) => {
    setIssues(prev => [issue, ...prev])
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        type: 'points_earned',
        title: 'Points Earned',
        message: 'You earned 25 points for reporting an issue!',
        read: false,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ])
    if (user) {
      setUser({ ...user, points: user.points + 25 })
    }
  }, [user])

  const updateIssue = useCallback((id: string, updates: Partial<Issue>) => {
    setIssues(prev =>
      prev.map(issue =>
        issue.id === id ? { ...issue, ...updates, updatedAt: new Date().toISOString() } : issue
      )
    )
  }, [])

  const addEvent = useCallback((event: VolunteerEvent) => {
    setEvents(prev => [event, ...prev])
    if (user) {
      setUser({ ...user, points: user.points + 50 })
    }
  }, [user])

  const joinEvent = useCallback((eventId: string) => {
    if (!user) return
    setEvents(prev =>
      prev.map(event =>
        event.id === eventId
          ? {
              ...event,
              participants: [
                ...event.participants,
                { userId: user.id, userName: user.name, userAvatar: user.avatar, rsvpAt: new Date().toISOString() },
              ],
            }
          : event
      )
    )
  }, [user])

  const leaveEvent = useCallback((eventId: string) => {
    if (!user) return
    setEvents(prev =>
      prev.map(event =>
        event.id === eventId
          ? { ...event, participants: event.participants.filter(p => p.userId !== user.id) }
          : event
      )
    )
  }, [user])

  const markNotificationRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(notif => (notif.id === id ? { ...notif, read: true } : notif))
    )
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        issues,
        addIssue,
        updateIssue,
        events,
        addEvent,
        joinEvent,
        leaveEvent,
        notifications,
        markNotificationRead,
        unreadCount,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
