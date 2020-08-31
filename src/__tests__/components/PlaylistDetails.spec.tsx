/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import axios from 'axios';
import { render, fireEvent, waitFor } from '@testing-library/react';

import AxiosMock from 'axios-mock-adapter';

import PlaylistDetails from 'components/PlaylistDetails';
import api from 'services/api';
import { transformToMinutesAndSeconds } from 'utils';

const mockShow = jest.fn();

jest.mock('hooks/toast', () => {
  return {
    useToast: () => ({
      show: mockShow,
    }),
  };
});

const playlistMock = {
  id: 'fakeId',
  description: 'Fake Description',
  external_urls: {
    spotify: 'https://fake-uri.com',
  },
  name: 'Fake Name',
  images: [
    {
      url: 'https://fake-url.com',
    },
  ],
};

const tracksMock = {
  items: [
    {
      track: {
        id: 'fakeId',
        name: 'fake track',
        track_number: 1,
        album: {
          name: 'fake album',
          images: [
            {
              width: 64,
              url: 'https://fake-image.com',
            },
          ],
          artists: [
            {
              name: 'fake artist',
            },
          ],
        },
        duration_ms: 350000,
      },
    },
  ],
};

const apiMock = new AxiosMock(api);

describe('Playlist Details Component', () => {
  beforeAll(() => {
    axios.interceptors.request.use = jest.fn();
  });

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Should be able to show details about playlist', async () => {
    const { container, getByTestId } = render(
      <PlaylistDetails playlist={playlistMock} />,
    );

    expect(container.querySelector('h1')).toHaveTextContent('Fake Name');
    expect(getByTestId('playlist-description')).toHaveTextContent(
      'Fake Description',
    );
    expect(container.querySelector('.spotify')?.getAttribute('href')).toBe(
      'https://fake-uri.com',
    );
  });

  it('Should be able to show playlist tracks', async () => {
    apiMock.onGet('playlists/fakeId/tracks').reply(200, tracksMock);

    const { getByText } = render(<PlaylistDetails playlist={playlistMock} />);

    const showTracksEl = getByText('Ver músicas');

    fireEvent.click(showTracksEl.parentElement!);

    await waitFor(
      () => {
        const miliToMinAndSec = transformToMinutesAndSeconds(350000);
        expect(getByText('Ouça as prévias da playlist:')).toBeInTheDocument();
        expect(getByText('fake track')).toBeInTheDocument();
        expect(getByText('fake album')).toBeInTheDocument();
        expect(getByText('fake artist')).toBeInTheDocument();
        expect(getByText(miliToMinAndSec)).toBeInTheDocument();

        expect(showTracksEl).toHaveTextContent('Ocultar músicas');
      },
      {
        timeout: 1000,
      },
    );

    // HIDE TRACKS AND EXPECT THE TEXT CHANGES AGAIN
    fireEvent.click(showTracksEl.parentElement!);

    await waitFor(() => {
      expect(showTracksEl).toHaveTextContent('Ver músicas');
    });
  });

  it('Should be able to show toast error', async () => {
    apiMock.onGet('playlists/fakeId/tracks').reply(500, {});

    const { getByText } = render(<PlaylistDetails playlist={playlistMock} />);

    const showTracksEl = getByText('Ver músicas');

    fireEvent.click(showTracksEl.parentElement!);

    await waitFor(
      () => {
        expect(mockShow).toHaveBeenCalled();
      },
      {
        timeout: 1000,
      },
    );
  });
});
