import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from '../Header';

// Mock the Dynamic context
vi.mock('@dynamic-labs/sdk-react-core', () => ({
  useDynamicContext: () => ({
    user: {
      verifiedCredentials: [
        {
          address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0',
        },
      ],
    },
    isAuthenticated: true,
    handleLogOut: vi.fn(),
  }),
}));

describe('Header', () => {
  it('renders the app title', () => {
    render(<Header />);
    expect(screen.getByText('Web3 Message Signer')).toBeInTheDocument();
  });

  it('displays user address when authenticated', () => {
    render(<Header />);
    expect(screen.getByText(/0x742d/)).toBeInTheDocument();
  });

  it('shows disconnect button when authenticated', () => {
    render(<Header />);
    expect(screen.getByText('Disconnect')).toBeInTheDocument();
  });
});

