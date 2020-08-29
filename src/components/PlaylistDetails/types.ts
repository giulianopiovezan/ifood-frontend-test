export interface PlayListDetailsProps {
  playlist: {
    id: string;
    description: string;
    external_urls: {
      spotify: string;
    };
    name: string;
    images: {
      url: string;
    }[];
  };
}

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
