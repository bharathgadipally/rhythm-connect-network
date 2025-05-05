
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Camera, User } from "lucide-react";

const profileSchema = z.object({
  displayName: z.string().min(2, "Name must be at least 2 characters"),
  bio: z.string().optional(),
  location: z.string().optional(),
  phoneNumber: z.string().optional(),
  skills: z.string().optional(),
});

type ProfileValues = z.infer<typeof profileSchema>;

const Profile = () => {
  const { userProfile, updateUserProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("profile");

  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: userProfile?.displayName || "",
      bio: userProfile?.bio || "",
      location: userProfile?.location || "",
      phoneNumber: userProfile?.phoneNumber || "",
      skills: userProfile?.skills ? userProfile.skills.join(", ") : "",
    },
  });

  const onSubmit = async (values: ProfileValues) => {
    try {
      setIsLoading(true);
      
      // Convert comma-separated skills string to array
      const skills = values.skills
        ? values.skills.split(",").map((skill) => skill.trim())
        : [];
      
      await updateUserProfile({
        ...values,
        skills,
      });
      
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
            <div className="relative h-40 bg-gradient-to-r from-music-primary to-music-orange/70">
              <div className="absolute -bottom-12 left-8">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-white dark:border-gray-800">
                    <AvatarImage src={userProfile?.photoURL || ""} />
                    <AvatarFallback className="text-2xl bg-music-primary text-white">
                      {userProfile?.displayName?.charAt(0) || <User />}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="pt-16 pb-6 px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between">
                <div>
                  <h1 className="text-2xl font-bold">{userProfile?.displayName}</h1>
                  <p className="text-gray-500 dark:text-gray-400">{userProfile?.email}</p>
                </div>
                <Badge variant={userProfile?.userType === "company" ? "outline" : "default"} className="mt-2 sm:mt-0">
                  {userProfile?.userType === "company" ? "Company" : "Individual"}
                </Badge>
              </div>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="profile">Profile Information</TabsTrigger>
              <TabsTrigger value="security">Security Settings</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Edit Profile</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="displayName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about yourself or your company..." 
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="City, Country" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 (555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skills (comma-separated)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Guitar, Sound Engineering, Vocals" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button
                    type="submit"
                    className="bg-music-primary hover:bg-music-primary/90"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
            
            <TabsContent value="security" className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Manage your account security settings and change your password.
              </p>
              {/* Password change form would go here */}
              <p className="text-gray-500 dark:text-gray-400">
                This feature will be implemented in a future update.
              </p>
            </TabsContent>
            
            <TabsContent value="notifications" className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Control what notifications you receive from RhythmConnect.
              </p>
              {/* Notification settings would go here */}
              <p className="text-gray-500 dark:text-gray-400">
                This feature will be implemented in a future update.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
