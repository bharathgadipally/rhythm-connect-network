
import { User, Listing, Bid, Message } from "@/types";

// Current user (for testing purposes)
export const currentUser: User = {
  id: "user1",
  name: "Alex Johnson",
  email: "alex@example.com",
  userType: "individual",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  bio: "Professional guitarist with 10 years of experience in rock and jazz.",
  location: "Los Angeles, CA",
  skills: ["Guitar", "Vocals", "Music Production"],
  genres: ["Rock", "Jazz", "Blues"]
};

// Music-related images for listings
const musicImages = [
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", // Music studio
  "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", // Live performance
  "https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", // Guitar
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", // DJ setup
  "https://images.unsplash.com/photo-1501612780327-45045538702b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", // Concert crowd
  "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", // Piano keyboard
];

// Get 2-3 random images from the pool
const getRandomImages = () => {
  const shuffled = [...musicImages].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * 2) + 2); // 2-3 images
};

// Sample listings data
export const mockListings: Listing[] = [
  {
    id: "1",
    userId: "user2",
    userName: "Emily White",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00d5a4ee9baa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "need" as const,
    title: "Looking for a drummer for a rock band",
    description: "We are a rock band based in downtown looking for a skilled drummer to join us. Gigs are usually on weekends.",
    category: "Musicians",
    location: "Downtown",
    dateTime: "2024-08-15T19:00:00",
    rate: "$50/hour",
    skills: ["Drumming", "Rock", "Live Performance"],
    genres: ["Rock"],
    createdAt: "2024-07-05T10:00:00",
    eventType: "Gig",
    duration: "3 hours",
    audienceSize: "50-100",
    experienceLevel: "Intermediate",
    equipmentRequired: true
  },
  {
    id: "2",
    userId: "user3",
    userName: "David Lee",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd8a72f9d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "offer" as const,
    title: "Offering guitar lessons",
    description: "Experienced guitar teacher offering lessons for all levels. I specialize in rock, blues, and jazz.",
    category: "Lessons",
    location: "Online",
    dateTime: "2024-07-20T14:00:00",
    rate: "$40/hour",
    skills: ["Guitar", "Teaching", "Music Theory"],
    genres: ["Rock", "Blues", "Jazz"],
    createdAt: "2024-07-06T14:30:00",
  },
  {
    id: "3",
    userId: "user1",
    userName: "Alex Johnson",
    userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "need" as const,
    title: "Need a sound engineer for a live show",
    description: "We are looking for a professional sound engineer for our upcoming live show at The Roxy. Must have experience with live sound.",
    category: "Sound Engineering",
    location: "The Roxy",
    dateTime: "2024-08-25T20:00:00",
    rate: "$60/hour",
    skills: ["Sound Engineering", "Live Sound", "Mixing"],
    genres: ["Rock", "Pop"],
    createdAt: "2024-07-07T09:15:00",
  },
  {
    id: "4",
    userId: "user4",
    userName: "Sophia Brown",
    userAvatar: "https://images.unsplash.com/photo-1502823403499-6ccfcf4cdca9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "offer" as const,
    title: "Professional DJ for events",
    description: "I am a professional DJ with 5 years of experience. I can provide music for weddings, parties, and corporate events.",
    category: "DJ",
    location: "Mobile",
    dateTime: "2024-07-27T21:00:00",
    rate: "$75/hour",
    skills: ["DJ", "Mixing", "Event Planning"],
    genres: ["Pop", "Hip Hop", "Electronic"],
    createdAt: "2024-07-08T16:45:00",
  },
  {
    id: "5",
    userId: "user5",
    userName: "Ryan Chen",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "need" as const,
    title: "Looking for a vocalist for an acoustic set",
    description: "We are looking for a vocalist to perform an acoustic set at a local cafe. Must have experience with acoustic music.",
    category: "Musicians",
    location: "Local Cafe",
    dateTime: "2024-08-03T18:30:00",
    rate: "$45/hour",
    skills: ["Vocals", "Acoustic Music", "Live Performance"],
    genres: ["Acoustic", "Folk"],
    createdAt: "2024-07-09T11:20:00",
  },
  {
    id: "6",
    userId: "user2",
    userName: "Emily White",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00d5a4ee9baa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "offer" as const,
    title: "Offering bass guitar lessons",
    description: "Experienced bass guitar teacher offering lessons for all levels. I specialize in rock, funk, and blues.",
    category: "Lessons",
    location: "Online",
    dateTime: "2024-07-22T15:00:00",
    rate: "$35/hour",
    skills: ["Bass Guitar", "Teaching", "Music Theory"],
    genres: ["Rock", "Funk", "Blues"],
    createdAt: "2024-07-10T13:55:00",
  },
  {
    id: "7",
    userId: "user3",
    userName: "David Lee",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd8a72f9d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "need" as const,
    title: "Need a keyboardist for a jazz band",
    description: "We are a jazz band based in uptown looking for a skilled keyboardist to join us. Gigs are usually on weekends.",
    category: "Musicians",
    location: "Uptown",
    dateTime: "2024-08-17T20:00:00",
    rate: "$55/hour",
    skills: ["Keyboard", "Jazz", "Live Performance"],
    genres: ["Jazz"],
    createdAt: "2024-07-11T10:30:00",
  },
  {
    id: "8",
    userId: "user4",
    userName: "Sophia Brown",
    userAvatar: "https://images.unsplash.com/photo-1502823403499-6ccfcf4cdca9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "offer" as const,
    title: "Offering vocal lessons",
    description: "Experienced vocal teacher offering lessons for all levels. I specialize in pop, R&B, and soul.",
    category: "Lessons",
    location: "Online",
    dateTime: "2024-07-24T16:00:00",
    rate: "$45/hour",
    skills: ["Vocals", "Teaching", "Music Theory"],
    genres: ["Pop", "R&B", "Soul"],
    createdAt: "2024-07-12T14:00:00",
  },
  {
    id: "9",
    userId: "user5",
    userName: "Ryan Chen",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "need" as const,
    title: "Need a drummer for a pop band",
    description: "We are a pop band based in midtown looking for a skilled drummer to join us. Gigs are usually on weekends.",
    category: "Musicians",
    location: "Midtown",
    dateTime: "2024-08-19T19:30:00",
    rate: "$50/hour",
    skills: ["Drumming", "Pop", "Live Performance"],
    genres: ["Pop"],
    createdAt: "2024-07-13T09:45:00",
  },
  {
    id: "10",
    userId: "user1",
    userName: "Alex Johnson",
    userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    type: "offer" as const,
    title: "Offering music production services",
    description: "Experienced music producer offering services for all genres. I can help you with recording, mixing, and mastering.",
    category: "Music Production",
    location: "Online",
    dateTime: "2024-07-26T17:00:00",
    rate: "$60/hour",
    skills: ["Music Production", "Recording", "Mixing", "Mastering"],
    genres: ["All"],
    createdAt: "2024-07-14T15:20:00",
  },
].map(listing => ({
  ...listing,
  images: getRandomImages()
}));

// Sample bids/matches data
export const mockBids: Bid[] = [
  {
    id: "bid1",
    needId: "1",
    offerId: "6",
    needTitle: "Looking for a drummer for a rock band",
    offerTitle: "Offering bass guitar lessons",
    needUserId: "user2",
    offerUserId: "user2",
    needUserName: "Emily White",
    offerUserName: "Emily White",
    needUserAvatar: "https://images.unsplash.com/photo-1500648767791-00d5a4ee9baa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    offerUserAvatar: "https://images.unsplash.com/photo-1500648767791-00d5a4ee9baa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    status: "pending",
    createdAt: "2024-07-15T10:00:00",
    isAutomatic: false
  },
  {
    id: "bid2",
    needId: "3",
    offerId: "10",
    needTitle: "Need a sound engineer for a live show",
    offerTitle: "Offering music production services",
    needUserId: "user1",
    offerUserId: "user1",
    needUserName: "Alex Johnson",
    offerUserName: "Alex Johnson",
    needUserAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    offerUserAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    status: "accepted",
    createdAt: "2024-07-16T14:30:00",
    isAutomatic: true
  },
  {
    id: "bid3",
    needId: "5",
    offerId: "8",
    needTitle: "Looking for a vocalist for an acoustic set",
    offerTitle: "Offering vocal lessons",
    needUserId: "user5",
    offerUserId: "user4",
    needUserName: "Ryan Chen",
    offerUserName: "Sophia Brown",
    needUserAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    offerUserAvatar: "https://images.unsplash.com/photo-1502823403499-6ccfcf4cdca9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    status: "pending",
    createdAt: "2024-07-17T09:15:00",
    isAutomatic: false
  },
];

// Sample messages data
export const mockMessages: Message[] = [
  {
    id: "msg1",
    matchId: "bid2",
    senderId: "user1",
    senderName: "Alex Johnson",
    senderAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    text: "Hey! I'm excited to work with you on this project.",
    timestamp: "2024-07-16T15:00:00"
  },
  {
    id: "msg2",
    matchId: "bid2",
    senderId: "user3",
    senderName: "David Lee",
    senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd8a72f9d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    text: "Great to hear! Let's discuss the details.",
    timestamp: "2024-07-16T15:15:00"
  },
];

