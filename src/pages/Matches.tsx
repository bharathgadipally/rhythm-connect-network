
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BidCard from "@/components/BidCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockBids, currentUser } from "@/data/mockData";
import { Bid } from "@/types";

const Matches = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  
  // Filter bids/matches for current user
  const userBids = mockBids.filter(bid => 
    bid.needUserId === currentUser.id || bid.offerUserId === currentUser.id
  );
  
  const pendingBids = userBids.filter(bid => bid.status === "pending");
  const acceptedBids = userBids.filter(bid => bid.status === "accepted");
  
  // Get the appropriate bids based on the active tab
  const getDisplayedBids = (): Bid[] => {
    switch (activeTab) {
      case "pending":
        return pendingBids;
      case "accepted":
        return acceptedBids;
      default:
        return userBids;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Your Matches</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Manage your connections and opportunities
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Matches</TabsTrigger>
              <TabsTrigger value="pending">Pending ({pendingBids.length})</TabsTrigger>
              <TabsTrigger value="accepted">Accepted ({acceptedBids.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab}>
              {getDisplayedBids().length === 0 ? (
                <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <h3 className="text-xl font-semibold mb-2">No matches found</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    {activeTab === "pending" ? 
                      "You don't have any pending matches at the moment." :
                     activeTab === "accepted" ? 
                      "You don't have any accepted matches yet." :
                      "You don't have any matches yet."}
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {getDisplayedBids().map((bid) => (
                    <BidCard key={bid.id} bid={bid} />
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
