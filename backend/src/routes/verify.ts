import { Router, Request, Response } from 'express';
import { verifySignature } from '../services/signatureService';

const router = Router();

interface VerifyRequest {
  message: string;
  signature: string;
}

router.post('/verify-signature', async (req: Request, res: Response) => {
  try {
    const { message, signature } = req.body as VerifyRequest;

    // Validate input
    if (typeof message !== 'string' || message.length === 0) {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Message is required and must be a non-empty string'
      });
    }

    if (!signature || typeof signature !== 'string') {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Signature is required and must be a string'
      });
    }

    // Verify the signature
    const result = await verifySignature(message, signature);

    res.json({
      isValid: result.isValid,
      signer: result.signer,
      originalMessage: message,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Verification error:', error);
    
    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes('invalid signature')) {
        return res.status(400).json({
          error: 'Invalid signature',
          message: 'The provided signature is malformed or invalid'
        });
      }
    }

    res.status(500).json({
      error: 'Verification failed',
      message: 'An error occurred while verifying the signature'
    });
  }
});

export default router;

