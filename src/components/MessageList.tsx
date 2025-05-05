
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { formatDistanceToNow } from "date-fns";

interface Message {
  id: string;
  matchId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  text: string;
  timestamp: string;
}

// Mock messages data
const mockMessages: Message[] = [
  {
    id: '1',
    matchId: '1',
    senderId: '1', // current user id
    senderName: 'John Doe',
    senderAvatar: '/placeholder.svg',
    text: "Hi there! I'm interested in your offer. When can we discuss more details?",
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString() // 24 hours ago
  },
  {
    id: '2',
    matchId: '1',
    senderId: '2',
    senderName: 'Jane Smith',
    senderAvatar: '/placeholder.svg',
    text: "Hello! Thanks for reaching out. I'm available tomorrow afternoon for a call.",
    timestamp: new Date(Date.now() - 3600000 * 12).toISOString() // 12 hours ago
  },
  {
    id: '3',
    matchId: '1',
    senderId: '1', // current user id
    senderName: 'John Doe',
    senderAvatar: '/placeholder.svg',
    text: "Perfect! Let's connect at 3 PM then.",
    timestamp: new Date(Date.now() - 3600000 * 6).toISOString() // 6 hours ago
  },
  {
    id: '4',
    matchId: '2',
    senderId: '1',
    senderName: 'John Doe',
    senderAvatar: '/placeholder.svg',
    text: "Hello, I'd like to discuss your requirements in more detail.",
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString() // 2 hours ago
  }
];

interface MessageListProps {
  matchId: string;
}

const MessageList: React.FC<MessageListProps> = ({ matchId }) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchMessages = () => {
      try {
        // Filter messages for this match
        const matchMessages = mockMessages.filter(msg => msg.matchId === matchId);
        setMessages(matchMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    
    fetchMessages();
    
    // In a real app, you might set up a websocket or polling here
    const intervalId = setInterval(fetchMessages, 10000);
    
    return () => clearInterval(intervalId);
  }, [matchId]);

  if (messages.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        <p className="text-gray-500 dark:text-gray-400">
          No messages yet. Start the conversation!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => {
        const isCurrentUser = message.senderId === '1'; // In real app use currentUser.uid
        
        return (
          <div 
            key={message.id}
            className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-2 max-w-[80%]`}>
              <Avatar className="h-8 w-8">
                <AvatarImage src={message.senderAvatar} />
                <AvatarFallback>{message.senderName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} items-center gap-2 mb-1`}>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                  </span>
                  <span className="text-sm font-medium">{message.senderName}</span>
                </div>
                <div 
                  className={`rounded-lg px-4 py-2 ${
                    isCurrentUser 
                      ? 'bg-music-primary/90 text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
