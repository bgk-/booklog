import dayjs from 'dayjs';
import { Button, Text } from '@mantine/core';
import { useDatePickerStore } from './store';

import { useStyles } from './styles';

export const YearRow = () => {
  const { date, setDate } = useDatePickerStore();
  const { classes, theme } = useStyles();
  const year = dayjs(date).year();
  const years = [];
  const yearPadding = 4;
  for (let i = year - yearPadding; i <= year + yearPadding; i++) {
    years.push(i);
  }
  const buttons = years.map((y) => {
    const isYear = y === year;
    return (
      <Button
        key={y}
        className={classes.button}
        variant={'subtle'}
        onClick={() => setDate(dayjs(date).year(y).toDate())}
      >
        <Text
          className={isYear ? classes.active : classes.inactive}
          color={isYear ? theme.primaryColor : theme.colors.gray[4]}
        >
          {y}
        </Text>
      </Button>
    );
  });

  return <div className={classes.container}>{buttons}</div>;
};
