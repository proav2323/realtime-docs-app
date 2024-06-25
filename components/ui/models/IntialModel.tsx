"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Heading from "../Heading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "../dialog";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useModal } from "../hooks/useModel.store";

export const loginFormSchema = z.object({
  email: z
    .string({ message: "email is required" })
    .email({ message: "email not valid" }),

  password: z
    .string({ message: "passwor dis required" })
    .min(8, { message: "password should be minimum of 8 characters" }),
});

export default function LoginModel({
  open = false,
  data = false,
}: {
  open?: boolean;
  data?: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setLoading(true);
    axios
      .post("/api/login", {
        email: values.email,
        password: values.password,
      })
      .then(() => {
        toast.success("login successfull");
        onClose();
        router.refresh();
      })
      .catch((err) => {
        toast.error(err.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  const { isOpen, type, onOpen, onClose } = useModal();
  const openH = type === "Login" && isOpen;
  if (!mounted) {
    return null;
  }
  return (
    <Dialog
      open={data ? open : openH}
      onOpenChange={data ? () => {} : () => onClose()}
    >
      <DialogContent className='flex flex-col justify-start items-start w-full gap-9 overflow-y-scroll noScroll max-h-screen min-h-fit'>
        <Heading title='Welcome Back' subtitle='logint to your account' />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8 w-full'
          >
            <FormField
              disabled={loading}
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      disabled={loading}
                      placeholder='eg. jacksmith@gmail.com'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              disabled={loading}
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      disabled={loading}
                      placeholder='password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex flex-row justify-between items-center w-full gap-2'>
              <span className='text-blue-500 font-bold text-sm cursor-pointer'>
                Forgot Password
              </span>
              <span
                className='text-blue-500 font-bold text-sm cursor-pointer'
                onClick={() => {
                  onOpen("register");
                  console.log("kdfjkfnk");
                }}
              >
                new here? Create Account
              </span>
            </div>

            <Button disabled={loading} type='submit'>
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
