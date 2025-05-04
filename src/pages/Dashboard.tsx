
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatsCards from "@/components/StatsCards";
import ListingCard from "@/components/ListingCard";
import BidCard from "@/components/BidCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { mockListings, mockBids, currentUser } from "@/data/mockData";

const Dashboard = () => {
  // Filter listings to only show current user's listings
  const userListings = mockListings.filter(listing => listing.userId === currentUser.id);
  const userNeeds = userListings.filter(listing => listing.type === "need");
  const userOffers = userListings.filter(listing => listing.type === "offer");
  
  // Get user's bids/matches
  const userBids = mockBids.filter(bid => 
    bid.needUserId === currentUser.id || bid.offerUserId === currentUser.id
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Welcome back, {currentUser.name}!
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 space-x-4">
              <Button asChild className="bg-music-orange hover:bg-music-orange/80">
                <Link to="/create/need">
                  <Plus className="mr-1 h-4 w-4" /> Post a Need
                </Link>
              </Button>
              <Button asChild className="bg-music-primary hover:bg-music-secondary">
                <Link to="/create/offer">
                  <Plus className="mr-1 h-4 w-4" /> Post an Offer
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="mb-8">
            <StatsCards />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="all" className="w-full">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Your Listings</h2>
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="needs">Needs</TabsTrigger>
                    <TabsTrigger value="offers">Offers</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="all">
                  {userListings.length === 0 ? (
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center py-8">
                          <p className="text-gray-500 dark:text-gray-400 mb-4">
                            You don't have any listings yet.
                          </p>
                          <Button asChild className="bg-music-primary hover:bg-music-secondary">
                            <Link to="/create/offer">Create Your First Listing</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {userListings.map((listing) => (
                        <ListingCard key={listing.id} listing={listing} />
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="needs">
                  {userNeeds.length === 0 ? (
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center py-8">
                          <p className="text-gray-500 dark:text-gray-400 mb-4">
                            You don't have any needs posted yet.
                          </p>
                          <Button asChild className="bg-music-orange hover:bg-music-orange/80">
                            <Link to="/create/need">Post a Need</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {userNeeds.map((listing) => (
                        <ListingCard key={listing.id} listing={listing} />
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="offers">
                  {userOffers.length === 0 ? (
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center py-8">
                          <p className="text-gray-500 dark:text-gray-400 mb-4">
                            You don't have any offers posted yet.
                          </p>
                          <Button asChild className="bg-music-primary hover:bg-music-secondary">
                            <Link to="/create/offer">Post an Offer</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {userOffers.map((listing) => (
                        <ListingCard key={listing.id} listing={listing} />
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Matches</CardTitle>
                  <CardDescription>
                    Your latest connections and opportunities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {userBids.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400 mb-4">
                        You don't have any matches yet.
                      </p>
                      <Button asChild variant="outline">
                        <Link to="/listings">Browse Listings</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {userBids.map((bid) => (
                        <BidCard key={bid.id} bid={bid} />
                      ))}
                      
                      <div className="pt-4 text-center">
                        <Button asChild variant="outline" className="w-full">
                          <Link to="/matches">View All Matches</Link>
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
