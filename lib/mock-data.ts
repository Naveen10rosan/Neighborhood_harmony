import type { Issue, User, VolunteerEvent, Notification, Resource } from './types'

export const mockUser: User = {
  id: 'user-1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: '/avatars/alex.jpg',
  points: 1250,
  badges: [
    { id: 'badge-1', name: 'First Report', description: 'Submitted your first issue report', icon: 'flag', earnedAt: '2025-10-15' },
    { id: 'badge-2', name: 'Community Helper', description: 'Helped resolve 5 issues', icon: 'heart', earnedAt: '2025-11-20' },
    { id: 'badge-3', name: 'Event Organizer', description: 'Organized your first volunteer event', icon: 'calendar', earnedAt: '2025-12-01' },
  ],
  role: 'volunteer',
  joinedAt: '2025-09-01',
}

export const mockIssues: Issue[] = [
  {
    id: 'issue-1',
    title: 'Pothole on Main Street',
    description: 'Large pothole near the intersection of Main St and Oak Ave. Approximately 2 feet wide and 6 inches deep. Hazardous for cyclists.',
    category: 'roads',
    priority: 'high',
    status: 'in-progress',
    location: { lat: 40.7128, lng: -74.006, address: '123 Main St, Harmony City' },
    photoUrl: '/issues/pothole.jpg',
    reporterId: 'user-1',
    reporterName: 'Alex Johnson',
    createdAt: '2025-01-15T10:30:00Z',
    updatedAt: '2025-01-20T14:00:00Z',
    statusHistory: [
      { id: 'sh-1', status: 'reported', message: 'Issue reported by resident', updatedBy: 'Alex Johnson', updatedAt: '2025-01-15T10:30:00Z' },
      { id: 'sh-2', status: 'acknowledged', message: 'Public Works department has reviewed', updatedBy: 'City Admin', updatedAt: '2025-01-17T09:00:00Z' },
      { id: 'sh-3', status: 'in-progress', message: 'Repair crew dispatched', updatedBy: 'City Admin', updatedAt: '2025-01-20T14:00:00Z' },
    ],
    comments: [
      { id: 'c-1', userId: 'user-2', userName: 'Maria Garcia', content: 'I nearly hit this pothole yesterday. Thanks for reporting!', createdAt: '2025-01-16T08:00:00Z' },
    ],
  },
  {
    id: 'issue-2',
    title: 'Broken Street Light',
    description: 'Street light has been out for over a week. Very dark at night and safety concern for pedestrians.',
    category: 'lights',
    priority: 'medium',
    status: 'acknowledged',
    location: { lat: 40.7138, lng: -74.008, address: '456 Elm Street' },
    reporterId: 'user-2',
    reporterName: 'Maria Garcia',
    createdAt: '2025-01-18T16:45:00Z',
    updatedAt: '2025-01-19T11:00:00Z',
    statusHistory: [
      { id: 'sh-4', status: 'reported', message: 'Issue reported by resident', updatedBy: 'Maria Garcia', updatedAt: '2025-01-18T16:45:00Z' },
      { id: 'sh-5', status: 'acknowledged', message: 'Utility company notified', updatedBy: 'City Admin', updatedAt: '2025-01-19T11:00:00Z' },
    ],
    comments: [],
  },
  {
    id: 'issue-3',
    title: 'Graffiti on Community Center',
    description: 'Vandalism on the east wall of the community center. Offensive imagery that needs to be removed.',
    category: 'graffiti',
    priority: 'medium',
    status: 'reported',
    location: { lat: 40.7118, lng: -74.004, address: '789 Community Plaza' },
    photoUrl: '/issues/graffiti.jpg',
    reporterId: 'user-3',
    reporterName: 'James Wilson',
    createdAt: '2025-01-22T09:15:00Z',
    updatedAt: '2025-01-22T09:15:00Z',
    statusHistory: [
      { id: 'sh-6', status: 'reported', message: 'Issue reported by resident', updatedBy: 'James Wilson', updatedAt: '2025-01-22T09:15:00Z' },
    ],
    comments: [],
  },
  {
    id: 'issue-4',
    title: 'Overflowing Trash Bin',
    description: 'Public trash bin at the park entrance has been overflowing for 3 days. Attracting pests.',
    category: 'trash',
    priority: 'high',
    status: 'resolved',
    location: { lat: 40.7148, lng: -74.002, address: 'Central Park Entrance' },
    reporterId: 'user-1',
    reporterName: 'Alex Johnson',
    createdAt: '2025-01-10T07:30:00Z',
    updatedAt: '2025-01-12T15:00:00Z',
    statusHistory: [
      { id: 'sh-7', status: 'reported', message: 'Issue reported by resident', updatedBy: 'Alex Johnson', updatedAt: '2025-01-10T07:30:00Z' },
      { id: 'sh-8', status: 'acknowledged', message: 'Sanitation department notified', updatedBy: 'City Admin', updatedAt: '2025-01-10T10:00:00Z' },
      { id: 'sh-9', status: 'in-progress', message: 'Collection scheduled', updatedBy: 'City Admin', updatedAt: '2025-01-11T08:00:00Z' },
      { id: 'sh-10', status: 'resolved', message: 'Bin emptied and area cleaned', updatedBy: 'City Admin', updatedAt: '2025-01-12T15:00:00Z' },
    ],
    comments: [
      { id: 'c-2', userId: 'user-4', userName: 'Sarah Chen', content: 'Thank you for the quick resolution!', createdAt: '2025-01-12T16:00:00Z' },
    ],
  },
  {
    id: 'issue-5',
    title: 'Damaged Park Bench',
    description: 'Wooden bench near the playground has broken slats. Unsafe for sitting.',
    category: 'parks',
    priority: 'low',
    status: 'acknowledged',
    location: { lat: 40.7158, lng: -74.009, address: 'Harmony Park' },
    reporterId: 'user-4',
    reporterName: 'Sarah Chen',
    createdAt: '2025-01-21T12:00:00Z',
    updatedAt: '2025-01-23T09:00:00Z',
    statusHistory: [
      { id: 'sh-11', status: 'reported', message: 'Issue reported by resident', updatedBy: 'Sarah Chen', updatedAt: '2025-01-21T12:00:00Z' },
      { id: 'sh-12', status: 'acknowledged', message: 'Parks department reviewing', updatedBy: 'City Admin', updatedAt: '2025-01-23T09:00:00Z' },
    ],
    comments: [],
  },
]

export const mockEvents: VolunteerEvent[] = [
  {
    id: 'event-1',
    title: 'Spring Park Cleanup',
    description: 'Join us for our annual spring cleanup at Harmony Park. We will be picking up litter, planting flowers, and refreshing the walking trails.',
    category: 'cleanup',
    location: { lat: 40.7158, lng: -74.009, address: 'Harmony Park, Main Entrance' },
    date: '2025-02-15',
    startTime: '09:00',
    endTime: '13:00',
    organizerId: 'user-1',
    organizerName: 'Alex Johnson',
    maxParticipants: 30,
    participants: [
      { userId: 'user-2', userName: 'Maria Garcia', rsvpAt: '2025-01-20T10:00:00Z' },
      { userId: 'user-3', userName: 'James Wilson', rsvpAt: '2025-01-21T14:30:00Z' },
      { userId: 'user-4', userName: 'Sarah Chen', rsvpAt: '2025-01-22T09:00:00Z' },
    ],
    createdAt: '2025-01-15T08:00:00Z',
  },
  {
    id: 'event-2',
    title: 'Community Garden Planting Day',
    description: 'Help us plant vegetables and herbs in the community garden. All supplies provided. Beginners welcome!',
    category: 'gardening',
    location: { lat: 40.7128, lng: -74.006, address: '200 Garden Lane' },
    date: '2025-02-22',
    startTime: '10:00',
    endTime: '14:00',
    organizerId: 'user-4',
    organizerName: 'Sarah Chen',
    maxParticipants: 20,
    participants: [
      { userId: 'user-1', userName: 'Alex Johnson', rsvpAt: '2025-01-23T11:00:00Z' },
    ],
    createdAt: '2025-01-20T15:00:00Z',
  },
  {
    id: 'event-3',
    title: 'Fence Repair Workshop',
    description: 'Learn basic fence repair skills while helping fix the community center fence. Tools and materials provided.',
    category: 'repair',
    location: { lat: 40.7118, lng: -74.004, address: '789 Community Plaza' },
    date: '2025-03-01',
    startTime: '08:00',
    endTime: '12:00',
    organizerId: 'user-3',
    organizerName: 'James Wilson',
    maxParticipants: 15,
    participants: [],
    createdAt: '2025-01-25T10:00:00Z',
  },
]

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'status_update',
    title: 'Issue Status Updated',
    message: 'Your report "Pothole on Main Street" is now in progress.',
    read: false,
    createdAt: '2025-01-20T14:00:00Z',
    link: '/dashboard/issues/issue-1',
  },
  {
    id: 'notif-2',
    type: 'comment',
    title: 'New Comment',
    message: 'Maria Garcia commented on "Pothole on Main Street"',
    read: false,
    createdAt: '2025-01-16T08:00:00Z',
    link: '/dashboard/issues/issue-1',
  },
  {
    id: 'notif-3',
    type: 'badge_earned',
    title: 'Badge Earned!',
    message: 'You earned the "Event Organizer" badge!',
    read: true,
    createdAt: '2025-12-01T10:00:00Z',
  },
  {
    id: 'notif-4',
    type: 'event_reminder',
    title: 'Event Tomorrow',
    message: 'Spring Park Cleanup starts tomorrow at 9:00 AM',
    read: true,
    createdAt: '2025-02-14T18:00:00Z',
    link: '/dashboard/events/event-1',
  },
  {
    id: 'notif-5',
    type: 'points_earned',
    title: 'Points Earned',
    message: 'You earned 50 points for resolving an issue!',
    read: true,
    createdAt: '2025-01-12T15:30:00Z',
  },
]

export const mockResources: Resource[] = [
  {
    id: 'resource-1',
    title: 'How to Report Issues Effectively',
    description: 'Learn the best practices for reporting community issues to ensure quick resolution.',
    category: 'reporting',
    content: `
## Tips for Effective Reporting

### Be Specific About Location
Include the exact address or landmarks nearby. The more precise, the faster responders can find and fix the issue.

### Take Clear Photos
A picture is worth a thousand words. Take photos from multiple angles if needed, and ensure good lighting.

### Describe the Problem Clearly
Include details like:
- Size and scope of the issue
- How long it has been present
- Any safety concerns
- Impact on the community

### Set Appropriate Priority
- **High**: Immediate safety hazard
- **Medium**: Significant inconvenience but not dangerous
- **Low**: Minor issues that should be addressed eventually

### Follow Up
Check back on your reports and add comments if the situation changes or worsens.
    `,
    createdAt: '2025-01-01',
  },
  {
    id: 'resource-2',
    title: 'Volunteer Safety Guidelines',
    description: 'Important safety information for all volunteer activities in our community.',
    category: 'safety',
    content: `
## Safety First for Volunteers

### Before the Event
- Wear appropriate clothing and closed-toe shoes
- Bring sunscreen and water
- Check weather conditions
- Know the event organizer's contact information

### During the Event
- Always work in pairs or groups
- Use proper lifting techniques
- Take regular breaks
- Report any hazards immediately

### Equipment Safety
- Only use tools you're trained to use
- Wear provided safety gear (gloves, goggles, etc.)
- Keep work areas clean and organized

### Emergency Procedures
- Know the location of first aid kits
- Have emergency contact numbers ready
- Report all injuries, no matter how minor
    `,
    createdAt: '2025-01-05',
  },
  {
    id: 'resource-3',
    title: 'Organizing Successful Volunteer Events',
    description: 'A guide to planning and running effective community volunteer events.',
    category: 'volunteering',
    content: `
## Planning Your Volunteer Event

### Choose the Right Project
- Identify a clear, achievable goal
- Consider the skills needed
- Estimate time requirements realistically

### Set Up the Event
- Pick an accessible location
- Set appropriate date and time
- Determine maximum participants based on space and supplies

### Prepare Materials
- List all supplies needed
- Arrange for delivery or pickup
- Have extras on hand

### Promote Your Event
- Share on the platform at least 2 weeks ahead
- Reach out to regular volunteers
- Post on community boards

### Day of the Event
- Arrive early to set up
- Brief all volunteers on tasks and safety
- Take photos for the community
- Thank everyone for participating

### After the Event
- Share results and photos
- Thank volunteers with recognition
- Document lessons learned for future events
    `,
    createdAt: '2025-01-10',
  },
  {
    id: 'resource-4',
    title: 'Building a Cleaner Community',
    description: 'Simple actions everyone can take to keep our neighborhood beautiful.',
    category: 'community',
    content: `
## Everyday Actions for a Cleaner Neighborhood

### At Home
- Secure trash and recycling bins
- Maintain your property's appearance
- Report issues promptly

### In Public Spaces
- Dispose of litter properly
- Pick up after pets
- Report vandalism or damage

### Reduce, Reuse, Recycle
- Minimize single-use plastics
- Participate in recycling programs
- Support local cleanup initiatives

### Get Involved
- Join volunteer events
- Encourage neighbors to participate
- Share tips with friends and family

### Lead by Example
- Your actions inspire others
- Recognize good community behavior
- Celebrate neighborhood improvements together
    `,
    createdAt: '2025-01-15',
  },
]

export const mockLeaderboard: { userId: string; name: string; points: number; badges: number }[] = [
  { userId: 'user-5', name: 'Emma Thompson', points: 2450, badges: 8 },
  { userId: 'user-6', name: 'Michael Brown', points: 1890, badges: 6 },
  { userId: 'user-1', name: 'Alex Johnson', points: 1250, badges: 3 },
  { userId: 'user-4', name: 'Sarah Chen', points: 1100, badges: 4 },
  { userId: 'user-2', name: 'Maria Garcia', points: 980, badges: 3 },
  { userId: 'user-3', name: 'James Wilson', points: 750, badges: 2 },
  { userId: 'user-7', name: 'Lisa Anderson', points: 620, badges: 2 },
  { userId: 'user-8', name: 'David Kim', points: 450, badges: 1 },
  { userId: 'user-9', name: 'Jennifer Lee', points: 320, badges: 1 },
  { userId: 'user-10', name: 'Robert Taylor', points: 180, badges: 1 },
]
