import { Button, Center, Group, Modal, Space, Text } from '@mantine/core';
import { useBookDeleteStore } from './store';
import { API_URL } from '../../constants';
import { useState } from 'react';
import { useSWRConfig } from 'swr';
import { useDatePickerStore } from '../date-picker';

export function BookModalDelete() {
  const { book, close, isOpened } = useBookDeleteStore();
  const [isLoading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();
  const { url } = useDatePickerStore();

  const onDelete = async () => {
    setLoading(true);
    if (!book) {
      console.warn('No book selected for deletion. Closing.');
      return close();
    }
    const bookUrl = new URL(API_URL + (book._id as string));
    await fetch(bookUrl, { method: 'DELETE' });
    setLoading(false);
    await mutate(url);
    close();
  };
  return (
    <Modal opened={isOpened} onClose={close} centered withCloseButton={false}>
      <Center>
        <Text>Are you sure?</Text>
      </Center>
      <Space h={'xl'} />
      <Center>
        <Group>
          <Button
            variant={'filled'}
            color={'red'}
            onClick={onDelete}
            loading={isLoading}
          >
            Yes
          </Button>
          <Button variant={'light'} onClick={close} loading={isLoading}>
            No
          </Button>
        </Group>
      </Center>
    </Modal>
  );
}
