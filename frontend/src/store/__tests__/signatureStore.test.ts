import { describe, it, expect, beforeEach } from 'vitest';
import { useSignatureStore } from '../signatureStore';

describe('SignatureStore', () => {
  beforeEach(() => {
    useSignatureStore.getState().clearHistory();
  });

  it('should add a signature', () => {
    const signature = {
      id: '1',
      message: 'Test message',
      signature: '0xsignature',
      signer: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0',
      timestamp: new Date().toISOString(),
      isValid: true,
    };

    useSignatureStore.getState().addSignature(signature);

    const signatures = useSignatureStore.getState().signatures;
    expect(signatures).toHaveLength(1);
    expect(signatures[0]).toEqual(signature);
  });

  it('should add multiple signatures in order', () => {
    const sig1 = {
      id: '1',
      message: 'First',
      signature: '0xsig1',
      signer: '0x123',
      timestamp: new Date().toISOString(),
      isValid: true,
    };

    const sig2 = {
      id: '2',
      message: 'Second',
      signature: '0xsig2',
      signer: '0x456',
      timestamp: new Date().toISOString(),
      isValid: true,
    };

    useSignatureStore.getState().addSignature(sig1);
    useSignatureStore.getState().addSignature(sig2);

    const signatures = useSignatureStore.getState().signatures;
    expect(signatures).toHaveLength(2);
    expect(signatures[0]).toEqual(sig2); // Most recent first
    expect(signatures[1]).toEqual(sig1);
  });

  it('should clear history', () => {
    const signature = {
      id: '1',
      message: 'Test',
      signature: '0xsig',
      signer: '0x123',
      timestamp: new Date().toISOString(),
      isValid: true,
    };

    useSignatureStore.getState().addSignature(signature);
    expect(useSignatureStore.getState().signatures).toHaveLength(1);

    useSignatureStore.getState().clearHistory();
    expect(useSignatureStore.getState().signatures).toHaveLength(0);
  });
});

