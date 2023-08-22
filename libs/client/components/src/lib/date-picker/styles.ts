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
    padding: '0 1em 0',
    fontSize: 10,
    flexGrow: 1,
  },
  active: {
    fontWeight: 'bolder',
    fontSize: 16,
    textDecoration: 'underline',
  },
  inactive: {
    fontWeight: 'normal',
  },
}));
