import React, {
  createContext,
  useState,
  ReactNode,
  useEffect
} from 'react';

import { submitTriage } from '../services/triageService';

import {
  CreateTriageDto,
  TriageResponseDto,
} from '../types';

import NetInfo from '@react-native-community/netinfo';
import { syncPendingRecords } from '../services/syncService';


interface TriageContextType {
  triageResult: TriageResponseDto | null;
  loading: boolean;
  error: string;
  submitPatient: (
    dto: CreateTriageDto
  ) => Promise<void>;
  clearResult: () => void;
}


export const TriageContext =
  createContext<TriageContextType>(
    {} as TriageContextType
  );


interface Props {
  children: ReactNode;
}


export default function TriageContextProvider({
  children,
}: Props) {

  const [triageResult, setTriageResult] =
    useState<TriageResponseDto | null>(null);


  const [loading, setLoading] =
    useState(false);


  const [error, setError] =
    useState('');

useEffect(() => {
  console.log('TriageContext mounted');

  const unsubscribe = NetInfo.addEventListener(state => {
    console.log('Connection changed:', state.isConnected);

    if (state.isConnected) {
      console.log('Calling syncPendingRecords()');
      syncPendingRecords();
    }
  });

  return () => {
    console.log('TriageContext unmounted');
    unsubscribe();
  };
}, []);


  const submitPatient = async (
    dto: CreateTriageDto
  ) => {

    try {

      setLoading(true);

      setError('');

      const response =
        await submitTriage(dto);

        console.log('dto', dto)
      setTriageResult(response);


    } catch (err) {

      console.log(
        'triage error',
        err
      );


      setError(
        'Unable to process triage'
      );


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