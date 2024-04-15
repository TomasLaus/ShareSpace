'use client';

import { Button } from '@/components/ui/button';
import { useMutation } from 'convex/react';
import Image from 'next/image';
import { api } from '../../convex/_generated/api';

export default function Home() {
  const createFile = useMutation(api.files.createFile);
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <Button onClick={() => createFile({ name: 'hello world' })}>Click me</Button>
    </main>
  );
}
