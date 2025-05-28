
import { ArrowRight, Guitar, Mic, Music, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url('/lovable-uploads/c909a5ef-0761-4074-9473-54d1744e6924.png')`,
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* EvenioPro Logo */}
          <div className="mb-8 flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/20">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-music-primary to-music-secondary bg-clip-text text-transparent">
                EvenioPro
              </h1>
            </div>
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            <span className="block">We Make It Happen</span>
            <span className="block text-music-primary">Bringing life to the entertainment industry in the 21st century</span>
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-xl text-gray-200 sm:max-w-xl">
            EvenioPro brings together artists, venues, and crews to create seamless event experiences. Post your needs, showcase your talents, and let the music happen.
          </p>
        </div>
        
        {/* Features */}
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-white/20">
              <div className="p-4 rounded-full bg-music-primary/20 mb-4">
                <Mic className="h-8 w-8 text-music-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Find Talent & Opportunities</h3>
              <p className="text-gray-200">
                Connect with skilled professionals or find your next gig in the music and art industry.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-white/20">
              <div className="p-4 rounded-full bg-music-primary/20 mb-4">
                <Users className="h-8 w-8 text-music-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Network & Collaborate</h3>
              <p className="text-gray-200">
                Build your professional network and create meaningful collaborations with like-minded artists.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-white/20">
              <div className="p-4 rounded-full bg-music-primary/20 mb-4">
                <Guitar className="h-8 w-8 text-music-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Smart Matching</h3>
              <p className="text-gray-200">
                Our system automatically matches your needs with relevant offers to save you time and effort.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-music-orange/5 rounded-full filter blur-3xl" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-music-blue/5 rounded-full filter blur-3xl" />
    </div>
  );
};

export default Hero;
