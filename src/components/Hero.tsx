
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
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            <span className="block">We Make It Happen</span>
            <span className="block text-music-primary">Bringing life to the entertainment industry in the 21st century</span>
          </h1>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-music-orange/5 rounded-full filter blur-3xl" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-music-blue/5 rounded-full filter blur-3xl" />
    </div>
  );
};

export default Hero;
