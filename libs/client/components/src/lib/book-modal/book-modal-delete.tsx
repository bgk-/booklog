import { Button, Center, Group, Modal, Space, Text } from '@mantine/core';

export function getModal() {
  return (
    <Modal
      opened={deleteBook}
      onClose={closeDelete}
      centered
      withCloseButton={false}
    >
      <Center>
        <Text>Are you sure?</Text>
      </Center>
      <Space h={'xl'} />
      <Center>
        <Group>
          <Button variant={'filled'} color={'red'}>
            Yes
          </Button>
          <Button variant={'light'}>No</Button>
        </Group>
      </Center>
    </Modal>
  );
}
