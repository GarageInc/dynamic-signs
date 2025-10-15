import { ethers } from 'ethers';
import { verifySignature, isValidAddress, normalizeAddress } from './signatureService';

describe('signatureService', () => {
  describe('verifySignature', () => {
    it('should verify a valid signature', async () => {
      // Create a wallet for testing
      const wallet = ethers.Wallet.createRandom();
      const message = 'Hello, Web3!';
      const signature = await wallet.signMessage(message);

      const result = await verifySignature(message, signature);

      expect(result.isValid).toBe(true);
      expect(result.signer).toBe(wallet.address);
    });

    it('should return invalid for incorrect signature', async () => {
      const message = 'Hello, Web3!';
      const invalidSignature = '0x1234567890abcdef';

      const result = await verifySignature(message, invalidSignature);

      expect(result.isValid).toBe(false);
      expect(result.signer).toBe(null);
    });

    it('should return invalid when message does not match signature', async () => {
      const wallet = ethers.Wallet.createRandom();
      const originalMessage = 'Hello, Web3!';
      const differentMessage = 'Goodbye, Web3!';
      const signature = await wallet.signMessage(originalMessage);

      const result = await verifySignature(differentMessage, signature);

      // The signature will be valid but for a different signer
      // Since we're verifying a different message, it should fail
      expect(result.isValid).toBe(false);
      expect(result.signer).toBe(null);
    });

    it('should handle empty message', async () => {
      const wallet = ethers.Wallet.createRandom();
      const message = '';
      const signature = await wallet.signMessage(message);

      const result = await verifySignature(message, signature);

      expect(result.isValid).toBe(true);
      expect(result.signer).toBe(wallet.address);
    });

    it('should handle special characters in message', async () => {
      const wallet = ethers.Wallet.createRandom();
      const message = '🚀 Hello! @#$%^&*() Testing 123';
      const signature = await wallet.signMessage(message);

      const result = await verifySignature(message, signature);

      expect(result.isValid).toBe(true);
      expect(result.signer).toBe(wallet.address);
    });
  });

  describe('isValidAddress', () => {
    it('should return true for valid Ethereum address', () => {
      const validAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0';
      expect(isValidAddress(validAddress)).toBe(true);
    });

    it('should return false for invalid address', () => {
      expect(isValidAddress('invalid')).toBe(false);
      expect(isValidAddress('0x123')).toBe(false);
      expect(isValidAddress('')).toBe(false);
    });

    it('should handle lowercase addresses', () => {
      const address = '0x742d35cc6634c0532925a3b844bc9e7595f0beb0';
      expect(isValidAddress(address)).toBe(true);
    });
  });

  describe('normalizeAddress', () => {
    it('should normalize address to checksum format', () => {
      const address = '0x742d35cc6634c0532925a3b844bc9e7595f0beb0';
      const normalized = normalizeAddress(address);
      expect(normalized).toBe('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0');
    });

    it('should return null for invalid address', () => {
      expect(normalizeAddress('invalid')).toBe(null);
      expect(normalizeAddress('0x123')).toBe(null);
    });

    it('should handle already checksummed addresses', () => {
      const address = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0';
      const normalized = normalizeAddress(address);
      expect(normalized).toBe(address);
    });
  });
});

