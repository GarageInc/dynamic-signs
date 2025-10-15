import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

export const useAuth = () => {
  const { user, handleLogOut, setShowAuthFlow, primaryWallet } = useDynamicContext();
  
  const isAuthenticated = Boolean(
    user && user.verifiedCredentials && user.verifiedCredentials.length > 0
  );

  return {
    user,
    isAuthenticated,
    handleLogOut,
    setShowAuthFlow,
    primaryWallet,
  };
};

