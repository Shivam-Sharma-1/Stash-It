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
import { updateAsset } from "@/server/update-asset";

const formSchema = z.object({
  asset: z
    .string()
    .min(1, {
      message: "Asset name must be at least 1 characters.",
    })
    .transform((val) => DOMPurify.sanitize(val)),
});

const UpdateAssetForm = ({ cid }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      asset: "",
    },
  });

  const onSubmit = async ({ asset }) => {
    const res = await updateAsset({ cid, asset });

    if (res === "OK") {
      console.log("Asset Updated");
    } else {
      console.log("Error updating asset");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="asset"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Asset Name:</FormLabel>
              <FormControl>
                <Input placeholder="Enter asset name" {...field} />
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

export default UpdateAssetForm;
