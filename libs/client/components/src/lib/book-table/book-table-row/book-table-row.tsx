import { ActionIcon, Center, Collapse, Rating, rem, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconEdit,
  IconNotes,
  IconSquare,
  IconSquareCheckFilled,
  IconTrash,
} from '@tabler/icons-react';
import { Book } from '@booklog/shared/types';
import { useStyles } from '../styles';
import { modals } from '@mantine/modals';
import { API_URL } from '../../../constants';
import { useSWRConfig } from 'swr';
import { useDatePickerStore } from '../../date-picker';

export interface BookTableRowProps {
  book: Book;
}

export function BookTableRow(props: BookTableRowProps) {
  const { classes, theme } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const { mutate } = useSWRConfig();
  const { url } = useDatePickerStore();

  const { book } = props;
  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: `Delete ${book.title}`,
      centered: true,
      children: (
        <Center>
          <Text>Are you sure?</Text>
        </Center>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        const bookUrl = new URL(API_URL + (book._id as string));
        await fetch(bookUrl, { method: 'DELETE' });
        await mutate(url);
      },
    });

  const openEditModal = () => {
    modals.openContextModal({
      modal: 'createOrUpdate',
      title: 'Update Entry',
      innerProps: { book },
    });
  };
  return (
    <>
      <tr key={book._id as string}>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>
          <Rating
            defaultValue={book.rating}
            color={theme.primaryColor}
            readOnly
          />
        </td>
        <td>
          <Center>
            <ActionIcon
              size="s"
              m={rem(2)}
              color={theme.primaryColor}
              style={{ pointerEvents: 'none' }}
            >
              {book.isComplete && <IconSquareCheckFilled />}
              {!book.isComplete && <IconSquare />}
            </ActionIcon>
            <ActionIcon size="s" onClick={toggle} m={rem(2)}>
              <IconNotes />
            </ActionIcon>
          </Center>
        </td>
        <td>
          <Center>
            <ActionIcon size="s" m={rem(2)} onClick={openEditModal}>
              <IconEdit />
            </ActionIcon>
            <ActionIcon size="s" m={rem(2)} onClick={openDeleteModal}>
              <IconTrash />
            </ActionIcon>
          </Center>
        </td>
      </tr>
      {opened && (
        <tr>
          <td colSpan={5} style={{ padding: 0 }}>
            <Collapse in={opened} className={classes.notes}>
              <Text>
                <pre className={classes.pre}>{book.notes}</pre>
              </Text>
            </Collapse>
          </td>
        </tr>
      )}
    </>
  );
}

export default BookTableRow;
