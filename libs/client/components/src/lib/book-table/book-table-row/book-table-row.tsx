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

export interface BookTableRowProps {
  book: Book;
}

export function BookTableRow(props: BookTableRowProps) {
  const { classes, theme } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const { book } = props;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const openEdit = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const openDelete = () => {};

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
            <ActionIcon size="s" m={rem(2)} onClick={openEdit}>
              <IconEdit />
            </ActionIcon>
            <ActionIcon size="s" m={rem(2)} onClick={openDelete}>
              <IconTrash />
            </ActionIcon>
          </Center>
        </td>
      </tr>
      <Collapse in={opened} className={classes.notes}>
        <Text>
          <pre className={classes.pre}>{book.notes}</pre>
        </Text>
      </Collapse>
    </>
  );
}

export default BookTableRow;
