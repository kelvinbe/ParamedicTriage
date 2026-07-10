import NetInfo from '@react-native-community/netinfo';
import {syncPendingRecords} from './syncService';


export const startNetworkListener = () => {

  return NetInfo.addEventListener(
    state => {

      if(state.isConnected){

        syncPendingRecords();

      }

    }
  );

};