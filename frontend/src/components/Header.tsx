import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

const Header = () => {
  const { user, handleLogOut, isAuthenticated } = useDynamicContext();

  return (
    <header className="glass-effect border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Web3 Message Signer
              </h1>
              <p className="text-xs text-slate-500">Sign & Verify Messages On-Chain</p>
            </div>
          </div>

          {/* User Info and Logout */}
          {isAuthenticated && user && (
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 bg-slate-100 px-4 py-2 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-slate-700">
                  {user.verifiedCredentials?.[0]?.address?.slice(0, 6)}...
                  {user.verifiedCredentials?.[0]?.address?.slice(-4)}
                </span>
              </div>
              <button
                onClick={handleLogOut}
                className="btn-secondary text-sm py-2 px-4"
              >
                Disconnect
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

