import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  notes: {
    fontSize: 'small',
    margin: '0 auto 1em',
    width: '60vw',
  },
  pre: {
    whiteSpace: 'pre-wrap',
  },
  details: {
    display: 'inline-flex',
    justifyContent: 'space-around',
  },
  padding0: {
    padding: 0,
  },
  w35: {
    width: '35%',
  },
  w25: {
    width: '25%',
  },
  w15: {
    width: '15%',
  },
  w10: {
    width: '10%',
  },
}));
