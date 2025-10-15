import { ethers } from 'ethers';

export interface VerificationResult {
  isValid: boolean;
  signer: string | null;
}

/**
 * Verifies an Ethereum signature and recovers the signer address
 * @param message - The original message that was signed
 * @param signature - The signature to verify
 * @returns VerificationResult containing validity and signer address
 */
export async function verifySignature(
  message: string,
  signature: string
): Promise<VerificationResult> {
  try {
    // Recover the address that signed the message
    const signerAddress = ethers.verifyMessage(message, signature);

    // If we successfully recovered an address, the signature is valid
    return {
      isValid: true,
      signer: signerAddress
    };
  } catch (error) {
    console.error('Signature verification failed:', error);
    
    // If verification fails, return invalid result
    return {
      isValid: false,
      signer: null
    };
  }
}

/**
 * Validates that an address is a valid Ethereum address
 * @param address - The address to validate
 * @returns boolean indicating if the address is valid
 */
export function isValidAddress(address: string): boolean {
  try {
    return ethers.isAddress(address);
  } catch {
    return false;
  }
}

/**
 * Normalizes an Ethereum address to checksum format
 * @param address - The address to normalize
 * @returns checksummed address or null if invalid
 */
export function normalizeAddress(address: string): string | null {
  try {
    return ethers.getAddress(address);
  } catch {
    return null;
  }
}

