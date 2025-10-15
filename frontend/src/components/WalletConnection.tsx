import { useState } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

const WalletConnection = () => {
  const { setShowAuthFlow, primaryWallet } = useDynamicContext();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      setShowAuthFlow(true);
    } catch (error) {
      console.error('Connection error:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto text-center space-y-8">
      {/* Hero Section */}
      <div className="card space-y-6 border border-cyan-500/20">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full shadow-2xl shadow-cyan-500/50">
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            THE FUTURE OF FINANCIAL INFRASTRUCTURE
          </h1>
          <p className="text-lg text-slate-300 max-w-xl mx-auto">
            Building technology to drive stability, liquidity and improving access to capital through secure, institutional-grade message signing infrastructure.
          </p>
        </div>

        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2"
        >
          {isConnecting ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Connecting...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Connect Wallet</span>
            </>
          )}
        </button>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card space-y-3 hover:shadow-2xl hover:shadow-cyan-500/20 hover:border-cyan-500/30 transition-all duration-300 border border-slate-700/50">
          <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mx-auto border border-cyan-500/20">
            <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="font-semibold text-white">Trust & Security</h3>
          <p className="text-sm text-slate-400">
            Institutional-grade cryptographic signing with precision engineering
          </p>
        </div>

        <div className="card space-y-3 hover:shadow-2xl hover:shadow-cyan-500/20 hover:border-cyan-500/30 transition-all duration-300 border border-slate-700/50">
          <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto border border-blue-500/20">
            <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="font-semibold text-white">Scalable Infrastructure</h3>
          <p className="text-sm text-slate-400">
            Built for performance and reliability at enterprise scale
          </p>
        </div>

        <div className="card space-y-3 hover:shadow-2xl hover:shadow-cyan-500/20 hover:border-cyan-500/30 transition-all duration-300 border border-slate-700/50">
          <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center mx-auto border border-indigo-500/20">
            <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h3 className="font-semibold text-white">Transparent Systems</h3>
          <p className="text-sm text-slate-400">
            Verifiable, auditable signature verification infrastructure
          </p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="card bg-gradient-to-r from-slate-800 to-slate-700 border border-cyan-500/20">
        <div className="flex items-start space-x-3">
          <svg className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-left">
            <h4 className="font-semibold text-white mb-1">Engineering Infrastructure for the Future</h4>
            <p className="text-sm text-slate-300">
              SynX Labs delivers institutional-grade blockchain infrastructure with precision financial engineering, 
              reducing complexity while maintaining security and performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletConnection;

