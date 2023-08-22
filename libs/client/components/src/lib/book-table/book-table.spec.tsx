import { render } from '@testing-library/react';

import BookTable from './book-table';

describe('BookTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BookTable isLoading={false} books={null} />
    );
    expect(baseElement).toBeTruthy();
  });
});
