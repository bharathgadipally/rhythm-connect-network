
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListingCard from "@/components/ListingCard";
import ListingSearch from "@/components/ListingSearch";
import ListingsMap from "@/components/ListingsMap";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockListings } from "@/data/mockData";
import { Listing } from "@/types";
import { Plus, Map, List } from "lucide-react";
import { Link } from "react-router-dom";

interface SearchParams {
  keyword: string;
  type: string;
  category: string;
  location: string;
}

const Listings = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [filteredListings, setFilteredListings] = useState<Listing[]>(mockListings);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  
  // Filter listings based on the active tab
  useEffect(() => {
    let filtered = [...mockListings];
    
    if (activeTab === "needs") {
      filtered = filtered.filter(listing => listing.type === "need");
    } else if (activeTab === "offers") {
      filtered = filtered.filter(listing => listing.type === "offer");
    }
    
    setFilteredListings(filtered);
  }, [activeTab]);
  
  const handleSearch = (searchParams: SearchParams) => {
    let filtered = [...mockListings];
    
    // Filter by type if not "all"
    if (searchParams.type !== "all") {
      filtered = filtered.filter(listing => listing.type === searchParams.type);
      setActiveTab(searchParams.type === "need" ? "needs" : "offers");
    }
    
    // Filter by category if not "all"
    if (searchParams.category !== "all") {
      filtered = filtered.filter(listing => listing.category === searchParams.category);
    }
    
    // Filter by location if provided
    if (searchParams.location) {
      filtered = filtered.filter(listing => 
        listing.location.toLowerCase().includes(searchParams.location.toLowerCase())
      );
    }
    
    // Filter by keyword if provided
    if (searchParams.keyword) {
      const keyword = searchParams.keyword.toLowerCase();
      filtered = filtered.filter(listing => 
        listing.title.toLowerCase().includes(keyword) ||
        listing.description.toLowerCase().includes(keyword) ||
        listing.category.toLowerCase().includes(keyword) ||
        (listing.skills && listing.skills.some(skill => 
          skill.toLowerCase().includes(keyword)
        ))
      );
    }
    
    setFilteredListings(filtered);
  };

  // Function to render content based on listings and view mode
  const renderContent = () => {
    if (filteredListings.length === 0) {
      return (
        <div className="text-center py-16">
          <p className="text-gray-500 dark:text-gray-400 mb-4 text-xl">
            No listings match your search criteria.
          </p>
          <Button onClick={() => {
            setActiveTab("all");
            setFilteredListings(mockListings);
          }}>
            Reset Search
          </Button>
        </div>
      );
    }
    
    if (viewMode === "map") {
      return <ListingsMap listings={filteredListings} />;
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Browse Listings</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Find the perfect match for your musical needs or opportunities
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
            <ListingSearch onSearch={handleSearch} />
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
              <TabsList>
                <TabsTrigger value="all">All Listings</TabsTrigger>
                <TabsTrigger value="needs">Needs</TabsTrigger>
                <TabsTrigger value="offers">Offers</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                className={`rounded-none ${viewMode === "list" ? "bg-music-primary" : ""}`}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4 mr-1" />
                List
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "ghost"}
                className={`rounded-none ${viewMode === "map" ? "bg-music-primary" : ""}`}
                onClick={() => setViewMode("map")}
              >
                <Map className="h-4 w-4 mr-1" />
                Map
              </Button>
            </div>
          </div>
          
          {renderContent()}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Listings;
