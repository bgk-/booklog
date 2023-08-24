import {
  Box,
  Button,
  Checkbox,
  Group,
  Rating,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useStyles } from './styles';
import { Book, CreateBookDto } from '@booklog/shared/types';
import { useDatePickerStore } from '../date-picker';
import { useState } from 'react';
import { API_URL } from '../../constants';
import { useSWRConfig } from 'swr';
import { ContextModalProps } from '@mantine/modals';

export function BookModal({
  context,
  id,
  innerProps,
}: ContextModalProps<{ book: Book }>) {
  const { classes, theme } = useStyles();
  const { date, url } = useDatePickerStore();
  const { mutate } = useSWRConfig();
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Error[]>([]);

  const { book } = innerProps;
  const form = useForm<CreateBookDto>({
    initialValues: {
      title: book?.title ?? '',
      author: book?.author ?? '',
      date: book?.date ?? date,
      rating: book?.rating ?? 0,
      notes: book?.notes ?? '',
      isComplete: book?.isComplete ?? false,
    },
    validateInputOnChange: true,
    validate: {
      title: (v: string) =>
        v.length === 0
          ? 'Title is required'
          : v.length > 255
          ? 'Title can be a max of 255 characters'
          : null,
      author: (v: string) =>
        v.length === 0
          ? 'Author is required'
          : v.length > 255
          ? 'Author can be a max of 255 characters'
          : null,
      rating: (v: number) =>
        v < 0 || v > 5 ? 'Rating must be between 0 and 5' : null,
    },
  });
  const onSubmit = async (values: CreateBookDto) => {
    setLoading(true);
    const bookUrl = new URL(API_URL);
    if (book) bookUrl.pathname += book._id;
    await fetch(bookUrl, {
      method: 'POST',
      body: JSON.stringify(values),
    });
    setLoading(false);
    await mutate(url);
    context.closeModal(id);
  };

  return (
    <Box maw={420} mx="auto" h={'auto'}>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          label="Title"
          placeholder="Title"
          {...form.getInputProps('title')}
        />
        <TextInput
          mt="sm"
          label="Author"
          placeholder="Author"
          {...form.getInputProps('author')}
        />
        <Group className={classes.ratingGroup}>
          <Rating
            {...form.getInputProps('rating')}
            color={theme.primaryColor}
          />
          <Checkbox
            label="Completed"
            size={'xs'}
            defaultChecked={book?.isComplete ?? false}
            {...form.getInputProps('isComplete')}
          />
        </Group>
        <Textarea
          label="Notes"
          placeholder="What did you think?"
          autosize
          minRows={6}
          {...form.getInputProps('notes')}
        />
        <Button type="submit" mt="sm" loading={isLoading}>
          Submit
        </Button>
      </form>
      {errors.length > 0 && (
        <Text color={'red'} size={'sm'}>
          {errors.map((e) => e.message)}
        </Text>
      )}
    </Box>
  );
}

export default BookModal;
