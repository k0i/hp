export interface GraphData<T> {
  backgroundColor?: string[];
  labels: string[];
  datasets: T[];
}
export interface DataSet {
  label: string;
  data: number[];
  backgroundColor: string[];
  borderColor?: string[];
  borderWidth?: number;
  hoverOffset: number;
}

export interface ScatterDataSet {
  label: string;
  data: { x: number; y: number }[];
  backgroundColor: string;
}
