
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface ListingSearchProps {
  onSearch: (searchParams: SearchParams) => void;
}

interface SearchParams {
  keyword: string;
  type: string;
  category: string;
  location: string;
}

const ListingSearch: React.FC<ListingSearchProps> = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    keyword: "",
    type: "all",
    category: "all",
    location: ""
  });

  const handleChange = (field: keyof SearchParams, value: string) => {
    setSearchParams(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <Input
            placeholder="Keywords..."
            value={searchParams.keyword}
            onChange={(e) => handleChange("keyword", e.target.value)}
            className="w-full"
          />
        </div>
        
        <div>
          <Select 
            value={searchParams.type} 
            onValueChange={(value) => handleChange("type", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="need">Needs</SelectItem>
                <SelectItem value="offer">Offers</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Select 
            value={searchParams.category} 
            onValueChange={(value) => handleChange("category", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Musician">Musicians</SelectItem>
                <SelectItem value="Sound Engineer">Sound Engineers</SelectItem>
                <SelectItem value="Lighting">Lighting</SelectItem>
                <SelectItem value="Venue">Venues</SelectItem>
                <SelectItem value="Equipment">Equipment</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <div className="flex">
            <Input
              placeholder="Location..."
              value={searchParams.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="w-full rounded-r-none"
            />
            <Button type="submit" className="rounded-l-none bg-music-primary hover:bg-music-secondary">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ListingSearch;
