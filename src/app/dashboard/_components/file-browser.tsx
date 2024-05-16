'use client';

import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useOrganization, useUser } from '@clerk/nextjs';

import { UploadButton } from './uppload-button';
import { FileCard } from './file-card';
import Image from 'next/image';
import { GridIcon, Loader2, RowsIcon, TableIcon } from 'lucide-react';
import { SearchBar } from './search-bar';
import { useState } from 'react';
import { DataTable } from './file-table';
import { columns } from './columns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function Placeholder() {
  return (
    <div className='flex flex-col gap-8 items-center w-full mt-24'>
      <Image alt='No data' src='/empty.svg' width={300} height={300} />
      <div className='text-2xl font-medium'>You have no files, upload one!</div>

      <UploadButton />
    </div>
  );
}

export default function FileBrowser({
  title,
  favoritesOnly,
  deletedOnly,
}: {
  title: string;
  favoritesOnly?: boolean;
  deletedOnly?: boolean;
}) {
  const organization = useOrganization();
  const user = useUser();
  const [query, setQuery] = useState('');

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const favorites = useQuery(api.files.getAllFavorites, orgId ? { orgId } : 'skip');

  const files = useQuery(
    api.files.getFiles,
    orgId ? { orgId, query, favorites: favoritesOnly, deletedOnly } : 'skip',
  );
  const isLoading = files === undefined;

  const modifiedFiles =
    files?.map((file) => {
      return {
        ...file,
        isFavorited: (favorites ?? []).some((favorite) => favorite.fileId === file._id),
      };
    }) ?? [];

  return (
    <div>
      {/*  */}
        <>
          <div className='flex justify-between items-center mb-8'>
            <h1 className='text-4xl font-bold'>{title}</h1>
            <SearchBar query={query} setQuery={setQuery} />

            <UploadButton />
          </div>

          <Tabs defaultValue='grid'>
            <TabsList className='mb-4'>
              <TabsTrigger value='grid' className='flex gap-2 items-center'>
                <GridIcon />
                Grid
              </TabsTrigger>
              <TabsTrigger value='table' className='flex gap-2 items-center'>
                <RowsIcon />
                Table
              </TabsTrigger>
            </TabsList>

            {isLoading && (
              <div className='flex flex-col gap-8 items-center w-full mt-24'>
                <Loader2 className='w-32 h-32 animate-spin text-gray-500' />
                <div className='text-xl font-medium'>Loading your files...</div>
              </div>
            )}

            <TabsContent value='grid'>
              <div className='grid grid-cols-4 gap-4'>
                {modifiedFiles?.map((file) => {
                  return <FileCard key={file._id} file={file} />;
                })}
              </div>
            </TabsContent>
            <TabsContent value='table'>
              <DataTable columns={columns} data={modifiedFiles} />
            </TabsContent>
          </Tabs>

          {files?.length === 0 && <Placeholder />}
        </>


      {/*  */}
    </div>
  );
}
