import { ActionIcon, createStyles, Header, rem, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { DatePicker } from '@booklog/client/components/server';

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

  const url = new URL('/api/books', 'http://localhost:4200');
  url.searchParams.set(
    'date',
    encodeURIComponent(dayjs(new Date()).startOf('month').format('YYYY-MM-DD'))
  );

  return (
    <>
      <Header height={'3em'} bg={theme.primaryColor} className={classes.header}>
        <Title color={theme.white}>Book log</Title>
      </Header>

      <div className={classes.content}>
        <DatePicker />
        <ActionIcon
          color={theme.primaryColor}
          className={classes.action}
          variant={'filled'}
          // onClick={}
        >
          <IconPlus size={26} />
        </ActionIcon>
      </div>
    </>
  );
}

export default Index;
