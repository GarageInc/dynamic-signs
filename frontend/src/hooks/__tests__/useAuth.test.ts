import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAuth } from '../useAuth';

// Mock the Dynamic context
vi.mock('@dynamic-labs/sdk-react-core', () => ({
  useDynamicContext: vi.fn(),
}));

describe('useAuth', () => {
  it('should return authenticated state when user has verified credentials', () => {
    const { useDynamicContext } = require('@dynamic-labs/sdk-react-core');
    
    useDynamicContext.mockReturnValue({
      user: {
        verifiedCredentials: [
          { address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0' },
        ],
      },
      handleLogOut: vi.fn(),
      setShowAuthFlow: vi.fn(),
      primaryWallet: {},
    });

    const { result } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toBeDefined();
  });

  it('should return not authenticated when user has no verified credentials', () => {
    const { useDynamicContext } = require('@dynamic-labs/sdk-react-core');
    
    useDynamicContext.mockReturnValue({
      user: {
        verifiedCredentials: [],
      },
      handleLogOut: vi.fn(),
      setShowAuthFlow: vi.fn(),
      primaryWallet: null,
    });

    const { result } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toBe(false);
  });

  it('should return not authenticated when user is null', () => {
    const { useDynamicContext } = require('@dynamic-labs/sdk-react-core');
    
    useDynamicContext.mockReturnValue({
      user: null,
      handleLogOut: vi.fn(),
      setShowAuthFlow: vi.fn(),
      primaryWallet: null,
    });

    const { result } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBe(null);
  });

  it('should expose all necessary auth methods', () => {
    const { useDynamicContext } = require('@dynamic-labs/sdk-react-core');
    const mockHandleLogOut = vi.fn();
    const mockSetShowAuthFlow = vi.fn();
    
    useDynamicContext.mockReturnValue({
      user: { verifiedCredentials: [{ address: '0x123' }] },
      handleLogOut: mockHandleLogOut,
      setShowAuthFlow: mockSetShowAuthFlow,
      primaryWallet: { address: '0x123' },
    });

    const { result } = renderHook(() => useAuth());

    expect(result.current.handleLogOut).toBe(mockHandleLogOut);
    expect(result.current.setShowAuthFlow).toBe(mockSetShowAuthFlow);
    expect(result.current.primaryWallet).toBeDefined();
  });
});

