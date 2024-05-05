'use client';

import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useOrganization, useUser } from '@clerk/nextjs';

import { z } from 'zod';
import { UploadButton } from './uppload-button';
import { FileCard } from './file-card';
import Image from 'next/image';
import { FileIcon, Loader2, StarIcon } from 'lucide-react';
import { SearchBar } from './search-bar';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function Placeholder() {
  return (
    <div className='flex flex-col gap-8 items-center w-full mt-24'>
      <Image alt='No data' src='/empty.svg' width={300} height={300} />
      <div className='text-2xl font-medium'>You have no files, upload one!</div>

      <UploadButton />
    </div>
  );
}

export default function Home() {
  const organization = useOrganization();
  const user = useUser();
  const [query, setQuery] = useState('');

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const files = useQuery(api.files.getFiles, orgId ? { orgId, query } : 'skip');
  const isLoading = files === undefined;

  return (
    <main className='container mx-auto pt-12'>
      <div className='flex gap-8'>
        <div className='w-40 flex flex-col gap-4'>
          <Link href={'/'}>
            <Button variant={'link'} className='flex gap-2'>
              <FileIcon className='w-6 h-6' /> All files
            </Button>
          </Link>

          <Link href={'/favorites'}>
            <Button variant={'link'} className='flex gap-2'>
              <StarIcon className='w-6 h-6' /> Favorites
            </Button>
          </Link>
        </div>
        <div className='w-full'>
          {isLoading && (
            <div className='flex flex-col gap-8 items-center w-full mt-24'>
              <Loader2 className='w-32 h-32 animate-spin text-gray-500' />
              <div className='text-xl font-medium'>Loading your files...</div>
            </div>
          )}

          {/*  */}
          {!isLoading && (
            <>
              <div className='flex justify-between items-center mb-8'>
                <h1 className='text-4xl font-bold'>Your Files</h1>
                <SearchBar query={query} setQuery={setQuery} />

                <UploadButton />
              </div>

              {files.length === 0 && <Placeholder />}

              <div className='grid grid-cols-4 gap-4'>
                {files?.map((file) => {
                  return <FileCard key={file._id} file={file} />;
                })}
              </div>
            </>
          )}

          {/*  */}
        </div>
      </div>
    </main>
  );
}
