'use client';
import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Sparkle } from '@phosphor-icons/react';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoreGenerator } from './LoreGenerator';

export default function AIGenerator() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger asChild>
        <Button className='hover:-translate-y-2 transition-all duration-300 flex items-center gap-2'>
          AI Generator
          <Sparkle
            size={22}
            className='text-primary-foreground'
            weight='duotone'
          />
        </Button>
      </SheetTrigger>
      <SheetContent
        className='max-h-[96vh] md:max-h-[80vh] overflow-y-scroll md:overflow-y-hidden'
        side='bottom'
      >
        <SheetHeader className='py-2'>
          <SheetTitle>AI Character Lore Generator</SheetTitle>
        </SheetHeader>
        <LoreGenerator setIsOpen={setIsOpen} />
      </SheetContent>
    </Sheet>
  );
}
