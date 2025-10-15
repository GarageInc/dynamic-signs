import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SignatureRecord {
  id: string;
  message: string;
  signature: string;
  signer: string;
  timestamp: string;
  isValid: boolean;
}

interface SignatureStore {
  signatures: SignatureRecord[];
  addSignature: (signature: SignatureRecord) => void;
  clearHistory: () => void;
}

export const useSignatureStore = create<SignatureStore>()(
  persist(
    (set) => ({
      signatures: [],
      addSignature: (signature) =>
        set((state) => ({
          signatures: [signature, ...state.signatures],
        })),
      clearHistory: () => set({ signatures: [] }),
    }),
    {
      name: 'signature-storage',
    }
  )
);

