import { render } from '@testing-library/react';

import BookTableRow from './book-table-row';

describe('BookTableRow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BookTableRow book={{}} />);
    expect(baseElement).toBeTruthy();
  });
});
