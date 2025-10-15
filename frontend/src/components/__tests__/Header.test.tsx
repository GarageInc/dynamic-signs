import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from '../Header';
import * as useAuthModule from '../../hooks/useAuth';

// Mock the useAuth hook
vi.mock('../../hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

describe('Header', () => {
  beforeEach(() => {
    vi.mocked(useAuthModule.useAuth).mockReturnValue({
      user: {
        verifiedCredentials: [
          {
            address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0',
          },
        ],
      } as any,
      isAuthenticated: true,
      handleLogOut: vi.fn(),
      setShowAuthFlow: vi.fn(),
      primaryWallet: null,
    });
  });

  it('renders the app title', () => {
    render(<Header />);
    expect(screen.getByText('SynX Labs')).toBeDefined();
  });

  it('displays user address when authenticated', () => {
    render(<Header />);
    expect(screen.getByText(/0x742d/)).toBeDefined();
  });

  it('shows disconnect button when authenticated', () => {
    render(<Header />);
    expect(screen.getByText('Disconnect')).toBeDefined();
  });
});
