import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import ContactForm from "@/components/ContactForm";
import { Music, Guitar, Mic, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center p-6 bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-2xl border border-gray-200">
                <div className="p-4 rounded-full bg-music-primary/20 mb-4">
                  <Mic className="h-8 w-8 text-music-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Find Talent & Opportunities</h3>
                <p className="text-gray-600">
                  Connect with skilled professionals or find your next gig in the music and art industry.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-2xl border border-gray-200">
                <div className="p-4 rounded-full bg-music-primary/20 mb-4">
                  <Users className="h-8 w-8 text-music-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Network & Collaborate</h3>
                <p className="text-gray-600">
                  Build your professional network and create meaningful collaborations with like-minded artists.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-2xl border border-gray-200">
                <div className="p-4 rounded-full bg-music-primary/20 mb-4">
                  <Guitar className="h-8 w-8 text-music-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Smart Matching</h3>
                <p className="text-gray-600">
                  Our system automatically matches your needs with relevant offers to save you time and effort.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section with Image */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                <p className="text-xl text-gray-600 mb-8">
                  Simple steps to connect with the perfect match for your entertainment needs
                </p>
                
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-music-primary/20 flex items-center justify-center flex-shrink-0">
                      <Guitar className="h-6 w-6 text-music-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">Create Your Profile</h3>
                      <p className="text-gray-600">
                        Sign up as an individual or company and showcase your skills or company services
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-music-primary/20 flex items-center justify-center flex-shrink-0">
                      <Music className="h-6 w-6 text-music-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">Post Needs & Offers</h3>
                      <p className="text-gray-600">
                        Create listings for what you need or what services you can provide
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-music-primary/20 flex items-center justify-center flex-shrink-0">
                      <Mic className="h-6 w-6 text-music-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">Connect & Collaborate</h3>
                      <p className="text-gray-600">
                        Get matched automatically or browse listings to find your perfect collaboration
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80" 
                  alt="Entertainment professional working" 
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Company Ethos Section with Image */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80" 
                  alt="Music equipment and technology" 
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
              
              <div>
                <h2 className="text-3xl font-bold mb-8">Our Company Ethos</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our innovative web application for the entertainment industry redefines the relationship between performers and venues, creating unparalleled opportunities for collaboration and engagement. By leveraging advanced algorithms and a user-friendly interface, we seamlessly connect artists with the perfect platforms, ensuring that both performers and venues can thrive in a vibrant ecosystem. This groundbreaking approach not only streamlines the booking process but also fosters meaningful interactions that will transform the way events are produced and experienced. As we pave the way for a new era in entertainment, we are committed to enhancing accessibility, creativity, and success for all stakeholders involved.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <Newsletter />
        
        {/* Contact Form Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mx-auto">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
