import React, { createContext, useState, ReactNode, useEffect } from 'react';

import NetInfo from '@react-native-community/netinfo';

import { submitTriage } from '../services/triageService';
import { syncPendingRecords } from '../services/syncService';

import { CreateTriageDto, TriageResponseDto } from '../types';

interface TriageContextType {
  triageResult: TriageResponseDto | null;
  loading: boolean;
  error: string;

  submitPatient: (dto: CreateTriageDto) => Promise<void>;

  clearResult: () => void;

  syncMessage: string;
  syncType: 'success' | 'warning' | 'error';
}

export const TriageContext = createContext<TriageContextType>(
  {} as TriageContextType,
);

interface Props {
  children: ReactNode;
}

export default function TriageContextProvider({ children }: Props) {
  const [triageResult, setTriageResult] = useState<TriageResponseDto | null>(
    null,
  );

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  const [syncMessage, setSyncMessage] = useState('');

  const [syncType, setSyncType] = useState<'success' | 'warning' | 'error'>(
    'success',
  );

  /**
   * Hide banner after 3 seconds
   */
  useEffect(() => {
    if (!syncMessage) {
      return;
    }

    const timer = setTimeout(() => {
      setSyncMessage('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [syncMessage]);

  /**
   * Listen for connectivity changes
   */
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async state => {
      console.log('Connection changed:', state.isConnected);

      if (!state.isConnected) {
        return;
      }

      console.log('Calling syncPendingRecords()');

      const synced = await syncPendingRecords();

      if (synced) {
        setSyncMessage('All pending records synchronized.');

        setSyncType('success');
      }
    });

    return unsubscribe;
  }, []);

  /**
   * Submit patient
   */
  const submitPatient = async (dto: CreateTriageDto) => {
    try {
      setLoading(true);

      setError('');

      const result = await submitTriage(dto);

      console.log('dto', dto);

      setTriageResult(result.response);

      if (result.offline) {
        setSyncMessage('No internet connection. Record saved locally.');

        setSyncType('warning');
      } else {
        setSyncMessage('Record submitted successfully.');

        setSyncType('success');
      }
    } catch (err) {
      console.log('triage error', err);

      setError('Unable to process triage.');

      setSyncMessage('Submission failed.');

      setSyncType('error');
    } finally {
      setLoading(false);
    }
  };

  const clearResult = () => {
    setTriageResult(null);
  };

  return (
    <TriageContext.Provider
      value={{
        triageResult,
        loading,
        error,
        submitPatient,
        clearResult,
        syncMessage,
        syncType,
      }}
    >
      {children}
    </TriageContext.Provider>
  );
}
