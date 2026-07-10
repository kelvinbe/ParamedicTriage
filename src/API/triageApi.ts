import { CreateTriageDto } from '../types';


export const triageApi = async (
    dto: CreateTriageDto,
) => {


    return new Promise((resolve) => {


         setTimeout(() => {
      if (dto.priority === 1) {
        resolve({
          riskLevel: 'CRITICAL',
          recommendation: 'Immediate doctor attention required',
          estimatedWaitTime: 'Immediate',
        });
        return;
      }

      if (dto.priority === 2) {
        resolve({
          riskLevel: 'HIGH',
          recommendation: 'Doctor assessment required',
          estimatedWaitTime: '15 minutes',
        });
        return;
      }

      resolve({
        riskLevel: 'LOW',
        recommendation: 'Patient can be monitored',
        estimatedWaitTime: '30 minutes',
      });
    }, 1500);


    });


};