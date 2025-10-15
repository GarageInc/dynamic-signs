import { useState } from 'react';
import { verifySignature } from '../services/api';
import { useSignatureStore } from '../store/signatureStore';
import { useAuth } from '../hooks/useAuth';

const MessageSigner = () => {
  const { primaryWallet } = useAuth();
  const [message, setMessage] = useState('');
  const [isSigning, setIsSigning] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const addSignature = useSignatureStore((state) => state.addSignature);

  const handleSign = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      setError('Please enter a message to sign');
      return;
    }

    if (!primaryWallet) {
      setError('No wallet connected');
      return;
    }

    setError(null);
    setSuccess(null);
    setIsSigning(true);

      try {
        // Sign the message using Dynamic's wallet connector
        const signature = await primaryWallet.signMessage(message);

        if (!signature) {
          setError('Failed to sign message');
          setIsSigning(false);
          return;
        }

        setIsSigning(false);
        setIsVerifying(true);

      // Verify the signature with the backend
      const result = await verifySignature(message, signature);

      if (result.isValid) {
        // Add to history
        addSignature({
          id: Date.now().toString(),
          message,
          signature,
          signer: result.signer,
          timestamp: new Date().toISOString(),
          isValid: true,
        });

        setSuccess('Message signed and verified successfully! ✅');
        setMessage('');
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError('Signature verification failed');
      }
    } catch (err) {
      console.error('Signing error:', err);
      setError(err instanceof Error ? err.message : 'Failed to sign message');
    } finally {
      setIsSigning(false);
      setIsVerifying(false);
    }
  };

  const exampleMessages = [
    'Hello, Web3!',
    'I agree to the terms and conditions',
    'Authenticate me on this dApp',
    'Verify my identity',
  ];

  const handleExampleClick = (exampleMessage: string) => {
    setMessage(exampleMessage);
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="card space-y-6 border border-slate-700/50">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/30">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Sign Message</h2>
          <p className="text-sm text-slate-400">Cryptographic message signing with precision</p>
        </div>
      </div>

      <form onSubmit={handleSign} className="space-y-4">
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
            Your Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter any message you want to sign..."
            className="input-field resize-none h-32"
            disabled={isSigning || isVerifying}
          />
        </div>

        {/* Example Messages */}
        <div>
          <p className="text-xs font-medium text-slate-400 mb-2">Quick Examples:</p>
          <div className="flex flex-wrap gap-2">
            {exampleMessages.map((example, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleExampleClick(example)}
                className="text-xs px-3 py-1.5 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-full transition-colors duration-200 border border-slate-600"
                disabled={isSigning || isVerifying}
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg flex items-start space-x-2">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-cyan-900/20 border border-cyan-500/50 text-cyan-400 px-4 py-3 rounded-lg flex items-start space-x-2 animate-fade-in">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">{success}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={!message.trim() || isSigning || isVerifying}
          className="btn-primary w-full flex items-center justify-center space-x-2"
        >
          {isSigning ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Signing Message...</span>
            </>
          ) : isVerifying ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Verifying Signature...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              <span>Sign & Verify Message</span>
            </>
          )}
        </button>
      </form>

      {/* Info */}
      <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xs text-cyan-300">
            Institutional-grade cryptographic signing with backend verification to ensure message authenticity and integrity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageSigner;

