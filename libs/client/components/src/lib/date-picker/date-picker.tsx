import { YearRow } from './year-row';
import { MonthRow } from './month-row';
import { useStyles } from './styles';

export function DatePicker() {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <YearRow />
      <MonthRow />
    </div>
  );
}

export default DatePicker;
