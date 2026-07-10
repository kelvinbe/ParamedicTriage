import { IPatient } from '../types';


export const triageApi = async (
    patient: IPatient,
) => {


    return new Promise((resolve) => {


        setTimeout(() => {


            let response = {

                riskLevel: 'LOW',

                recommendation:
                    'Patient can be monitored',

                estimatedWaitTime:
                    '30 minutes'

            };



            if (patient.priority === 1) {

                response = {

                    riskLevel: 'CRITICAL',

                    recommendation:
                        'Immediate doctor attention required',

                    estimatedWaitTime:
                        'Immediate'

                };

            }



            if (patient.priority === 2) {

                response = {

                    riskLevel: 'HIGH',

                    recommendation:
                        'Doctor assessment required',

                    estimatedWaitTime:
                        '15 minutes'

                };

            }



            resolve(response);


        }, 1500);


    });


};