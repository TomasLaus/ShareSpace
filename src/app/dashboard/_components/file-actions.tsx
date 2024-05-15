import { DownloadIcon, MoreVertical, StarIcon, StarOff, TrashIcon, UndoIcon } from 'lucide-react';
import { Doc } from '../../../../convex/_generated/dataModel';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
} from '@/components/ui/alert-dialog';
import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useToast } from '@/components/ui/use-toast';
import { Protect } from '@clerk/nextjs';

export function FileCardActions({
  file,
  isFavorited,
}: {
  file: Doc<'files'> & { url?: string | URL | null };
  isFavorited: boolean;
}) {
  const deleteFile = useMutation(api.files.deleteFile);
  const restoreFile = useMutation(api.files.restoreFile);
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
              This action will mark the file for deletion.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteFile({ fileId: file._id });
                toast({
                  variant: 'default',
                  title: 'File marked for deletion.',
                  description: 'Your file is now in the trash, and it will be deleted in soon.',
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
          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => {
              window.open(file.url ?? '', '_blank');
            }}
            className='flex gap-1 items-center cursor-pointer'>
            <DownloadIcon className='h-4 w-4 ' /> Download
          </DropdownMenuItem>
          {/*  */}
          <Protect role='org:admin' fallback={<></>}>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                if (file.shouldDelete) {
                  restoreFile({ fileId: file._id });
                } else {
                  setIsConfirmOpen(true);
                }
              }}
              className='flex gap-1 items-center cursor-pointer'>
              {file.shouldDelete ? (
                <div className='flex gap-1 text-green-800 items-center cursor-pointer'>
                  <UndoIcon className='h-4 w-4 ' /> Restore{' '}
                </div>
              ) : (
                <div className='flex gap-1 text-red-600 items-center cursor-pointer'>
                  {' '}
                  <TrashIcon className='h-4 w-4' /> Delete{' '}
                </div>
              )}
            </DropdownMenuItem>
          </Protect>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
