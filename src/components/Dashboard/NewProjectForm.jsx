"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import DOMPurify from "dompurify";
import { Switch } from "../ui/switch";
import { createProject } from "@/server/create-project";

const formSchema = z.object({
  project: z
    .string()
    .min(1, {
      message: "Project name must be at least 2 characters.",
    })
    .transform((val) => DOMPurify.sanitize(val)),
  isPublic: z.boolean().default(false),
});

const NewProjectForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      project: "",
      isPublic: false,
    },
  });

  const onSubmit = async ({ project, isPublic }) => {
    const res = await createProject({ project, isPublic });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="project"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name:</FormLabel>
              <FormControl>
                <Input placeholder="Enter project name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Is the project public?
                </FormLabel>
                <FormDescription>
                  Provide access for users across the globe to see your project.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Create Project</Button>
      </form>
    </Form>
  );
};

export default NewProjectForm;
