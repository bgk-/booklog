import {
  ActionIcon,
  createStyles,
  Group,
  Header,
  rem,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import {
  IconBooks,
  IconMoonStars,
  IconPlus,
  IconSun,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import {
  BookModal,
  BookTable,
  DatePicker,
  useBookModalStore,
} from '@booklog/client/components/server';

const useStyles = createStyles((theme) => ({
  header: {
    fontWeight: 'bolder',
    padding: '0 26px 0',
  },
  action: {
    width: rem(50),
    height: rem(50),
    fontSize: rem(26),
    borderRadius: rem(26),
    position: 'fixed',
    right: rem(26),
    bottom: rem(26),
  },
  content: {
    width: '60vw',
    margin: '3.5rem auto',
  },
}));

export function Index() {
  const { classes, theme } = useStyles();
  const openModal = useBookModalStore((state) => state.open);
  const url = new URL('/api/books', 'http://localhost:4200');
  url.searchParams.set(
    'date',
    encodeURIComponent(dayjs(new Date()).startOf('month').format('YYYY-MM-DD'))
  );
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <>
      <Header height={'3em'} bg={theme.primaryColor} className={classes.header}>
        <Group spacing={0}>
          <IconBooks size={'2.5em'} color={theme.white} />
          <Title color={theme.white}>Book log</Title>
        </Group>
        <ActionIcon
          variant={dark ? 'light' : 'dark'}
          onClick={() => toggleColorScheme()}
          title={'Toggle color scheme'}
          pos={'absolute'}
          right={10}
          top={10}
        >
          {dark ? <IconSun size={'1.1em'} /> : <IconMoonStars size={'1.1em'} />}
        </ActionIcon>
      </Header>

      <div className={classes.content}>
        <DatePicker />
        <BookTable
          isLoading={false}
          books={[
            {
              title: 'Test',
              author: 'Testerson',
              rating: 2,
              notes: 'A truly great read',
              date: new Date(),
              _id: 'test id',
              isComplete: true,
            },
          ]}
        />
        <ActionIcon
          color={theme.primaryColor}
          className={classes.action}
          variant={'filled'}
          onClick={() => openModal(null)}
        >
          <IconPlus size={26} />
        </ActionIcon>
      </div>
      <BookModal />
    </>
  );
}

export default Index;
