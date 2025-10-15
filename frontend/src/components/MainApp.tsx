import WalletConnection from './WalletConnection';
import MessageSigner from './MessageSigner';
import SignatureHistory from './SignatureHistory';
import Header from './Header';
import { useAuth } from '../hooks/useAuth';

const MainApp = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {!isAuthenticated ? (
          <div className="animate-fade-in">
            <WalletConnection />
          </div>
        ) : (
          <div className="space-y-8 animate-slide-up">
            {/* Welcome Section */}
            <div className="card text-center border border-cyan-500/20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full mb-4 shadow-lg shadow-cyan-500/50">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Connected Successfully
              </h2>
              <p className="text-slate-300">
                Wallet: <span className="font-mono font-semibold text-cyan-400">{user?.verifiedCredentials?.[0]?.address || 'Unknown'}</span>
              </p>
            </div>

            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Message Signer */}
              <div className="space-y-4">
                <MessageSigner />
              </div>

              {/* Signature History */}
              <div className="space-y-4">
                <SignatureHistory />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 pb-8 text-center text-slate-500 text-sm">
        <p className="text-slate-400">© SynX Labs - Building technology to drive stability, liquidity and improving access to capital</p>
        <p className="text-slate-600 mt-2 text-xs">Engineering Infrastructure for Decentralised Finance</p>
      </footer>
    </div>
  );
};

export default MainApp;

