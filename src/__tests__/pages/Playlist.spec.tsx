/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import axios from 'axios';
import {
  render,
  waitFor,
  waitForElementToBeRemoved,
  fireEvent,
} from '@testing-library/react';

import AxiosMock from 'axios-mock-adapter';

import PlayList from 'pages/PlayList';
import api from 'services/api';

const mockShow = jest.fn();

jest.mock('hooks/toast', () => {
  return {
    useToast: () => ({
      show: mockShow,
    }),
  };
});

const playListsMock = {
  playlists: {
    total: 1,
    items: [
      {
        id: 'fakeId',
        description: 'fake description',
        external_urls: {
          spotify: 'https://spotify-fake.com',
        },
        name: 'fake name',
        images: [
          {
            url: 'https://fake-image.com',
          },
        ],
      },
      {
        id: 'fakeId2',
        description: 'fake description 2',
        external_urls: {
          spotify: 'https://spotify-fake2.com',
        },
        name: 'fake name 2',
        images: [
          {
            url: 'https://fake-image2.com',
          },
        ],
      },
    ],
  },
};

const playListsMock2 = {
  playlists: {
    total: 1,
    items: [
      {
        id: 'fakeId',
        description: 'fake description 3',
        external_urls: {
          spotify: 'https://spotify-fake.com',
        },
        name: 'fake name 3',
        images: [
          {
            url: 'https://fake-image.com',
          },
        ],
      },
    ],
  },
};

const apiMock = new AxiosMock(api);

describe('Playlist Page', () => {
  beforeAll(() => {
    axios.interceptors.request.use = jest.fn();
  });

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Should be able to show playlists', async () => {
    apiMock.onGet('browse/featured-playlists').reply(200, playListsMock);

    const { getByText, getByRole } = render(<PlayList />);

    await waitForElementToBeRemoved(() => getByRole('progressbar'), {
      timeout: 1000,
    });

    expect(getByText('fake description')).toBeInTheDocument();
    expect(getByText('fake name')).toBeInTheDocument();
  });

  it('Should be able to filter playlists by name', async () => {
    apiMock.onGet('browse/featured-playlists').reply(200, playListsMock);

    const { getByText, getByRole, getByTestId, queryByText } = render(
      <PlayList />,
    );

    await waitForElementToBeRemoved(() => getByRole('progressbar'), {
      timeout: 1000,
    });

    const inputPlaylistNameEl = getByTestId('playlist-name-filter');

    fireEvent.change(inputPlaylistNameEl, { target: { value: 'fake name 2' } });

    await waitFor(() => {
      expect(getByText('fake name 2')).toBeInTheDocument();
      expect(queryByText('fake name')).not.toBeInTheDocument();
    });
  });

  it('Should be able to refresh list every 30 seconds', async () => {
    jest.useFakeTimers();
    apiMock.onGet('browse/featured-playlists').reply(200, playListsMock);

    const { getByText, getByRole } = render(<PlayList />);

    await waitForElementToBeRemoved(() => getByRole('progressbar'), {
      timeout: 1000,
    });

    expect(getByText('fake name')).toBeInTheDocument();

    apiMock.onGet('browse/featured-playlists').reply(200, playListsMock2);

    jest.advanceTimersByTime(30000);

    await waitFor(() => {
      expect(getByText('fake name 3')).toBeInTheDocument();
    });
  });

  it('Should be throw error when fetch playlist', async () => {
    apiMock.onGet('browse/featured-playlists').reply(500, {});

    render(<PlayList />);

    await waitFor(
      () => {
        expect(mockShow).toHaveBeenCalledWith({
          severity: 'error',
          description: 'Ocorreu um erro ao carregar as Playlists :(',
        });
      },
      {
        timeout: 1000,
      },
    );
  });

  it('Should be throw error when fetch filters', async () => {
    const axiosMock = new AxiosMock(axios);
    axiosMock
      .onGet('http://www.mocky.io/v2/5a25fade2e0000213aa90776')
      .reply(500, {});

    render(<PlayList />);

    await waitFor(
      () => {
        expect(mockShow).toHaveBeenCalledWith({
          severity: 'error',
          description: 'Ocorreu um erro ao carregar os filtros :(',
        });
      },
      {
        timeout: 1000,
      },
    );
  });
});
