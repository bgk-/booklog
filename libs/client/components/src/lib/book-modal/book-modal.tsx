import {
  Box,
  Button,
  Checkbox,
  Group,
  Modal,
  Rating,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useStyles } from './styles';
import { CreateBookDto } from '@booklog/shared/types';
import { useBookModalStore } from './store';
import { useDatePickerStore } from '../date-picker';
import { useEffect } from 'react';

export function BookModal() {
  const { classes, theme } = useStyles();
  const { book, close, isOpened } = useBookModalStore();
  const { date } = useDatePickerStore();
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
        v.length > 255 ? 'Title can be a max of 255 characters' : null,
      author: (v: string) =>
        v.length > 255 ? 'Author can be a max of 255 characters' : null,
      rating: (v: number) =>
        v < 0 || v > 5 ? 'Rating must be between 0 and 5' : null,
    },
  });

  useEffect(() => {
    useBookModalStore.subscribe((state, _) => {
      if (!form.isValid()) return;
      if (state.book) form.setValues(state.book);
      else form.reset();
    });
  });
  const onSubmit = (values: CreateBookDto) => {
    console.log(values);
  };

  return (
    <Modal
      title={book ? 'Update Entry' : 'New Entry'}
      opened={isOpened}
      onClose={close}
    >
      <Box maw={420} mx="auto">
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
          <Button type="submit" mt="sm">
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

export default BookModal;
