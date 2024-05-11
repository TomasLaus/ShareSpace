'use client';

import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { FileIcon, StarIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function SideNav() {
  const pathname = usePathname();
  return (
    <div className='w-40 flex flex-col gap-4'>
      <Link href={'/dashboard/files'}>
        <Button variant={'link'} className={clsx('flex gap-2', {
          'text-blue-500': pathname === '/dashboard/files',
        })}>
          <FileIcon className='w-6 h-6' /> All files
        </Button>
      </Link>

      <Link href={'/dashboard/favorites'}>
        <Button variant={'link'} className={clsx('flex gap-2', {
          'text-blue-500': pathname === '/dashboard/favorites',
        })}>
          <StarIcon className='w-6 h-6' /> Favorites
        </Button>
      </Link>

      <Link href={'/dashboard/trash'}>
        <Button variant={'link'} className={clsx('flex gap-2', {
          'text-blue-500': pathname === '/dashboard/trash',
        })}>
          <TrashIcon className='w-6 h-6' /> Trash
        </Button>
      </Link>
    </div>
  );
}
