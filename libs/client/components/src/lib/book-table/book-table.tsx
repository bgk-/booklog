import { Center, Loader, rem, Table } from '@mantine/core';
import BookTableRow from './book-table-row/book-table-row';
import { Book } from '@booklog/shared/types';
import { useStyles } from './styles';

export interface BookTableProps {
  books: Book[];
  isLoading: boolean;
}

export function BookTable(props: BookTableProps) {
  const { classes } = useStyles();
  const rows = props.books.map((book) => (
    <BookTableRow key={`row_${book._id}`} book={book} />
  ));

  return (
    <Table
      horizontalSpacing="md"
      verticalSpacing="xs"
      sx={{ tableLayout: 'fixed' }}
    >
      <thead>
        <tr>
          <th className={classes.w35}>Title</th>
          <th className={classes.w25}>Author</th>
          <th className={classes.w15}>Rating</th>
          <th className={classes.w15}>
            <Center>Details</Center>
          </th>
          <th className={classes.w10}>
            <Center>Actions</Center>
          </th>
        </tr>
      </thead>
      <tbody>
        {props.isLoading && (
          <Center w={'60vw'} h={rem(50)}>
            <Loader variant={'dots'} />
          </Center>
        )}
        {!props.isLoading && rows}
      </tbody>
    </Table>
  );
}

export default BookTable;
