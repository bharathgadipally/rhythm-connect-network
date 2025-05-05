
import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Mail } from "lucide-react";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordValues) => {
    try {
      setIsLoading(true);
      await resetPassword(values.email);
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="hidden lg:flex flex-1 bg-music-primary/20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-music-primary/40 to-music-orange/30" />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="max-w-lg p-8">
            <h2 className="text-4xl font-bold mb-6">Password Recovery</h2>
            <p className="text-lg mb-8">
              No worries! It happens to the best of us. Enter your email and we'll 
              send you instructions to get back into your account.
            </p>
            <Link to="/login">
              <Button variant="secondary" className="text-base">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Login
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <div className="flex items-center mb-8">
            <Link to="/login" className="inline-flex items-center text-sm text-music-primary hover:underline mr-2">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Login
            </Link>
            <h1 className="text-3xl font-bold ml-auto">Forgot Password</h1>
          </div>

          {isSubmitted ? (
            <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <Mail className="mx-auto h-12 w-12 text-green-500 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Check Your Email</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We've sent password reset instructions to your email address. Please check your inbox.
              </p>
              <Link to="/login">
                <Button variant="outline" className="mt-2">
                  Return to Login
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Enter the email address associated with your account, and we'll send you a link to reset your password.
              </p>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-music-primary hover:bg-music-primary/90 mt-4"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>Sending Reset Link...</>
                    ) : (
                      <>Reset Password</>
                    )}
                  </Button>
                </form>
              </Form>

              <div className="mt-6 text-center">
                <p>
                  Remember your password?{" "}
                  <Link
                    to="/login"
                    className="text-music-primary hover:underline font-medium"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
