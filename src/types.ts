export interface IPatient {
  name: string;
  condition: string;
  priority: number | null;
  status: string;
}


export interface TriageResponseDto {
  riskLevel: 'LOW' | 'HIGH' | 'CRITICAL';
  recommendation: string;
  estimatedWaitTime: string;
}


export interface CreateTriageDto {
  id: string;
  patientName: string;
  conditionDescription: string;
  priority: 1 | 2 | 3 | 4 | 5;
  status: 'Pending' | 'In-Transit';
  createdAt: string;
}

export interface QueuedTriageDto {
  id: string;
  patientName: string;
  conditionDescription: string;
  priority: 1 | 2 | 3 | 4 | 5;
  status: 'Pending' | 'In-Transit';
  createdAt: string;

  synced: boolean;
  retryCount: number;
}