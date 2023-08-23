import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  wrapper: {
    margin: '2em auto 2em',
  },
  container: {
    margin: 'auto',
    display: 'inline-flex',
    justifyContent: 'space-between',
    width: '100%',
    overflow: 'scroll',
  },
  button: {
    fontSize: 10,
    flexGrow: 1,
    transition: 'font-size 0.2s',
  },
  active: {
    fontWeight: 'bolder',
    textDecoration: 'underline',
    fontSize: 16,
  },
  inactive: {
    fontWeight: 'normal',
  },
}));
