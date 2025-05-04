
import { useState } from "react";
import { Calendar, Check, Clock, MapPin, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bid } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

interface BidCardProps {
  bid: Bid;
}

const BidCard: React.FC<BidCardProps> = ({ bid }) => {
  const [status, setStatus] = useState(bid.status);
  const isAutomatic = bid.isAutomatic;
  const isUserOffer = bid.offerUserId === '1'; // Assuming current user has ID '1'
  const timeSince = formatDistanceToNow(new Date(bid.createdAt), { addSuffix: true });
  
  const handleAccept = () => {
    setStatus('accepted');
    toast.success("Bid accepted successfully");
  };
  
  const handleReject = () => {
    setStatus('rejected');
    toast.success("Bid rejected");
  };
  
  return (
    <Card className={`overflow-hidden transition-all ${
      status === 'accepted' 
        ? 'border-green-500/50 shadow-green-500/10' 
        : status === 'rejected' 
          ? 'border-red-500/50 shadow-red-500/10 opacity-75' 
          : 'hover:shadow-lg'
    }`}>
      <CardHeader className="pb-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="flex items-center justify-between">
          <Badge variant={isAutomatic ? "default" : "outline"} className={isAutomatic ? "bg-amber-500" : ""}>
            {isAutomatic ? "AUTOMATIC MATCH" : "MANUAL REQUEST"}
          </Badge>
          <span className="text-sm text-muted-foreground">{timeSince}</span>
        </div>
        <CardTitle className="text-xl mt-2">
          {isUserOffer ? "Your offer matches a need" : "Your need matches an offer"}
        </CardTitle>
        <div className="flex items-center mt-2 space-x-1">
          <Badge variant="secondary" className={`${status === 'pending' ? 'bg-amber-100 text-amber-800' : 
            status === 'accepted' ? 'bg-green-100 text-green-800' : 
            'bg-red-100 text-red-800'} dark:bg-opacity-20`}>
            {status.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Need Side */}
          <div className="bg-music-orange/5 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center">
              <Badge variant="outline" className="mr-2 text-music-orange border-music-orange">NEED</Badge>
              {bid.needTitle}
            </h3>
            <div className="flex items-center mb-3">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src={bid.needUserAvatar} alt={bid.needUserName} />
                <AvatarFallback>{bid.needUserName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{bid.needUserName}</span>
            </div>
          </div>
          
          {/* Offer Side */}
          <div className="bg-music-primary/5 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center">
              <Badge className="mr-2 bg-music-primary">OFFER</Badge>
              {bid.offerTitle}
            </h3>
            <div className="flex items-center mb-3">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src={bid.offerUserAvatar} alt={bid.offerUserName} />
                <AvatarFallback>{bid.offerUserName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{bid.offerUserName}</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      {status === 'pending' && !isUserOffer && (
        <CardFooter className="flex justify-between pt-4 border-t">
          <Button 
            variant="outline" 
            onClick={handleReject}
            className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <X className="mr-1 h-4 w-4" /> Reject
          </Button>
          <Button 
            onClick={handleAccept}
            className="bg-green-600 hover:bg-green-700"
          >
            <Check className="mr-1 h-4 w-4" /> Accept
          </Button>
        </CardFooter>
      )}
      
      {status === 'pending' && isUserOffer && (
        <CardFooter className="pt-4 border-t">
          <p className="text-sm text-muted-foreground">Waiting for response from the other party</p>
        </CardFooter>
      )}
      
      {status === 'accepted' && (
        <CardFooter className="pt-4 border-t bg-green-50 dark:bg-green-900/20">
          <div className="w-full flex items-center justify-between">
            <span className="text-sm font-medium text-green-700 dark:text-green-400">Match accepted</span>
            <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
              Message
            </Button>
          </div>
        </CardFooter>
      )}
      
      {status === 'rejected' && (
        <CardFooter className="pt-4 border-t bg-red-50 dark:bg-red-900/20">
          <span className="text-sm font-medium text-red-600 dark:text-red-400">Match rejected</span>
        </CardFooter>
      )}
    </Card>
  );
};

export default BidCard;
