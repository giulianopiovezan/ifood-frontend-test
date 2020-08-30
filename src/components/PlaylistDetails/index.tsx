/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useCallback } from 'react';

import { FaSpotify, FaLink } from 'react-icons/fa';

import api from 'services/api';

import Track from 'components/Track';
import { Container, Details, Tracks } from './styles';

import { PlayListDetailsProps, TrackResponse } from './types';

const PlaylistDetails: React.FC<PlayListDetailsProps> = ({ playlist }) => {
  const [trackData, setTrackData] = useState<TrackResponse>(
    {} as TrackResponse,
  );

  const loadTracks = useCallback((playlistId: string) => {
    api
      .get(`playlists/${playlistId}/tracks`)
      .then(res => setTrackData(res.data));
  }, []);

  if (!playlist) {
    return <p>Loading...</p>;
  }

  return (
    <Container key={playlist.id}>
      <Details>
        <img alt={playlist.name} src={playlist.images[0].url} />
        <article>
          <strong>Playlist</strong>
          <h1>{playlist.name}</h1>
          <span>{playlist.description}</span>
          <div className="actions">
            <a
              href=""
              className="ifood"
              onClick={e => {
                e.preventDefault();
                loadTracks(playlist.id);
              }}
            >
              <FaLink size={24} />
              <span>Ver músicas</span>
            </a>
            <a
              className="spotify"
              href={playlist.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaSpotify size={24} />
              <span>Abrir no Spotify</span>
            </a>
          </div>
        </article>
      </Details>
      {trackData.items && (
        <Tracks>
          <h3>Ouça as prévias da playlist:</h3>
          {trackData.items.map(item => (
            <Track key={item.track.id} track={item.track} />
          ))}
        </Tracks>
      )}
    </Container>
  );
};

export default PlaylistDetails;
