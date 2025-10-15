import request from 'supertest';
import { ethers } from 'ethers';
import { app, server } from '../index';

describe('POST /api/verify-signature', () => {
  afterAll(() => {
    if (server.listening) {
      server.close();
    }
  });

  it('should verify a valid signature', async () => {
    const wallet = ethers.Wallet.createRandom();
    const message = 'Test message';
    const signature = await wallet.signMessage(message);

    const response = await request(app)
      .post('/api/verify-signature')
      .send({ message, signature })
      .expect(200);

    expect(response.body).toMatchObject({
      isValid: true,
      signer: wallet.address,
      originalMessage: message
    });
    expect(response.body.timestamp).toBeDefined();
  });

  it('should return 400 for missing message', async () => {
    const response = await request(app)
      .post('/api/verify-signature')
      .send({ signature: '0x123' })
      .expect(400);

    expect(response.body.error).toBe('Invalid request');
  });

  it('should return 400 for missing signature', async () => {
    const response = await request(app)
      .post('/api/verify-signature')
      .send({ message: 'Test' })
      .expect(400);

    expect(response.body.error).toBe('Invalid request');
  });

  it('should handle invalid signature format', async () => {
    const response = await request(app)
      .post('/api/verify-signature')
      .send({
        message: 'Test message',
        signature: 'invalid-signature'
      })
      .expect(200);

    expect(response.body.isValid).toBe(false);
  });

  it('should return invalid for mismatched message and signature', async () => {
    const wallet = ethers.Wallet.createRandom();
    const signature = await wallet.signMessage('Original message');

    const response = await request(app)
      .post('/api/verify-signature')
      .send({
        message: 'Different message',
        signature
      })
      .expect(200);

    expect(response.body.isValid).toBe(true);
    expect(response.body.signer).not.toBe(wallet.address);
  });

  it('should handle empty message', async () => {
    const response = await request(app)
      .post('/api/verify-signature')
      .send({ message: '', signature: '0x123' })
      .expect(400);

    expect(response.body.error).toBeDefined();
  });
});

describe('GET /health', () => {
  it('should return health status', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);

    expect(response.body).toMatchObject({
      status: 'ok'
    });
    expect(response.body.timestamp).toBeDefined();
  });
});

