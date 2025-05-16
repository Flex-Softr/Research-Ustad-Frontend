"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Logo from "@/app/assets/svgs/Logo";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { loginSchema } from "./loginValidation";
import { useState } from "react";
import { loginUser } from "@/services/AuthService";
import { useRouter } from "next/navigation";
import Image from "next/image";
import image1 from "../../../../../public/logo.png";

export default function LoginForm() {
  const router = useRouter();
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
    console.log(newdata)
    try {
      const res = await loginUser(newdata);
      console.log(res)
      if (res?.success) {
        router.push("/");
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5 md:mx-0 mx-2">
      <div className="flex items-center">
      <Image className="" src={image1} width={80} height={50} alt="logo"></Image>
        <div>
          <h1 className="text-xl font-semibold">Login</h1>
          <p className="font-extralight text-sm text-gray-600">Welcome Research
          Ustad Website!</p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} value={field.value || ""} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <Button
            type="submit"
            className="mt-5 w-full cursor-pointer"
          >
            {isSubmitting ? "Logging...." : "Login"}
          </Button>
        </form>
      </Form>
    
    </div>
  );
}
