// services/triageService.ts

import NetInfo from '@react-native-community/netinfo';

import {triageApi} from '../API/triageApi';

import {
  saveRecord,
  removeRecord,
  getPendingRecords,
} from './triageStorage';


export const submitTriage = async(dto) => {


  await saveRecord(dto);

  console.log(getPendingRecords());

  const network =
    await NetInfo.fetch();


  if(!network.isConnected){

    return {
      riskLevel: 'PENDING',
      recommendation:
        'Saved locally. Waiting for connection.',
      estimatedWaitTime:
        'Unknown',
    };

  }


  const response =
    await triageApi(dto);


  await removeRecord(dto.id);


  return response;

};