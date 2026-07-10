import NetInfo from '@react-native-community/netinfo';

import { triageApi } from '../API/triageApi';

import {
  saveRecord,
  removeRecord,
  getPendingRecords,
} from './triageStorage';

import { CreateTriageDto } from '../types';

export const submitTriage = async (
  dto: CreateTriageDto,
) => {

  await saveRecord(dto);

  console.log(getPendingRecords());

  const network = await NetInfo.fetch();

  if (!network.isConnected) {

    return {
      offline: true,
      response: {
        riskLevel: 'PENDING',
        recommendation:
          'Please Waiting for connection...',
        estimatedWaitTime: 'Unknown',
      },
    };

  }

  const response = await triageApi(dto);

  removeRecord(dto.id);

  return {
    offline: false,
    response,
  };

};