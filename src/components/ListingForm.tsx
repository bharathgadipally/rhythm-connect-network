
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ListingType } from "@/types";

const formSchema = z.object({
  type: z.enum(["need", "offer"]),
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  location: z.string().min(3, {
    message: "Location must be at least 3 characters.",
  }),
  date: z.string().min(1, {
    message: "Please select a date.",
  }),
  time: z.string().min(1, {
    message: "Please select a time.",
  }),
  rate: z.string().min(1, {
    message: "Please specify your rate.",
  }),
  skills: z.string().optional(),
});

interface ListingFormProps {
  initialType?: ListingType;
}

const ListingForm: React.FC<ListingFormProps> = ({ initialType = "need" }) => {
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: initialType,
      title: "",
      description: "",
      category: "",
      location: "",
      date: "",
      time: "",
      rate: "",
      skills: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast.success("Listing created successfully!");
    navigate("/dashboard");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create New Listing</CardTitle>
        <CardDescription>
          Post a new need or offer for your event or service.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Listing Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="need">I Need Something</SelectItem>
                      <SelectItem value="offer">I'm Offering Services</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., Jazz Pianist Available for Events" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Provide details about your need or offer..." 
                      className="resize-none min-h-[120px]" 
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
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Musician">Musician</SelectItem>
                        <SelectItem value="Sound Engineer">Sound Engineer</SelectItem>
                        <SelectItem value="Lighting">Lighting Technician</SelectItem>
                        <SelectItem value="Venue">Venue</SelectItem>
                        <SelectItem value="Equipment">Equipment</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="City, State or Remote" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormDescription>
                      You can enter "Flexible" in your description if the time is negotiable.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="rate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rate</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., $200/hour or Negotiable" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills / Requirements</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., Jazz, Blues, Live Performance (comma separated)" {...field} />
                  </FormControl>
                  <FormDescription>
                    List related skills or specific requirements, separated by commas.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="pt-4">
              <Button type="submit" className="w-full bg-music-primary hover:bg-music-secondary">Create Listing</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ListingForm;
