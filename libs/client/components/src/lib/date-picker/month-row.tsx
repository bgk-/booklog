import dayjs from 'dayjs';
import { Button, Text } from '@mantine/core';
import { useDatePickerStore } from './store';
import { useStyles } from './styles';

export const MonthRow = () => {
  const { date, setDate } = useDatePickerStore();
  const { classes, theme } = useStyles();
  const month = dayjs(date).month();
  const buttons = Array.from(Array(12).keys()).map((m) => {
    return (
      <Button
        key={m}
        className={`${classes.button} ${
          m === month ? classes.active : classes.inactive
        }`}
        onClick={() => setDate(dayjs(date).month(m).toDate())}
        variant={'subtle'}
      >
        <Text
          fw={m === month ? 'bolder' : 'normal'}
          color={m === month ? theme.primaryColor : theme.colors.gray[4]}
        >
          {dayjs(date).month(m).format('MMM').toUpperCase()}
        </Text>
      </Button>
    );
  });
  return <div className={classes.container}>{buttons}</div>;
};
