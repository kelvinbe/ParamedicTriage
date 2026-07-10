// services/triageStorage.ts

import { storage } from '../store/mmkv';
import { CreateTriageDto } from '../types';


const QUEUE_KEY = 'TRIAGE_QUEUE';


export const saveRecord = (
  record: CreateTriageDto
) => {


   console.log('Storage:', storage);
  console.log('getString:', typeof storage.getString);
  console.log('set:', typeof storage.getString);

  const existingRecords =
    JSON.parse(
      storage.getString(QUEUE_KEY) || '[]'
    );


  const updatedRecords = [
    ...existingRecords,
    {
      ...record,
      synced: false,
      retryCount: 0,
    },
  ];


  storage.setString(
    QUEUE_KEY,
    JSON.stringify(updatedRecords)
  );

};

export const getPendingRecords = () => {

  const records = JSON.parse(
    storage.getString(QUEUE_KEY) || '[]'
  );


  return records.filter(
    record => record.synced === false
  );
};


export const removeRecord = (
  id:string
) => {

 const records = getPendingRecords();

 const updated = records.filter(
    item => item.id !== id
 );

 storage.setString(
    QUEUE_KEY,
    JSON.stringify(updated)
 );

};