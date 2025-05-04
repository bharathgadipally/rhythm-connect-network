
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ListingCard from "@/components/ListingCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Music, Guitar, Microphone } from "lucide-react";
import { mockListings } from "@/data/mockData";
import { Link } from "react-router-dom";

const Index = () => {
  // Get 3 featured listings (mix of needs and offers)
  const featuredListings = mockListings.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Featured Listings Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Featured Listings</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Browse our latest opportunities and talent offerings in the music industry
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button asChild className="bg-music-primary hover:bg-music-secondary">
                <Link to="/listings">
                  View All Listings
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Simple steps to connect with the perfect match for your musical needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-music-primary/20 flex items-center justify-center mb-4">
                  <Guitar className="h-8 w-8 text-music-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Create Your Profile</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Sign up as an individual or company and showcase your skills or company services
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-music-primary/20 flex items-center justify-center mb-4">
                  <Music className="h-8 w-8 text-music-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Post Needs & Offers</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Create listings for what you need or what services you can provide
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-music-primary/20 flex items-center justify-center mb-4">
                  <Microphone className="h-8 w-8 text-music-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Connect & Collaborate</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Get matched automatically or browse listings to find your perfect collaboration
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-music-primary/10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Find Your Perfect Match?</h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
              Whether you need talent or are offering your skills, join our community today and start connecting!
            </p>
            <Button asChild className="bg-music-primary hover:bg-music-secondary text-white py-6 px-10 rounded-xl text-lg transition-all duration-300">
              <Link to="/dashboard">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
