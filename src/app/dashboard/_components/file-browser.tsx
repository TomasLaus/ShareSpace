'use client';

import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
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

export default function FileBrowser({ title, favoritesOnly }: { title: string; favoritesOnly?: boolean }) {
  const organization = useOrganization();
  const user = useUser();
  const [query, setQuery] = useState('');

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const favorites = useQuery(api.files.getAllFavorites, 
    orgId ? { orgId } : 'skip'
  )


  const files = useQuery(api.files.getFiles, orgId ? { orgId, query, favorites: favoritesOnly } : 'skip');
  const isLoading = files === undefined;

  return (
    <div>
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
            <h1 className='text-4xl font-bold'>{title}</h1>
            <SearchBar query={query} setQuery={setQuery} />

            <UploadButton />
          </div>

          {files.length === 0 && <Placeholder />}

          <div className='grid grid-cols-4 gap-4'>
            {files?.map((file) => {
              return <FileCard favorites={favorites ?? []} key={file._id} file={file} />;
            })}
          </div>
        </>
      )}

      {/*  */}
    </div>
  );
}
