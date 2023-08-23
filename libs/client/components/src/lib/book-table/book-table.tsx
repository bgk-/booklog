import { Center, Loader, rem, Table } from '@mantine/core';
import BookTableRow from './book-table-row/book-table-row';
import { Book } from '@booklog/shared/types';
import { useStyles } from './styles';
import useSWR from 'swr';
import { useDatePickerStore } from '../date-picker';

const fetcher = (...args: [never]) => fetch(...args).then((res) => res.json());

export function BookTable() {
  const { classes } = useStyles();
  const { url } = useDatePickerStore();

  const { data, error, isLoading } = useSWR(url, fetcher);
  const rows = data?.map((book: Book) => (
    <BookTableRow key={`row_${book._id}`} book={book} />
  ));
  return (
    <>
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
        <tbody>{!isLoading && rows}</tbody>
      </Table>
      {isLoading && (
        <Center w={'60vw'} h={rem(50)}>
          <Loader variant={'dots'} />
        </Center>
      )}
    </>
  );
}

export default BookTable;
