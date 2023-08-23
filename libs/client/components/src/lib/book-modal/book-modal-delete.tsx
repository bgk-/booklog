import { Button, Center, Group, Modal, Space, Text } from '@mantine/core';
import { useBookDeleteStore } from './store';

export function BookModalDelete() {
  const { book, close, isOpened } = useBookDeleteStore();

  return (
    <Modal opened={isOpened} onClose={close} centered withCloseButton={false}>
      <Center>
        <Text>Are you sure?</Text>
      </Center>
      <Space h={'xl'} />
      <Center>
        <Group>
          <Button variant={'filled'} color={'red'}>
            Yes
          </Button>
          <Button variant={'light'} onClick={close}>
            No
          </Button>
        </Group>
      </Center>
    </Modal>
  );
}
