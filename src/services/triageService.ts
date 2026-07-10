// services/triageService.ts

import NetInfo from '@react-native-community/netinfo';

import {triageApi} from '../API/triageApi';

import {
  saveRecord,
  removeRecord,
  getPendingRecords,
} from './triageStorage';


export const submitTriage = async(dto) => {


  // 1. Save immediately
  await saveRecord(dto);

  console.log(getPendingRecords());

  // 2. Check connection
  const network =
    await NetInfo.fetch();


  // 3. Offline
  if(!network.isConnected){

    return {
      riskLevel: 'PENDING',
      recommendation:
        'Saved locally. Waiting for connection.',
      estimatedWaitTime:
        'Unknown',
    };

  }


  // 4. Online
  const response =
    await triageApi(dto);


  // 5. Remove from queue
  await removeRecord(dto.id);


  return response;

};