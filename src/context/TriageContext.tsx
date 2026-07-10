import React, { createContext, useState } from 'react';

import { triageApi } from '../API/triageApi';

import { IPatient, ITriageResult } from '../types';

export const TriageContext = createContext();

export default function TriageContextProvider({ children }) {
  const [triageResult, setTriageResult] = useState<ITriageResult | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  const submitPatient = async (patient: IPatient) => {
    try {
      setLoading(true);

      setError('');

      const response: any = await triageApi(patient);

      setTriageResult(response);

      return response;
    } catch (error) {
      console.log('triage error', error);

      setError('Unable to process triage');
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
      }}
    >
      {children}
    </TriageContext.Provider>
  );
}
