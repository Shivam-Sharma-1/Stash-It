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
import { updateProject } from "@/server/update-project";

const formSchema = z.object({
  project: z
    .string()
    .min(1, {
      message: "Project name must be at least 1 characters.",
    })
    .transform((val) => DOMPurify.sanitize(val)),
});

const UpdateProjectForm = ({ groupId }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      project: "",
    },
  });

  const onSubmit = async ({ project }) => {
    const res = await updateProject({ groupId, project });
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
        <Button type="submit">Update Project</Button>
      </form>
    </Form>
  );
};

export default UpdateProjectForm;
