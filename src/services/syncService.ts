import { getPendingRecords, removeRecord } from './triageStorage';
import { triageApi } from '../API/triageApi';

let isSyncing = false;

export const syncPendingRecords = async () => {
  if (isSyncing) {
    console.log('Sync already running');
    return;
  }

  isSyncing = true;

  try {
    const records = getPendingRecords();

    if (records.length === 0) {
      return;
    }

    console.log(`Syncing ${records.length} records...`);

    for (const record of records) {
      try {
        await triageApi(record);

        removeRecord(record.id);

        console.log(`Synced ${record.id}`);
      } catch {
        console.log(`Failed to sync ${record.id}`);
      }
    }


        console.log('Remaining records:', getPendingRecords());

  } finally {
    isSyncing = false;
  }
};