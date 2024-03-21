export interface IConverterQuery {
  from: string;
  to: string;
  amount: number;
}
export interface IConverterResponse {
  from: string;
  to: string;
  amount: number;
  result?: string;
}
