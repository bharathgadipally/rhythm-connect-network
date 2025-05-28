
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import ContactForm from "@/components/ContactForm";
import { Music, Guitar, Mic } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        {/* How It Works Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Simple steps to connect with the perfect match for your entertainment needs
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
                  <Mic className="h-8 w-8 text-music-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Connect & Collaborate</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Get matched automatically or browse listings to find your perfect collaboration
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Company Ethos Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-music-primary/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Our Company Ethos</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Our innovative web application for the entertainment industry redefines the relationship between performers and venues, creating unparalleled opportunities for collaboration and engagement. By leveraging advanced algorithms and a user-friendly interface, we seamlessly connect artists with the perfect platforms, ensuring that both performers and venues can thrive in a vibrant ecosystem. This groundbreaking approach not only streamlines the booking process but also fosters meaningful interactions that will transform the way events are produced and experienced. As we pave the way for a new era in entertainment, we are committed to enhancing accessibility, creativity, and success for all stakeholders involved.
            </p>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <Newsletter />
        
        {/* Contact Form Section */}
        <ContactForm />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
