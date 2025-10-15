import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import MainApp from './components/MainApp';

const App = () => {
  const environmentId = import.meta.env.VITE_DYNAMIC_ENVIRONMENT_ID;

  if (!environmentId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card max-w-md text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Configuration Error</h1>
          <p className="text-slate-600">
            Please set up your Dynamic.xyz environment ID in the <code className="bg-slate-100 px-2 py-1 rounded">.env</code> file.
          </p>
          <p className="text-sm text-slate-500 mt-4">
            Copy <code className="bg-slate-100 px-2 py-1 rounded">.env.example</code> to <code className="bg-slate-100 px-2 py-1 rounded">.env</code> and add your credentials.
          </p>
        </div>
      </div>
    );
  }

  return (
    <DynamicContextProvider
      settings={{
        environmentId,
        walletConnectors: [EthereumWalletConnectors],
        // Headless configuration - no default UI widgets
        eventsCallbacks: {
          onAuthSuccess: (args) => {
            console.log('Authentication successful', args);
          },
          onLogout: () => {
            console.log('User logged out');
          },
        },
      }}
    >
      <MainApp />
    </DynamicContextProvider>
  );
};

export default App;

