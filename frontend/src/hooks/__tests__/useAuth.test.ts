import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAuth } from '../useAuth';
import * as dynamicCore from '@dynamic-labs/sdk-react-core';

// Mock the Dynamic context
vi.mock('@dynamic-labs/sdk-react-core', () => ({
  useDynamicContext: vi.fn(),
}));

describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return authenticated state when user has verified credentials', () => {
    vi.mocked(dynamicCore.useDynamicContext).mockReturnValue({
      user: {
        verifiedCredentials: [
          { address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0' },
        ],
      } as any,
      handleLogOut: vi.fn(),
      setShowAuthFlow: vi.fn(),
      primaryWallet: {} as any,
    } as any);

    const { result } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toBeDefined();
  });

  it('should return not authenticated when user has no verified credentials', () => {
    vi.mocked(dynamicCore.useDynamicContext).mockReturnValue({
      user: {
        verifiedCredentials: [],
      } as any,
      handleLogOut: vi.fn(),
      setShowAuthFlow: vi.fn(),
      primaryWallet: null,
    } as any);

    const { result } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toBe(false);
  });

  it('should return not authenticated when user is null', () => {
    vi.mocked(dynamicCore.useDynamicContext).mockReturnValue({
      user: null,
      handleLogOut: vi.fn(),
      setShowAuthFlow: vi.fn(),
      primaryWallet: null,
    } as any);

    const { result } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBe(null);
  });

  it('should expose all necessary auth methods', () => {
    const mockHandleLogOut = vi.fn();
    const mockSetShowAuthFlow = vi.fn();
    
    vi.mocked(dynamicCore.useDynamicContext).mockReturnValue({
      user: { verifiedCredentials: [{ address: '0x123' }] } as any,
      handleLogOut: mockHandleLogOut,
      setShowAuthFlow: mockSetShowAuthFlow,
      primaryWallet: { address: '0x123' } as any,
    } as any);

    const { result } = renderHook(() => useAuth());

    expect(result.current.handleLogOut).toBe(mockHandleLogOut);
    expect(result.current.setShowAuthFlow).toBe(mockSetShowAuthFlow);
    expect(result.current.primaryWallet).toBeDefined();
  });
});
