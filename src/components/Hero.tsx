
import { ArrowRight, Guitar, Mic, Music, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-music-primary/10 to-music-secondary/10 z-0" />
      
      <div className="relative z-10 max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            <span className="block">Connect, Create, Perform.</span>
            <span className="block text-music-primary">Network for Musical Magic</span>
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-xl text-gray-600 dark:text-gray-300 sm:max-w-xl">
            RhythmConnect brings together artists, venues, and crews to create seamless event experiences. Post your needs, showcase your talents, and let the music happen.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="bg-music-primary hover:bg-music-primary/90 text-white py-6 px-8 rounded-xl text-lg transition-all duration-300 blue-glow">
              <Link to="/dashboard">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="py-6 px-8 rounded-xl text-lg border-music-primary text-music-primary hover:bg-music-primary/10 transition-all duration-300 accent-glow">
              <Link to="/listings">
                Browse Listings
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Features */}
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
              <div className="p-4 rounded-full bg-music-primary/10 mb-4">
                <Mic className="h-8 w-8 text-music-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Find Talent & Opportunities</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Connect with skilled professionals or find your next gig in the music and art industry.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
              <div className="p-4 rounded-full bg-music-primary/10 mb-4">
                <Users className="h-8 w-8 text-music-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Network & Collaborate</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Build your professional network and create meaningful collaborations with like-minded artists.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
              <div className="p-4 rounded-full bg-music-primary/10 mb-4">
                <Guitar className="h-8 w-8 text-music-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Matching</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our system automatically matches your needs with relevant offers to save you time and effort.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-music-primary/5 rounded-full filter blur-3xl" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-music-accent/5 rounded-full filter blur-3xl" />
    </div>
  );
};

export default Hero;
