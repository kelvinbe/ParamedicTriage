export interface IPatient {
  name: string;
  condition: string;
  priority: number | null;
  status: string;
}


export interface ITriageResult {
  riskLevel: string;
  recommendation: string;
  estimatedWaitTime: string;
}