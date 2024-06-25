"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useModal } from "../hooks/useModel.store";
import { Dialog, DialogContent } from "../dialog";
import Heading from "../Heading";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { Input } from "../input";
import { Button } from "../button";

export const newWordDoc = z.object({
  name: z.string({ message: "name can't be blank" }),
});

export default function NewDoc() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof newWordDoc>>({
    resolver: zodResolver(newWordDoc),
    defaultValues: {
      name: "",
    },
  });

  const router = useRouter();

  function onSubmit(values: z.infer<typeof newWordDoc>) {
    setLoading(true);
    axios
      .post("/api/doc/", {
        name: values.name,
      })
      .then((data) => {
        toast.success("doc created successfully");
        onClose();
        router.refresh();
        router.push(`/user/doc/${data.data.id}`);
      })
      .catch((err) => {
        toast.error(err.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const { type, isOpen, onOpen, onClose } = useModal();
  const open = isOpen && type === "newDoc";
  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className='flex flex-col justify-start items-start w-full gap-9 overflow-y-scroll noScroll max-h-screen min-h-fit'>
        <Heading title='New Doc' subtitle='name of your new document' />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8 w-full'
          >
            <FormField
              disabled={loading}
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      disabled={loading}
                      placeholder='Document name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={loading} type='submit'>
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
