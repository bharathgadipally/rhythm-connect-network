
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListingForm from "@/components/ListingForm";
import { ListingType } from "@/types";

const CreateListing = () => {
  const { type } = useParams();
  const listingType: ListingType = type === "offer" ? "offer" : "need";
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Create New {listingType === "offer" ? "Offer" : "Need"}</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              {listingType === "offer" 
                ? "Share your expertise and services with the community" 
                : "Let others know what you're looking for"}
            </p>
          </div>
          
          <ListingForm initialType={listingType} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateListing;
