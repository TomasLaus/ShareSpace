'use client';

import { Button } from '@/components/ui/button';
import { useMutation, useQuery } from 'convex/react';
import Image from 'next/image';
import { api } from '../../convex/_generated/api';
import { useOrganization, useUser } from '@clerk/nextjs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(1).max(200),
  file: z
    .custom<FileList>((val) => val instanceof FileList, 'Required')
    .refine((files) => files.length > 0, 'Required'),
});

export default function Home() {
  const { toast } = useToast();
  const organization = useOrganization();
  const user = useUser();
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      file: undefined,
    },
  });

  const fileRef = form.register('file');

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    console.log(values.file);
    const postUrl = await generateUploadUrl();
    if (!orgId) return;

    const result = await fetch(postUrl, {
      method: 'POST',
      headers: {
        'Content-Type': values.file[0].type,
      },
      body: values.file[0],
    });
    const { storageId } = await result.json();

    try {
      await createFile({ name: values.title, fileId: storageId, orgId });

      form.reset();

      setIsFileDialogOpen(false);

      toast({
        variant: 'success',
        title: 'File Uploaded',
        description: 'Now everyone can view your file',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong',
        description: 'Your file could not be uploaded',
      });
    }
  }

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);

  const createFile = useMutation(api.files.createFile);
  const files = useQuery(api.files.getFiles, orgId ? { orgId } : 'skip');

  return (
    <main className='container mx-auto pt-12'>
      <div className='flex justify-between items-center'>
        <h1 className='text-4xl font-bold'>Your Files</h1>

        <Dialog
          open={isFileDialogOpen}
          onOpenChange={(isOpen) => {
            setIsFileDialogOpen(isOpen);
            form.reset();
          }}>
          <DialogTrigger asChild>
            <Button onClick={() => {}}>Upload File</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className='mb-8'>Title of your file</DialogTitle>
              <DialogDescription>
                {/* // ----- */}
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                    <FormField
                      control={form.control}
                      name='title'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* // ----- Input */}
                    <FormField
                      control={form.control}
                      name='file'
                      render={() => (
                        <FormItem>
                          <FormLabel>Your file</FormLabel>
                          <FormControl>
                            <Input type='file' {...fileRef} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type='submit'
                      disabled={form.formState.isSubmitting}
                      className='flex gap-1'>
                      {form.formState.isSubmitting && (
                        <Loader2 className='animate-spin h-4 w-4 mr-2' />
                      )}
                      Submit
                    </Button>
                  </form>
                </Form>
                {/* // ----- */}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      {files?.map((file) => {
        return <div key={file._id}>{file.name}</div>;
      })}
    </main>
  );
}
