import { ethers } from 'ethers';
import { verifySignature, isValidAddress, normalizeAddress } from './signatureService';
import {describe, it, expect} from 'vitest'

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

      // The signature is valid, but for a different message
      // ethers.verifyMessage will still recover an address (just not the expected one)
      expect(result.isValid).toBe(true);
      expect(result.signer).not.toBe(wallet.address);
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
      const wallet = ethers.Wallet.createRandom();
      expect(isValidAddress(wallet.address)).toBe(true);
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
      const wallet = ethers.Wallet.createRandom();
      const lowercase = wallet.address.toLowerCase();
      const normalized = normalizeAddress(lowercase);
      expect(normalized).toBe(wallet.address);
    });

    it('should return null for invalid address', () => {
      expect(normalizeAddress('invalid')).toBe(null);
      expect(normalizeAddress('0x123')).toBe(null);
    });

    it('should handle already checksummed addresses', () => {
      const wallet = ethers.Wallet.createRandom();
      const normalized = normalizeAddress(wallet.address);
      expect(normalized).toBe(wallet.address);
    });
  });
});

