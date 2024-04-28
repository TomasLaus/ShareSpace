'use client';

import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useOrganization, useUser } from '@clerk/nextjs';

import { z } from 'zod';
import { UploadButton } from './uppload-button';


export default function Home() {
  const organization = useOrganization();
  const user = useUser();



  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const files = useQuery(api.files.getFiles, orgId ? { orgId } : 'skip');

  return (
    <main className='container mx-auto pt-12'>
      <div className='flex justify-between items-center'>
        <h1 className='text-4xl font-bold'>Your Files</h1>
        <UploadButton />
      </div>

      {/*  */}
      {files?.map((file) => {
        return <div key={file._id}>{file.name}</div>;
      })}
      {/*  */}
    </main>
  );
}
