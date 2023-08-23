import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Book } from '@booklog/shared/types';

interface BookModalState {
  book: Book | null;
  isOpened: boolean;
  open: (book: Book | null) => void;
  close: () => void;
}

const createModalStore = (name: string) =>
  create<BookModalState>()(
    devtools(
      persist(
        (set) => ({
          book: null,
          isOpened: false,
          open: (book: Book | null) => set(() => ({ isOpened: true, book })),
          close: () => set(() => ({ isOpened: false, book: null })),
        }),
        {
          name,
        }
      )
    )
  );

export const useBookModalStore = createModalStore('book-modal-store');
export const useBookDeleteStore = createModalStore('book-modal-delete-store');
