import { act, useContext } from "react";
import TriageContextProvider from "./TriageContext";

import { CreateTriageDto } from '../types';

const dto: CreateTriageDto = {
  id: '1',
  patientName: 'John Doe',
  conditionDescription: 'Chest pain',
  priority: 1,
  status: 'Pending',
  createdAt: new Date().toISOString(),
};



it('updates triageResult after submit', async () => {

    const { result } = renderHook(() => useContext(TriageContext), {
        wrapper: TriageContextProvider,
    });

    await act(async () => {
        await result.current.submitPatient(dto);
    });

    expect(result.current.triageResult).not.toBeNull();
});