import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  notes: {
    fontSize: 'small',
    margin: '0 1.5em 1em',
    width: '60vw',
  },
  pre: {
    whiteSpace: 'pre-wrap',
  },
  details: {
    display: 'inline-flex',
    justifyContent: 'space-around',
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
