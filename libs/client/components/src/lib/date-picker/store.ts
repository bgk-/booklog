import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import dayjs from 'dayjs';

interface DatePickerState {
  date: Date;
  url: string;
  setDate: (value: Date) => void;
}

const createUrl = (date: Date) => {
  return `/api/books?startDate=${dayjs(date)
    .startOf('month')
    .format('YYYY-MM-DD')}&endDate=${dayjs(date)
    .endOf('month')
    .format('YYYY-MM-DD')}`;
};
export const useDatePickerStore = create<DatePickerState>()(
  devtools(
    persist(
      (set) => ({
        date: new Date(),
        url: createUrl(new Date()),
        setDate: (value: Date) =>
          set(() => ({ date: value, url: createUrl(value) })),
      }),
      {
        name: 'date-picker-store',
      }
    )
  )
);
