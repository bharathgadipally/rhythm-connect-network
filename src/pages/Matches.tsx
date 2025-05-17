
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockBids, mockListings, currentUser } from "@/data/mockData";
import { Bid, Listing } from "@/types";
import { 
  Card, 
  CardContent, 
  CardDescription,
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, Clock, Search, X } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

// Type for grouped matches
type GroupedMatches = {
  [listingId: string]: {
    listing: Listing;
    bids: Bid[];
  };
};

const Matches = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [expandedListing, setExpandedListing] = useState<string | null>(null);
  
  // Filter bids/matches for current user
  const userBids = mockBids.filter(bid => 
    bid.needUserId === currentUser.id || bid.offerUserId === currentUser.id
  );
  
  // Get status filtered bids
  const pendingBids = userBids.filter(bid => bid.status === "pending");
  const acceptedBids = userBids.filter(bid => bid.status === "accepted");
  const rejectedBids = userBids.filter(bid => bid.status === "rejected"); // Adding rejected status
  const initialBids = userBids.filter(bid => !bid.status || bid.status === "initial"); // Adding initial status
  const contractedBids = userBids.filter(bid => bid.status === "contracted"); // Adding contracted status
  
  // Group matches based on the need or offer that the user created
  const getUserListings = () => {
    return mockListings.filter(listing => listing.userId === currentUser.id);
  };

  // Get the appropriate bids based on the active tab
  const getFilteredBids = (): Bid[] => {
    switch (activeTab) {
      case "pending":
        return pendingBids;
      case "accepted":
        return acceptedBids;
      case "rejected":
        return rejectedBids;
      case "initial":
        return initialBids;
      case "contracted":
        return contractedBids;
      default:
        return userBids;
    }
  };
  
  // Group bids by the listing they belong to
  const groupBidsByListing = (bids: Bid[]): GroupedMatches => {
    const userListings = getUserListings();
    const groupedMatches: GroupedMatches = {};
    
    // Initialize groups with user listings
    userListings.forEach(listing => {
      groupedMatches[listing.id] = {
        listing,
        bids: []
      };
    });
    
    // Assign bids to their respective listings
    bids.forEach(bid => {
      const listingId = bid.needId || bid.offerId;
      if (listingId && groupedMatches[listingId]) {
        groupedMatches[listingId].bids.push(bid);
      }
    });
    
    // Remove listings with no bids
    Object.keys(groupedMatches).forEach(id => {
      if (groupedMatches[id].bids.length === 0) {
        delete groupedMatches[id];
      }
    });
    
    return groupedMatches;
  };
  
  const groupedMatches = groupBidsByListing(getFilteredBids());
  
  const toggleExpandListing = (listingId: string) => {
    if (expandedListing === listingId) {
      setExpandedListing(null);
    } else {
      setExpandedListing(listingId);
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return <Check className="h-4 w-4 text-green-500" />;
      case "rejected":
        return <X className="h-4 w-4 text-red-500" />;
      case "contracted":
        return <Badge className="bg-blue-500">Contracted</Badge>;
      case "initial":
      case "pending":
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Your Matches</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Manage your connections and opportunities
              </p>
            </div>
            <div className="flex items-center">
              <Button variant="outline" className="mr-2">
                <Search className="h-4 w-4 mr-2" /> Filter
              </Button>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Matches</TabsTrigger>
              <TabsTrigger value="initial">Initial ({initialBids.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({pendingBids.length})</TabsTrigger>
              <TabsTrigger value="accepted">Accepted ({acceptedBids.length})</TabsTrigger>
              <TabsTrigger value="rejected">Rejected ({rejectedBids.length})</TabsTrigger>
              <TabsTrigger value="contracted">Contracted ({contractedBids.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab}>
              {Object.keys(groupedMatches).length === 0 ? (
                <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <h3 className="text-xl font-semibold mb-2">No matches found</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    {activeTab === "pending" ? 
                      "You don't have any pending matches at the moment." :
                     activeTab === "accepted" ? 
                      "You don't have any accepted matches yet." :
                     activeTab === "rejected" ?
                      "You don't have any rejected matches." :
                     activeTab === "initial" ?
                      "You don't have any initial matches." :
                     activeTab === "contracted" ?
                      "You don't have any contracted matches." :
                      "You don't have any matches yet."}
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {Object.entries(groupedMatches).map(([listingId, { listing, bids }]) => (
                    <Card key={listingId} className="overflow-hidden">
                      <CardHeader 
                        className={`${
                          listing.type === "need" 
                            ? "bg-music-orange/10" 
                            : "bg-music-primary/10"
                        } cursor-pointer`}
                        onClick={() => toggleExpandListing(listingId)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <Badge variant={listing.type === "need" ? "outline" : "default"} className={listing.type === "need" ? "text-music-orange border-music-orange mb-2" : "bg-music-primary mb-2"}>
                              {listing.type === "need" ? "NEED" : "OFFER"}
                            </Badge>
                            <CardTitle className="text-lg">{listing.title}</CardTitle>
                            <CardDescription>
                              {bids.length} {bids.length === 1 ? "match" : "matches"} • Created on {formatDate(listing.createdAt)}
                            </CardDescription>
                          </div>
                          <Badge variant="outline" className="ml-2">
                            {expandedListing === listingId ? "Hide" : "View"} {bids.length} {bids.length === 1 ? "Match" : "Matches"}
                          </Badge>
                        </div>
                      </CardHeader>
                      
                      {expandedListing === listingId && (
                        <CardContent className="p-0">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Match</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {bids.map((bid) => {
                                // Determine if current user is the need or offer creator
                                const isNeedCreator = bid.needUserId === currentUser.id;
                                const otherUserName = isNeedCreator ? bid.offerUserName : bid.needUserName;
                                const otherUserAvatar = isNeedCreator ? bid.offerUserAvatar : bid.needUserAvatar;
                                
                                return (
                                  <TableRow key={bid.id}>
                                    <TableCell>
                                      <div className="flex items-center">
                                        <Avatar className="h-8 w-8 mr-2">
                                          <AvatarImage src={otherUserAvatar} />
                                          <AvatarFallback>{otherUserName?.charAt(0) || "U"}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <div className="font-medium">{otherUserName}</div>
                                          <div className="text-xs text-gray-500">
                                            {isNeedCreator ? "Offering services" : "Requesting your services"}
                                          </div>
                                        </div>
                                      </div>
                                    </TableCell>
                                    <TableCell>{formatDate(bid.createdAt)}</TableCell>
                                    <TableCell>
                                      <div className="flex items-center">
                                        {getStatusIcon(bid.status)}
                                        <span className="ml-2 capitalize">{bid.status || "Initial"}</span>
                                      </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                      <Button 
                                        onClick={() => navigate(`/matches/${bid.id}`)} 
                                        variant="outline" 
                                        size="sm"
                                      >
                                        View Details
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Matches;
