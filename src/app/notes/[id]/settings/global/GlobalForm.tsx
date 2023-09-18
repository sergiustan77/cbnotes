"use client";
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
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { driver } from "@/lib/neo4j";
import { useRouter } from "next/navigation";

import { Switch } from "@/components/ui/switch";
import Note from "@/lib/interfaces/Note";
type Props = {
  note: Note;
  userId: string;
};
const formSchema = z.object({
  isGlobal: z.boolean().default(false),
});
const GlobalForm = ({ note, userId }: Props) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isGlobal: note.isGlobal,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const session = driver.session();

    const resChangeGlobal = await session
      .executeWrite((tx) =>
        tx.run(
          `
        MATCH (u:User {userId: $userId})-[:HAS_NOTE]->(n:Note {id: $note})
        SET n.isGlobal=$isGlobal
    `,

          { userId, note: note.id, isGlobal: values.isGlobal }
        )
      )
      .then(() => {
        router.refresh();
      });

    console.log(values.isGlobal);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="isGlobal"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Global Settings</FormLabel>

                <FormDescription>
                  Allow your note to be viewed by everyone.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default GlobalForm;
