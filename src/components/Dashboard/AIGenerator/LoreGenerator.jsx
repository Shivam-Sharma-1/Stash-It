'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import DOMPurify from 'dompurify';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import GenerateCharacterLore from '@/server/generate-character-lore';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import ReactMarkdown from 'react-markdown';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SaveGenerationButton } from './SaveGenerationButton';

const genres = ['Fantasy', 'Sci-fi', 'Survival', 'Magic'];

const loreGeneratorSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Character Name must have atleast 2 characters.',
    })
    .transform((val) => DOMPurify.sanitize(val)),
  description: z
    .string()
    .min(2, {
      message: 'Description must have atleast 2 characters.',
    })
    .max(500)
    .transform((val) => DOMPurify.sanitize(val)),
  genre: z.string({
    required_error: 'Please select a genre.',
  }),
});

export const LoreGenerator = ({ setIsOpen }) => {
  const [lore, setLore] = useState(null);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(loreGeneratorSchema),
    defaultValues: {
      name: '',
      description: '',
      genre: genres[0].toLowerCase(),
    },
  });

  async function onSubmit({ name, description, genre }) {
    setLoading(true);
    const generatedLore = await GenerateCharacterLore({
      name,
      description,
      genre,
    });
    if (generatedLore.success) {
      setLore(generatedLore.content);
    } else {
      toast.error('Could not generate the character lore. Please try again.');
    }
    setLoading(false);
  }

  return (
    <div className='grid grid-cols-2 w-full gap-8 justify-between'>
      <div className='flex flex-col gap-2 col-span-1 h-full'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Character Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter character name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Describe your character'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='genre'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a genre' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {genres.map((genre) => (
                        <SelectItem
                          key={genre.toLowerCase()}
                          value={genre.toLowerCase()}
                        >
                          {genre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={loading} className='w-full' type='submit'>
              {loading ? 'Generating' : 'Generate Lore'}
            </Button>
          </form>
        </Form>
      </div>
      <Card className='col-span-1 p-0 border-none'>
        <CardHeader className='p-0'>
          <CardTitle className='text-xl pb-2'>
            {loading ? 'Generating' : 'Generated Lore'}
          </CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-2 items-center justify-between p-0'>
          {loading ? (
            <div className='flex flex-col gap-2 w-full'>
              <Skeleton className='w-full h-6' />
              <Skeleton className='w-[80%] h-6' />
              <Skeleton className='w-[30%] h-6' />
              <Skeleton className='w-[60%] h-6' />
              <Skeleton className='w-[90%] h-6' />
            </div>
          ) : lore ? (
            <>
              <ScrollArea className='h-80 bg-secondary rounded-md p-4'>
                <ReactMarkdown className='prose'>{lore}</ReactMarkdown>
              </ScrollArea>
            </>
          ) : (
            <span className='mt-10'>
              Generate your lore by clicking the Generate button.
            </span>
          )}
          <CardFooter className='w-full p-0 mt-2 flex flex-row gap-2'>
            {lore && (
              <>
                <SaveGenerationButton
                  text={lore}
                  title={form.getValues('name')}
                  type='text'
                />
              </>
            )}
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};
