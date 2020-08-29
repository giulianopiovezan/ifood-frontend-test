export interface FilterResponse {
  id: string;
  name: string;
  values?: {
    value: string;
    name: string;
  }[];
  validation?: {
    primitiveType: 'INTEGER' | 'STRING';
    min: number;
    max: number;
  };
}

export type ParamsType = string | number | Date | boolean;

export interface Params {
  [key: string]: ParamsType;
}
