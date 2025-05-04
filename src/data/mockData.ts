
import { User, Listing, Bid } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Jane Smith',
    email: 'jane@example.com',
    userType: 'individual',
    avatar: 'https://i.pravatar.cc/150?img=1',
    bio: 'Professional vocalist with 8 years of experience in jazz and blues',
    location: 'New York, NY',
    skills: ['Vocals', 'Piano', 'Songwriting'],
    genres: ['Jazz', 'Blues', 'Soul']
  },
  {
    id: '2',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    userType: 'individual',
    avatar: 'https://i.pravatar.cc/150?img=3',
    bio: 'Sound engineer specializing in live performances',
    location: 'Los Angeles, CA',
    skills: ['Sound Engineering', 'Mixing', 'Live Performance'],
    genres: ['Rock', 'Pop', 'Electronic']
  },
  {
    id: '3',
    name: 'Rhythm Productions',
    email: 'contact@rhythmprod.com',
    userType: 'company',
    avatar: 'https://i.pravatar.cc/150?img=4',
    bio: 'Full-service event production company for music festivals and concerts',
    location: 'Austin, TX',
    skills: ['Event Management', 'Stage Production', 'Lighting', 'Sound'],
    genres: ['Various']
  },
  {
    id: '4',
    name: 'Sound Wave Studios',
    email: 'booking@soundwave.com',
    userType: 'company',
    avatar: 'https://i.pravatar.cc/150?img=7',
    bio: 'Premier recording studio with state-of-the-art equipment',
    location: 'Nashville, TN',
    skills: ['Recording', 'Mixing', 'Mastering'],
    genres: ['All genres']
  }
];

// Mock Listings
export const mockListings: Listing[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Jane Smith',
    userAvatar: 'https://i.pravatar.cc/150?img=1',
    type: 'offer',
    title: 'Jazz Vocalist Available for Evening Events',
    description: 'Professional jazz vocalist available for cocktail hours, evening events, and small venues.',
    category: 'Musician',
    location: 'New York, NY',
    dateTime: '2025-06-15T19:00:00',
    rate: '$300/hour',
    skills: ['Vocals', 'Jazz Standards', 'Improvisation'],
    genres: ['Jazz', 'Blues'],
    createdAt: '2025-05-01T10:30:00'
  },
  {
    id: '2',
    userId: '3',
    userName: 'Rhythm Productions',
    userAvatar: 'https://i.pravatar.cc/150?img=4',
    type: 'need',
    title: 'Sound Engineer Needed for Summer Festival',
    description: 'Looking for an experienced sound engineer for our annual summer music festival. Multiple stages, various genres.',
    category: 'Sound Engineer',
    location: 'Austin, TX',
    dateTime: '2025-07-10T08:00:00',
    rate: '$500/day',
    skills: ['Live Sound Mixing', 'Equipment Setup', 'Troubleshooting'],
    createdAt: '2025-05-02T14:15:00'
  },
  {
    id: '3',
    userId: '2',
    userName: 'Mike Johnson',
    userAvatar: 'https://i.pravatar.cc/150?img=3',
    type: 'offer',
    title: 'Live Sound Engineering Services',
    description: 'Professional sound engineer available for live events, concerts, and festivals. Full equipment setup provided.',
    category: 'Sound Engineer',
    location: 'Los Angeles, CA',
    dateTime: '2025-06-20T17:00:00',
    rate: '$450/event',
    skills: ['Live Mixing', 'Equipment Setup', 'Acoustic Optimization'],
    genres: ['All genres'],
    createdAt: '2025-05-01T16:20:00'
  },
  {
    id: '4',
    userId: '4',
    userName: 'Sound Wave Studios',
    userAvatar: 'https://i.pravatar.cc/150?img=7',
    type: 'need',
    title: 'Seeking Session Musicians for Recording',
    description: 'Need experienced session musicians (guitar, bass, drums) for a pop album recording project.',
    category: 'Musicians',
    location: 'Nashville, TN',
    dateTime: '2025-06-05T09:00:00',
    rate: '$250/session',
    skills: ['Session Recording', 'Sight Reading', 'Improvisation'],
    genres: ['Pop', 'Rock'],
    createdAt: '2025-05-03T11:45:00'
  },
  {
    id: '5',
    userId: '3',
    userName: 'Rhythm Productions',
    userAvatar: 'https://i.pravatar.cc/150?img=4',
    type: 'need',
    title: 'Lighting Technician for Concert Series',
    description: 'Seeking experienced lighting technician for our summer concert series. Knowledge of modern lighting systems required.',
    category: 'Lighting',
    location: 'Austin, TX',
    dateTime: '2025-07-01T16:00:00',
    rate: '$350/event',
    skills: ['DMX Programming', 'Lighting Design', 'Technical Setup'],
    createdAt: '2025-05-02T09:30:00'
  },
  {
    id: '6',
    userId: '1',
    userName: 'Jane Smith',
    userAvatar: 'https://i.pravatar.cc/150?img=1',
    type: 'offer',
    title: 'Songwriting Collaboration',
    description: 'Experienced songwriter available for collaboration projects. Specializing in jazz and blues compositions.',
    category: 'Songwriter',
    location: 'Remote / New York, NY',
    dateTime: 'Flexible',
    rate: 'Negotiable',
    skills: ['Songwriting', 'Composition', 'Lyrics'],
    genres: ['Jazz', 'Blues', 'Soul'],
    createdAt: '2025-05-04T08:15:00'
  }
];

// Mock Bids (Matches)
export const mockBids: Bid[] = [
  {
    id: '1',
    needId: '2',
    offerId: '3',
    needTitle: 'Sound Engineer Needed for Summer Festival',
    offerTitle: 'Live Sound Engineering Services',
    needUserId: '3',
    offerUserId: '2',
    needUserName: 'Rhythm Productions',
    offerUserName: 'Mike Johnson',
    needUserAvatar: 'https://i.pravatar.cc/150?img=4',
    offerUserAvatar: 'https://i.pravatar.cc/150?img=3',
    status: 'pending',
    createdAt: '2025-05-04T10:15:00',
    isAutomatic: true
  },
  {
    id: '2',
    needId: '4',
    offerId: '6',
    needTitle: 'Seeking Session Musicians for Recording',
    offerTitle: 'Songwriting Collaboration',
    needUserId: '4',
    offerUserId: '1',
    needUserName: 'Sound Wave Studios',
    offerUserName: 'Jane Smith',
    needUserAvatar: 'https://i.pravatar.cc/150?img=7',
    offerUserAvatar: 'https://i.pravatar.cc/150?img=1',
    status: 'accepted',
    createdAt: '2025-05-04T11:30:00',
    isAutomatic: false
  }
];

export const currentUser: User = {
  id: '1',
  name: 'Jane Smith',
  email: 'jane@example.com',
  userType: 'individual',
  avatar: 'https://i.pravatar.cc/150?img=1',
  bio: 'Professional vocalist with 8 years of experience in jazz and blues',
  location: 'New York, NY',
  skills: ['Vocals', 'Piano', 'Songwriting'],
  genres: ['Jazz', 'Blues', 'Soul']
};
