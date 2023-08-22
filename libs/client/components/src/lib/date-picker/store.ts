import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface DatePickerState {
  date: Date;
  setDate: (value: Date) => void;
}

export const useDatePickerStore = create<DatePickerState>()(
  devtools(
    persist(
      (set) => ({
        date: new Date(),
        setDate: (value: Date) => set(() => ({ date: value })),
      }),
      {
        name: 'date-picker-store',
      }
    )
  )
);
