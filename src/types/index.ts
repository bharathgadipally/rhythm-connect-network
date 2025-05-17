
export type UserType = 'individual' | 'company';

export interface User {
  id: string;
  name: string;
  email: string;
  userType: UserType;
  avatar?: string;
  bio?: string;
  location?: string;
  skills?: string[];
  genres?: string[];
}

export type ListingType = 'need' | 'offer';

export interface Listing {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  type: ListingType;
  title: string;
  description: string;
  category: string;
  location: string;
  dateTime: string;
  rate: string;
  skills?: string[];
  genres?: string[];
  createdAt: string;
  // Adding images array for the carousel
  images?: string[];
  // Other properties
  eventType?: string;
  duration?: string;
  audienceSize?: string;
  experienceLevel?: string;
  equipmentRequired?: boolean;
}

export interface Bid {
  id: string;
  needId?: string;
  offerId?: string;
  needTitle?: string;
  offerTitle?: string;
  needUserId?: string;
  offerUserId?: string;
  needUserName?: string;
  offerUserName?: string;
  needUserAvatar?: string;
  offerUserAvatar?: string;
  status: 'initial' | 'pending' | 'accepted' | 'rejected' | 'contracted';
  createdAt: string;
  isAutomatic: boolean;
}

export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  text: string;
  timestamp: string;
}
