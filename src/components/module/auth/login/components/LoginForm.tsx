import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { loginSchema } from "../loginValidation";
import { useState } from "react";
import { loginUser } from "@/services/AuthService";
import { setClientToken } from "@/lib/tokenUtils";
import { useRouter, useSearchParams } from "next/navigation";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

interface LoginFormProps {
  isLogin: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ isLogin }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const newdata = {
      email: data.email,
      password: data.password,
    };
    console.log(newdata);
    try {
      const res = await loginUser(newdata);
      console.log("Login response:", res);
      console.log("Login response data:", res.data);
      console.log("Access token:", res.data?.accessToken);
      
      if (res?.success) {
        // Store token in localStorage for client-side access
        if (res.data?.accessToken) {
          console.log("Storing token in localStorage:", res.data.accessToken);
          setClientToken(res.data.accessToken);
          console.log("Token stored, checking localStorage:", localStorage.getItem("token"));
        } else {
          console.error("No access token in response data");
        }

        // Get the redirect path from URL parameters
        const redirectPath = searchParams.get("redirectPath");
        const targetPath = redirectPath || "/dashboard";

        console.log("Login successful!");
        console.log("Redirect path from URL:", redirectPath);
        console.log("Target path:", targetPath);
        console.log("Current URL:", window.location.href);

        // Use router for client-side navigation
        console.log("Redirecting to:", targetPath);
        router.push(targetPath);

        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {!isLogin && (
          <div className="relative">
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
            <Input
              type="text"
              placeholder="Name"
              className="pl-12 py-4 border-gray-300 rounded-xl focus:border-teal-500 focus:ring-teal-500 text-base"
            />
          </div>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                  <Input
                    type="email"
                    placeholder="Email"
                    className="pl-12 py-6 border-gray-300 rounded-xl focus:border-teal-500 focus:ring-teal-500 text-base"
                    {...field}
                    value={field.value || ""}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="pl-12 pr-14 py-6 border-gray-300 rounded-xl focus:border-teal-500 focus:ring-teal-500 text-base"
                    {...field}
                    value={field.value || ""}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-6 px-8 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {isSubmitting ? "Processing..." : isLogin ? "SIGN IN" : "SIGN UP"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
