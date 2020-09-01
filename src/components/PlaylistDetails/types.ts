export interface TrackResponse {
  items: {
    track: {
      id: string;
      name: string;
      track_number: number;
      album: {
        name: string;
        images: {
          width: number;
          url: string;
        }[];
        artists: {
          name: string;
        }[];
      };
      duration_ms: number;
    };
  }[];
}
