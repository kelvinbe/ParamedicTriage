import { triageApi } from '../API/triageApi';

describe('triageApi', () => {
  it('returns CRITICAL for priority 1', async () => {
    const result = await triageApi({
      id: '1',
      patientName: 'John',
      conditionDescription: 'Chest pain',
      priority: 1,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    });

    expect(result).toEqual({
      riskLevel: 'CRITICAL',
      recommendation: 'Immediate doctor attention required',
      estimatedWaitTime: 'Immediate',
    });
  });

  it('returns HIGH for priority 2', async () => {
    const result = await triageApi({
      id: '2',
      patientName: 'John',
      conditionDescription: 'Broken arm',
      priority: 2,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    });

    expect(result.riskLevel).toBe('HIGH');
  });

  it('returns LOW for priority 5', async () => {
    const result = await triageApi({
      id: '3',
      patientName: 'John',
      conditionDescription: 'Headache',
      priority: 5,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    });

    expect(result.riskLevel).toBe('LOW');
  });
});