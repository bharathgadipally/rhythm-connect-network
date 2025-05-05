
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockListings } from "@/data/mockData";
import { Listing } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Calendar, Clock, Heart, MapPin, Share2, Tag, User } from "lucide-react";

const ListingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [listing, setListing] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchListing = () => {
      setIsLoading(true);
      try {
        const foundListing = mockListings.find(item => item.id === id);
        if (foundListing) {
          setListing(foundListing);
        } else {
          // Handle not found
          console.error("Listing not found");
        }
      } catch (error) {
        console.error("Error fetching listing:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchListing();
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
  
  if (!listing) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Listing Not Found</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              The listing you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate("/listings")}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Listings
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const isOffer = listing.type === "offer";
  
  const formattedDate = new Date(listing.dateTime).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const formattedTime = new Date(listing.dateTime).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  
  const isOwner = currentUser && listing.userId === currentUser.uid;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb navigation */}
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/listings")}
              className="text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Listings
            </Button>
          </div>
          
          {/* Listing header */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div className="flex items-center">
                <Badge variant={isOffer ? "default" : "outline"} className={isOffer ? "bg-music-primary" : "text-music-orange border-music-orange mr-3"}>
                  {isOffer ? "OFFER" : "NEED"}
                </Badge>
                <Badge variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                  {listing.category}
                </Badge>
              </div>
              
              <div className="flex space-x-2 mt-4 md:mt-0">
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{listing.title}</h1>
            
            <div className="flex items-center mb-6">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={listing.userAvatar} alt={listing.userName} />
                <AvatarFallback>{listing.userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{listing.userName}</div>
                <div className="text-sm text-gray-500">Posted on {new Date(listing.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                <span>{listing.location}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-gray-500" />
                <span>{formattedTime}</span>
              </div>
            </div>
            
            <div className="font-semibold text-xl mb-2">
              Rate: {listing.rate}
            </div>
            
            {listing.skills && listing.skills.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Required Skills:</h3>
                <div className="flex flex-wrap gap-2">
                  {listing.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Listing details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="requirements">Requirements</TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4">Description</h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="whitespace-pre-line">
                      {listing.description}
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="details" className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4">Additional Details</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">Event Type:</h3>
                      <p>{listing.eventType || "Not specified"}</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Duration:</h3>
                      <p>{listing.duration || "Not specified"}</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Audience Size:</h3>
                      <p>{listing.audienceSize || "Not specified"}</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="requirements" className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">Experience Level:</h3>
                      <p>{listing.experienceLevel || "Not specified"}</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Equipment Required:</h3>
                      <p>{listing.equipmentRequired ? "Yes" : "No"}</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Contact & Action</CardTitle>
                  <CardDescription>
                    {isOffer 
                      ? "Interested in this offer? Request to hire now!" 
                      : "Can you help with this need? Offer your services!"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isOwner ? (
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-blue-600 dark:text-blue-300 mb-4">
                      <p>This is your listing. You can edit or delete it.</p>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => navigate(`/bid/${listing.id}`)}
                      className={isOffer ? "w-full bg-music-orange hover:bg-music-orange/80" : "w-full bg-music-primary hover:bg-music-secondary"}
                    >
                      {isOffer ? "Request to Hire" : "Offer Services"}
                    </Button>
                  )}
                  
                  {isOwner && (
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => navigate(`/edit/${listing.id}`)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        className="flex-1"
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                  
                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-2">Contact Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{listing.userName}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{listing.location}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Similar listings would go here */}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ListingDetail;
