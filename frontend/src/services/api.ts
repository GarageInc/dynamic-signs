import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface VerifySignatureResponse {
  isValid: boolean;
  signer: string;
  originalMessage: string;
  timestamp: string;
}

export const verifySignature = async (
  message: string,
  signature: string
): Promise<VerifySignatureResponse> => {
  try {
    const response = await axios.post<VerifySignatureResponse>(
      `${API_URL}/api/verify-signature`,
      {
        message,
        signature,
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to verify signature'
      );
    }
    throw error;
  }
};

