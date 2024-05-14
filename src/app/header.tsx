import { Button } from '@/components/ui/button';
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

export function Header() {
  return (
    <div className='border-b py-4 bg-gray-50'>
      <div className='items-center container mx-auto justify-between flex'>
        <Link href={'/'} className='flex gap-2 items-center text-xl'>
          <Image alt='logo' src='/logo.png' width={45} height={45} />
          ShareSpace
        </Link>

        <Button variant={'outline'}>
          <Link href={'/dashboard/files'}>Your Files</Link>
        </Button>

        <div className='flex gap-2'>
          <OrganizationSwitcher />
          <UserButton />
        </div>
      </div>
    </div>
  );
}
