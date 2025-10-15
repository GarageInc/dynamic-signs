import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { verifySignature } from '../api';

vi.mock('axios');
const mockedAxios = axios as any;

describe('API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('verifySignature', () => {
    it('should successfully verify a signature', async () => {
      const mockResponse = {
        data: {
          isValid: true,
          signer: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0',
          originalMessage: 'Test message',
          timestamp: '2024-01-01T00:00:00.000Z',
        },
      };

      mockedAxios.post.mockResolvedValue(mockResponse);

      const result = await verifySignature('Test message', '0xsignature');

      expect(result).toEqual(mockResponse.data);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/api/verify-signature'),
        {
          message: 'Test message',
          signature: '0xsignature',
        }
      );
    });

    it('should handle API errors', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Invalid signature',
          },
        },
      };

      mockedAxios.post.mockRejectedValue(mockError);
      mockedAxios.isAxiosError.mockReturnValue(true);

      await expect(
        verifySignature('Test message', 'invalid')
      ).rejects.toThrow('Invalid signature');
    });
  });
});

