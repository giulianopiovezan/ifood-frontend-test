/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useCallback } from 'react';

import { FaSpotify, FaLink } from 'react-icons/fa';

import api from 'services/api';

import Track from 'components/Track';
import { useToast } from 'hooks/toast';
import { Container, Details, Tracks } from './styles';

import { PlayListDetailsProps, TrackResponse } from './types';

const PlaylistDetails: React.FC<PlayListDetailsProps> = ({ playlist }) => {
  const [trackData, setTrackData] = useState<TrackResponse>(
    {} as TrackResponse,
  );
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  const { show } = useToast();

  const loadTracks = useCallback(
    async (playlistId: string) => {
      if (!expanded) {
        try {
          setLoading(true);
          const response = await api.get(`playlists/${playlistId}/tracks`);
          setTrackData(response.data);
          setExpanded(true);
        } catch {
          show({
            severity: 'error',
            description: 'Ocorreu um erro ao carregar as músicas :(',
          });
        } finally {
          setLoading(false);
        }

        return;
      }

      setExpanded(!expanded);
    },
    [show, expanded],
  );

  if (!playlist) {
    return <p>Loading...</p>;
  }

  return (
    <Container key={playlist.id}>
      <Details>
        <img alt={playlist.name} src={playlist.images[0].url} />
        <div className="description">
          <strong>Playlist</strong>
          <h1>{playlist.name}</h1>
          <span>{playlist.description}</span>
          <div className="actions">
            <a
              href=""
              className={loading ? 'ifood-disabled' : 'ifood'}
              onClick={e => {
                e.preventDefault();
                loadTracks(playlist.id);
              }}
            >
              <FaLink size={24} />
              <span>
                {loading
                  ? 'Aguarde...'
                  : expanded
                  ? 'Ocultar músicas'
                  : 'Ver músicas'}
              </span>
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
        </div>
      </Details>
      {trackData.items?.length && expanded && (
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
