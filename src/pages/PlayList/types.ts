export interface PlayListResponse {
  playlists: {
    total: number;
    items: {
      id: string;
      description: string;
      external_urls: {
        spotify: string;
      };
      name: string;
      images: {
        url: string;
      }[];
    }[];
  };
}

export interface FilterResponse {
  filters: {
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
  }[];
}

export type ParamsType = string | number | Date | boolean;

export interface Params {
  [key: string]: ParamsType;
}
