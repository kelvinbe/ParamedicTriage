import { getPendingRecords, removeRecord } from './triageStorage';
import { triageApi } from '../API/triageApi';

let isSyncing = false;

export const syncPendingRecords = async () => {

  const records = getPendingRecords();

  if (records.length === 0) {
    return false;
  }

  for (const record of records) {
    try {
      await triageApi(record);
      removeRecord(record.id);
    } catch {
      return false;
    }
  }

  return true;
};