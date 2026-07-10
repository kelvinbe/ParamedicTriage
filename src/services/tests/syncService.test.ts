import { syncPendingRecords } from '../syncService';
import * as storage from '../triageStorage';
import * as api from '../../API/triageApi';

describe('syncPendingRecords', () => {

  it('uploads all pending records', async () => {

    jest.spyOn(storage, 'getPendingRecords').mockReturnValue([
      {
        id: '1',
        patientName: 'John',
        conditionDescription: 'Test',
        priority: 1,
        status: 'Pending',
        createdAt: 'today',
      },
    ]);

    jest.spyOn(api, 'triageApi').mockResolvedValue({
      riskLevel: 'CRITICAL',
      recommendation: '',
      estimatedWaitTime: '',
    });

    const removeSpy = jest.spyOn(storage, 'removeRecord');

    await syncPendingRecords();

    expect(removeSpy).toHaveBeenCalledWith('1');
  });

});