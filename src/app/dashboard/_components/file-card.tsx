import {
  FileTextIcon,
  GanttChartIcon,
  ImageIcon,
  MoreVertical,
  StarHalf,
  StarIcon,
  StarOff,
  TrashIcon,
} from 'lucide-react';
import { Doc, Id } from '../../../../convex/_generated/dataModel';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { ReactNode, useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useToast } from '@/components/ui/use-toast';
import Image from 'next/image';
import { Protect } from '@clerk/nextjs';

function FileCardActions({ file, isFavorited }: { file: Doc<'files'>; isFavorited: boolean }) {
  const deleteFile = useMutation(api.files.deleteFile);
  const toggleFavorite = useMutation(api.files.toggleFavorite);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { toast } = useToast();

  return (
    <>
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your file from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteFile({ fileId: file._id });
                toast({
                  variant: 'default',
                  title: 'File Deleted',
                  description: 'Your file is now gone from the system.',
                });
              }}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/*  */}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/*  */}
          <DropdownMenuItem
            onClick={() => {
              toggleFavorite({ fileId: file._id });
            }}
            className='flex gap-1 items-center cursor-pointer'>
            {isFavorited ? (
              <>
                <StarOff className='h-4 w-4 text-red-300' />
                Remove
              </>
            ) : (
              <>
                <StarIcon className='h-4 w-4 text-yellow-600' /> Favorite{' '}
              </>
            )}
          </DropdownMenuItem>
          {/*  */}
          {/* <Protect role='org:admin' fallback={<></>}> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setIsConfirmOpen(true)}
              className='flex gap-1 text-red-600 items-center cursor-pointer'>
              <TrashIcon className='h-4 w-4' /> Delete
            </DropdownMenuItem>
          {/* </Protect> */}
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export function FileCard({
  file,
  favorites,
}: {
  file: Doc<'files'> & { url?: string | URL | null };
  favorites: Doc<'favorites'>[];
}) {
  const typeIcons = {
    image: <ImageIcon />,
    pdf: <FileTextIcon />,
    csv: <GanttChartIcon />,
  } as Record<Doc<'files'>['type'], ReactNode>;

  const isFavorited = favorites.some((favorite) => favorite.fileId === file._id);

  return (
    <Card>
      <CardHeader className='relative'>
        <CardTitle className='flex gap-2'>
          <div className='flex justify-center'>{typeIcons[file.type]}</div>
          {file.name}
        </CardTitle>
        <div className='absolute top-2 right-2'>
          <FileCardActions isFavorited={isFavorited} file={file} />
        </div>
      </CardHeader>
      <CardContent className='h-[200px] flex justify-center items-center'>
        {file.type === 'image' && file.url ? (
          <Image alt={file.name} width='200' height='100' src={file.url.toString()} />
        ) : (
          file.type === 'image' && <p>No image available</p> // Handle the absence of URL
        )}

        {file.type === 'csv' && <GanttChartIcon className='w-20 h-20' />}
        {file.type === 'pdf' && <FileTextIcon className='w-20 h-20' />}
      </CardContent>
      <CardFooter className='flex justify-center'>
        <Button
          onClick={() => {
            window.open(file.url ? file.url.toString() : '', '_blank');
          }}>
          Download
        </Button>
      </CardFooter>
    </Card>
  );
}
