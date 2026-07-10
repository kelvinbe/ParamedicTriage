import {
  saveRecord,
  getPendingRecords,
  removeRecord,
} from '../triageStorage';

describe('triageStorage', () => {
  beforeEach(() => {
    removeRecord('1');
  });

  it('saves a record', () => {
    saveRecord({
      id: '1',
      patientName: 'John',
      conditionDescription: 'Test',
      priority: 3,
      status: 'Pending',
      createdAt: 'today',
    });

    const records = getPendingRecords();

    expect(records).toHaveLength(1);
    expect(records[0].id).toBe('1');
  });

  it('removes a record', () => {
    saveRecord({
      id: '1',
      patientName: 'John',
      conditionDescription: 'Test',
      priority: 3,
      status: 'Pending',
      createdAt: 'today',
    });

    removeRecord('1');

    expect(getPendingRecords()).toEqual([]);
  });
});