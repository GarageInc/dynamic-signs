import { useAuth } from '../hooks/useAuth';

const Header = () => {
  const { user, isAuthenticated, handleLogOut } = useAuth();

  return (
    <header className="glass-effect border-b border-slate-700/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                SynX Labs
              </h1>
              <p className="text-xs text-slate-400">Secure Message Signing Infrastructure</p>
            </div>
          </div>

          {/* User Info and Logout */}
          {isAuthenticated && user && (
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 bg-slate-700/50 px-4 py-2 rounded-lg border border-slate-600">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-slate-200">
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

