import { useState } from 'react';
import { useSignatureStore } from '../store/signatureStore';

const SignatureHistory = () => {
  const { signatures, clearHistory } = useSignatureStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="card space-y-6 border border-slate-700/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Signature History</h2>
            <p className="text-sm text-slate-400">{signatures.length} signed message{signatures.length !== 1 ? 's' : ''}</p>
          </div>
        </div>

        {signatures.length > 0 && (
          <button
            onClick={clearHistory}
            className="text-sm text-red-400 hover:text-red-300 font-medium transition-colors duration-200"
          >
            Clear All
          </button>
        )}
      </div>

      {signatures.length === 0 ? (
        <div className="text-center py-12 space-y-3">
          <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto border border-slate-600">
            <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-slate-300">No signatures yet</p>
          <p className="text-sm text-slate-500">Sign a message to see it here</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
          {signatures.map((sig, index) => (
            <div
              key={sig.id}
              className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600 rounded-lg p-4 hover:shadow-lg hover:shadow-cyan-500/10 hover:border-cyan-500/30 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold rounded-full">
                      {signatures.length - index}
                    </span>
                    <span className="text-xs text-slate-400">
                      {formatTimestamp(sig.timestamp)}
                    </span>
                  </div>
                  <p className="font-medium text-white truncate">
                    {sig.message}
                  </p>
                </div>

                <button
                  onClick={() => toggleExpand(sig.id)}
                  className="ml-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                >
                  <svg
                    className={`w-5 h-5 transform transition-transform duration-200 ${
                      expandedId === sig.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {expandedId === sig.id && (
                <div className="mt-4 space-y-3 animate-fade-in">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-medium text-slate-400">Signer Address</label>
                      <button
                        onClick={() => copyToClipboard(sig.signer)}
                        className="text-xs text-cyan-400 hover:text-cyan-300"
                      >
                        Copy
                      </button>
                    </div>
                    <div className="bg-slate-900/50 border border-slate-600 rounded px-3 py-2">
                      <p className="font-mono text-xs text-slate-300 break-all">
                        {sig.signer}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-medium text-slate-400">Signature</label>
                      <button
                        onClick={() => copyToClipboard(sig.signature)}
                        className="text-xs text-cyan-400 hover:text-cyan-300"
                      >
                        Copy
                      </button>
                    </div>
                    <div className="bg-slate-900/50 border border-slate-600 rounded px-3 py-2">
                      <p className="font-mono text-xs text-slate-300 break-all">
                        {sig.signature}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 bg-cyan-900/20 border border-cyan-500/50 rounded px-3 py-2">
                    <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs font-medium text-cyan-300">Verified ✓</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SignatureHistory;

