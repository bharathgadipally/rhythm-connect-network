
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, isValid, parseISO } from "date-fns";
import { ArrowLeft, Calendar, Clock, MapPin, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Bid, Listing } from "@/types";
import { mockBids, mockListings } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { formatDistanceToNow } from "date-fns";
import MessageList from "@/components/MessageList";

// Helper function to safely format dates
const safeFormatDate = (dateStr: string | undefined, formatStr: string) => {
  if (!dateStr) return "N/A";
  
  try {
    const date = parseISO(dateStr);
    if (!isValid(date)) return "Invalid date";
    return format(date, formatStr);
  } catch (error) {
    console.error("Date formatting error:", error);
    return "Invalid date";
  }
};

const MatchDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [bid, setBid] = useState<Bid | null>(null);
  const [needListing, setNeedListing] = useState<Listing | null>(null);
  const [offerListing, setOfferListing] = useState<Listing | null>(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchBidAndListings = () => {
      setIsLoading(true);
      try {
        const foundBid = mockBids.find(item => item.id === id);
        if (foundBid) {
          setBid(foundBid);
          
          // Find the associated need and offer listings
          if (foundBid.needId) {
            const need = mockListings.find(listing => listing.id === foundBid.needId);
            setNeedListing(need || null);
          }
          
          if (foundBid.offerId) {
            const offer = mockListings.find(listing => listing.id === foundBid.offerId);
            setOfferListing(offer || null);
          }
        } else {
          // Handle not found
          console.error("Match not found");
        }
      } catch (error) {
        console.error("Error fetching match:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBidAndListings();
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!bid) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Match Not Found</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              The match you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate("/matches")}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Matches
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  let timeSince = "";
  try {
    timeSince = formatDistanceToNow(parseISO(bid.createdAt), { addSuffix: true });
  } catch (error) {
    console.error("Error formatting time distance:", error);
    timeSince = "some time ago";
  }
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // In a real app, this would send the message to an API
    toast.success("Message sent successfully");
    setMessage("");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb navigation */}
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/matches")}
              className="text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Matches
            </Button>
          </div>
          
          {/* Match header */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div className="flex items-center">
                <Badge 
                  variant={bid.isAutomatic ? "default" : "outline"} 
                  className={bid.isAutomatic ? "bg-amber-500" : "mr-3"}
                >
                  {bid.isAutomatic ? "AUTOMATIC MATCH" : "MANUAL REQUEST"}
                </Badge>
                <Badge 
                  variant="secondary" 
                  className={`ml-2 ${
                    bid.status === 'pending' ? 'bg-amber-100 text-amber-800' : 
                    bid.status === 'accepted' ? 'bg-green-100 text-green-800' : 
                    'bg-red-100 text-red-800'} dark:bg-opacity-20`
                  }
                >
                  {bid.status.toUpperCase()}
                </Badge>
              </div>
              
              <div className="text-sm text-muted-foreground mt-2 md:mt-0">
                Created {timeSince}
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-6">Match Details</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Need Card */}
              <Card className="overflow-hidden border-music-orange/30 bg-music-orange/5">
                <CardHeader className="pb-3">
                  <Badge variant="outline" className="w-fit mb-2 text-music-orange border-music-orange">NEED</Badge>
                  <CardTitle className="text-xl">{bid.needTitle || "Need Title"}</CardTitle>
                  <div className="flex items-center mt-2">
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarImage src={bid.needUserAvatar} alt={bid.needUserName} />
                      <AvatarFallback>{bid.needUserName?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{bid.needUserName || "User"}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {needListing ? (
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300">{needListing.description}</p>
                      
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{needListing.location}</span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{safeFormatDate(needListing.dateTime, "PPP")}</span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{safeFormatDate(needListing.dateTime, "p")}</span>
                      </div>
                      
                      <div className="font-medium text-sm">Rate: {needListing.rate}</div>
                      
                      {needListing.skills && needListing.skills.length > 0 && (
                        <div>
                          <div className="text-sm font-medium mb-2">Required Skills:</div>
                          <div className="flex flex-wrap gap-2">
                            {needListing.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500">Need details not available</div>
                  )}
                </CardContent>
              </Card>
              
              {/* Offer Card */}
              <Card className="overflow-hidden border-music-primary/30 bg-music-primary/5">
                <CardHeader className="pb-3">
                  <Badge className="w-fit mb-2 bg-music-primary">OFFER</Badge>
                  <CardTitle className="text-xl">{bid.offerTitle || "Offer Title"}</CardTitle>
                  <div className="flex items-center mt-2">
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarImage src={bid.offerUserAvatar} alt={bid.offerUserName} />
                      <AvatarFallback>{bid.offerUserName?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{bid.offerUserName || "User"}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {offerListing ? (
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300">{offerListing.description}</p>
                      
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{offerListing.location}</span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{safeFormatDate(offerListing.dateTime, "PPP")}</span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{safeFormatDate(offerListing.dateTime, "p")}</span>
                      </div>
                      
                      <div className="font-medium text-sm">Rate: {offerListing.rate}</div>
                      
                      {offerListing.skills && offerListing.skills.length > 0 && (
                        <div>
                          <div className="text-sm font-medium mb-2">Skills:</div>
                          <div className="flex flex-wrap gap-2">
                            {offerListing.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500">Offer details not available</div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Messaging Section */}
          {bid.status === 'accepted' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Messages</h2>
              
              <div className="mb-6">
                <MessageList matchId={bid.id} />
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex gap-2">
                <Textarea
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} className="bg-music-primary hover:bg-music-secondary">
                  <Send className="h-4 w-4 mr-2" /> Send
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MatchDetail;
