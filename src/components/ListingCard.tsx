
import { Calendar, Clock, MapPin, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Listing } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

interface ListingCardProps {
  listing: Listing;
  showActions?: boolean;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, showActions = true }) => {
  const navigate = useNavigate();
  const isOffer = listing.type === "offer";
  
  const formattedDate = new Date(listing.dateTime).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  
  const formattedTime = new Date(listing.dateTime).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  
  const timeSince = formatDistanceToNow(new Date(listing.createdAt), { addSuffix: true });
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all">
      <CardHeader className={`pb-3 ${isOffer ? "bg-music-primary/10" : "bg-music-orange/10"}`}>
        <div className="flex items-center justify-between">
          <Badge variant={isOffer ? "default" : "outline"} className={isOffer ? "bg-music-primary" : "text-music-orange border-music-orange"}>
            {isOffer ? "OFFER" : "NEED"}
          </Badge>
          <span className="text-sm text-muted-foreground">{timeSince}</span>
        </div>
        <CardTitle className="text-xl mt-2">{listing.title}</CardTitle>
        <div className="flex items-center mt-2">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={listing.userAvatar} alt={listing.userName} />
            <AvatarFallback>{listing.userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{listing.userName}</span>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <CardDescription className="mb-4 line-clamp-2">
          {listing.description}
        </CardDescription>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <Tag className="h-4 w-4 mr-2 text-gray-500" />
            <span>{listing.category}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
            <span>{listing.location}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-gray-500" />
            <span>{formattedTime}</span>
          </div>
          <div className="font-semibold mt-2">
            Rate: {listing.rate}
          </div>
        </div>
        
        {listing.skills && listing.skills.length > 0 && (
          <div className="mt-4">
            <div className="flex flex-wrap gap-1">
              {listing.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      
      {showActions && (
        <CardFooter className="flex justify-between pt-4 border-t">
          <Button 
            variant="outline"
            onClick={() => navigate(`/listings/${listing.id}`)}
          >
            View Details
          </Button>
          <Button 
            onClick={() => navigate(`/bid/${listing.id}`)}
            className={isOffer ? "bg-music-orange hover:bg-music-orange/80" : "bg-music-primary hover:bg-music-secondary"}
          >
            {isOffer ? "Request to Hire" : "Offer Services"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ListingCard;
