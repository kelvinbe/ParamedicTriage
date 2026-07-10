import NetInfo from '@react-native-community/netinfo';
import { submitTriage } from '../triageService';


jest.mock('@react-native-community/netinfo');

describe('submitTriage', () => {

  const dto = {
    id: '1',
    patientName: 'John',
    conditionDescription: 'Test',
    priority: 1,
    status: 'Pending',
    createdAt: 'today',
  };

  it('returns pending when offline', async () => {

    (NetInfo.fetch as jest.Mock).mockResolvedValue({
      isConnected: false,
    });

    const result = await submitTriage(dto);

    expect(result.riskLevel).toBe('PENDING');
  });

  it('calls API when online', async () => {

  (NetInfo.fetch as jest.Mock).mockResolvedValue({
    isConnected: true,
  });

  const result = await submitTriage(dto);

  expect(result.riskLevel).toBe('CRITICAL');
});

});