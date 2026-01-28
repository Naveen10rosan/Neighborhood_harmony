export type IssueCategory = 'roads' | 'trash' | 'graffiti' | 'lights' | 'parks' | 'other'
export type IssuePriority = 'low' | 'medium' | 'high'
export type IssueStatus = 'reported' | 'acknowledged' | 'in-progress' | 'resolved'

export interface Issue {
  id: string
  title: string
  description: string
  category: IssueCategory
  priority: IssuePriority
  status: IssueStatus
  location: {
    lat: number
    lng: number
    address: string
  }
  photoUrl?: string
  reporterId: string
  reporterName: string
  createdAt: string
  updatedAt: string
  statusHistory: StatusUpdate[]
  comments: Comment[]
}

export interface StatusUpdate {
  id: string
  status: IssueStatus
  message: string
  updatedBy: string
  updatedAt: string
}

export interface Comment {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  content: string
  createdAt: string
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  points: number
  badges: Badge[]
  role: 'resident' | 'volunteer' | 'authority' | 'admin'
  joinedAt: string
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  earnedAt: string
}

export interface VolunteerEvent {
  id: string
  title: string
  description: string
  category: 'cleanup' | 'repair' | 'gardening' | 'other'
  location: {
    lat: number
    lng: number
    address: string
  }
  date: string
  startTime: string
  endTime: string
  organizerId: string
  organizerName: string
  maxParticipants: number
  participants: Participant[]
  createdAt: string
}

export interface Participant {
  userId: string
  userName: string
  userAvatar?: string
  rsvpAt: string
}

export interface Notification {
  id: string
  type: 'status_update' | 'comment' | 'event_reminder' | 'badge_earned' | 'points_earned'
  title: string
  message: string
  read: boolean
  createdAt: string
  link?: string
}

export interface Resource {
  id: string
  title: string
  description: string
  category: 'reporting' | 'safety' | 'volunteering' | 'community'
  content: string
  imageUrl?: string
  createdAt: string
}

export const CATEGORY_CONFIG: Record<IssueCategory, { label: string; color: string; icon: string }> = {
  roads: { label: 'Roads', color: 'bg-amber-500', icon: 'road' },
  trash: { label: 'Trash', color: 'bg-emerald-600', icon: 'trash' },
  graffiti: { label: 'Graffiti', color: 'bg-rose-500', icon: 'spray-can' },
  lights: { label: 'Lights', color: 'bg-yellow-400', icon: 'lightbulb' },
  parks: { label: 'Parks', color: 'bg-green-600', icon: 'trees' },
  other: { label: 'Other', color: 'bg-slate-500', icon: 'circle-help' },
}

export const PRIORITY_CONFIG: Record<IssuePriority, { label: string; color: string }> = {
  low: { label: 'Low', color: 'bg-blue-500' },
  medium: { label: 'Medium', color: 'bg-amber-500' },
  high: { label: 'High', color: 'bg-red-500' },
}

export const STATUS_CONFIG: Record<IssueStatus, { label: string; color: string }> = {
  reported: { label: 'Reported', color: 'bg-slate-500' },
  acknowledged: { label: 'Acknowledged', color: 'bg-blue-500' },
  'in-progress': { label: 'In Progress', color: 'bg-amber-500' },
  resolved: { label: 'Resolved', color: 'bg-green-500' },
}
