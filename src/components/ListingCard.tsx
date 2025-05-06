
import { Calendar, Clock, MapPin, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Listing } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ListingCardProps {
  listing: Listing;
  showActions?: boolean;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, showActions = true }) => {
  const navigate = useNavigate();
  const isOffer = listing.type === "offer";
  
  const formattedDate = new Date(listing.dateTime).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  
  const formattedTime = new Date(listing.dateTime).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  
  const timeSince = formatDistanceToNow(new Date(listing.createdAt), { addSuffix: true });
  
  // Default placeholder images if no images are provided
  const defaultImages = [
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  ];
  
  // Use listing images if available, otherwise use defaults
  const images = listing.images && listing.images.length > 0 ? listing.images : defaultImages;
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all h-full flex flex-col">
      {/* Removed the 'relative' div wrapper that was causing the gap */}
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <AspectRatio ratio={16/9} className="max-h-[180px]">
                <img
                  src={image}
                  alt={`${listing.title} - image ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
          </>
        )}
      </Carousel>
      
      <CardHeader className={`pb-2 pt-3 ${isOffer ? "bg-music-primary/10" : "bg-music-orange/10"}`}>
        <div className="flex items-center justify-between mb-1">
          <Badge variant={isOffer ? "default" : "outline"} className={isOffer ? "bg-music-primary" : "text-music-orange border-music-orange"}>
            {isOffer ? "OFFER" : "NEED"}
          </Badge>
          <span className="text-xs text-muted-foreground">{timeSince}</span>
        </div>
        <CardTitle className="text-lg mb-1 line-clamp-1">{listing.title}</CardTitle>
        <div className="flex items-center">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarImage src={listing.userAvatar} alt={listing.userName} />
            <AvatarFallback>{listing.userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-xs font-medium">{listing.userName}</span>
        </div>
      </CardHeader>
      
      <CardContent className="pt-2 pb-3 flex-grow">
        <CardDescription className="mb-2 line-clamp-2 text-xs">
          {listing.description}
        </CardDescription>
        
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
          <div className="flex items-center">
            <Tag className="h-3 w-3 mr-1 text-gray-500 flex-shrink-0" />
            <span className="truncate">{listing.category}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-3 w-3 mr-1 text-gray-500 flex-shrink-0" />
            <span className="truncate">{listing.location}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1 text-gray-500 flex-shrink-0" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1 text-gray-500 flex-shrink-0" />
            <span>{formattedTime}</span>
          </div>
        </div>
        
        <div className="font-medium text-sm mt-2">
          Rate: {listing.rate}
        </div>
        
        {listing.skills && listing.skills.length > 0 && (
          <div className="mt-2">
            <div className="flex flex-wrap gap-1">
              {listing.skills.slice(0, 2).map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 text-xs py-0 px-1.5">
                  {skill}
                </Badge>
              ))}
              {listing.skills.length > 2 && (
                <Badge variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 text-xs py-0 px-1.5">
                  +{listing.skills.length - 2}
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
      
      {showActions && (
        <CardFooter className="flex justify-between pt-2 pb-3 border-t mt-auto">
          <Button 
            variant="outline"
            onClick={() => navigate(`/listings/${listing.id}`)}
            size="sm"
            className="text-xs h-8"
          >
            View Details
          </Button>
          <Button 
            onClick={() => navigate(`/bid/${listing.id}`)}
            className={`text-xs h-8 ${isOffer ? "bg-music-orange hover:bg-music-orange/80" : "bg-music-primary hover:bg-music-secondary"}`}
            size="sm"
          >
            {isOffer ? "Request to Hire" : "Offer Services"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ListingCard;
