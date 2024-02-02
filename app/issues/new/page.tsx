'use client';

import React, { useState } from 'react';
import { Button, Callout, TextField } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { createIssueSchema } from '@/app/validationSchema';
import { z } from 'zod';

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>({});

  const router = useRouter();
  const [error, setError] = useState('');

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data);
            router.push('/issues');
          } catch (error) {
            console.log(error);
            setError('An unexpected error occured.');
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register('title')} />
        </TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
