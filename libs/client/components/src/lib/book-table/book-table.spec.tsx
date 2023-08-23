import { render } from '@testing-library/react';

import BookTable from './book-table';

describe('BookTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BookTable />);
    expect(baseElement).toBeTruthy();
  });
});
