import NetInfo from '@react-native-community/netinfo';
import { submitTriage } from '../../../services/triageService';

import { CreateTriageDto } from '../../../types';

const dto: CreateTriageDto = {
  id: '1',
  patientName: 'John Doe',
  conditionDescription: 'Chest pain',
  priority: 1,
  status: 'Pending',
  createdAt: new Date().toISOString(),
};


it('calls API when online', async () => {

  (NetInfo.fetch as jest.Mock).mockResolvedValue({
    isConnected: true,
  });

  const result = await submitTriage(dto);

  expect(result.riskLevel).toBe('CRITICAL');
});