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

export const registerSchema = z.object({
  email: z
    .string({ message: "email is required" })
    .email({ message: "email not valid" }),

  password: z
    .string({ message: "passwor dis required" })
    .min(8, { message: "password should be minimum of 8 characters" }),
  name: z.string({ message: "name is required" }),
});

export default function RegisterModel() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  function onSubmit(values: z.infer<typeof registerSchema>) {
    setLoading(true);
    axios
      .post("/api/register", {
        email: values.email,
        password: values.password,
        name: values.name,
      })
      .then(() => {
        toast.success("register successfull");
        router.refresh();
        router.push("/");
      })
      .catch((err) => {
        toast.error(err.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const { type, isOpen, onOpen } = useModal();
  const open = isOpen && type === "register";
  return (
    <Dialog open={open}>
      <DialogContent className='flex flex-col justify-start items-start w-full gap-9'>
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
                      disabled={loading}
                      placeholder='password'
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
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='eg. Jack Smith'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex flex-row justify-between items-center w-full gap-2'>
              <span
                className='text-blue-500 font-bold text-sm cursor-pointer'
                onClick={() => onOpen("Login")}
              >
                already a member? login
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
