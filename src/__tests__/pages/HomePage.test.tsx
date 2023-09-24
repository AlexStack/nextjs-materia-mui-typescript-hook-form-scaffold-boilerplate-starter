import { render, screen } from '@testing-library/react';

import Homepage from '@/component/Homepage';

export function mockFetch(data: unknown) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => data,
    })
  );
}

describe('Homepage', () => {
  it('renders the Components', () => {
    window.fetch = mockFetch({});
    render(<Homepage />);

    const heading = screen.getByText(/HiHB/i);

    expect(heading).toBeInTheDocument();
  });
});
