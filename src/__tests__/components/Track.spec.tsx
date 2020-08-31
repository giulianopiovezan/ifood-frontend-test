/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import axios from 'axios';
import { render, fireEvent, waitFor } from '@testing-library/react';

import AxiosMock from 'axios-mock-adapter';

import Track from 'components/Track';
import api from 'services/api';

import { transformToMinutesAndSeconds } from 'utils';

const mockShow = jest.fn();
const mockPlay = jest.fn();

jest.mock('hooks/player', () => {
  return {
    usePlayer: () => ({
      play: mockPlay,
    }),
  };
});

jest.mock('hooks/toast', () => {
  return {
    useToast: () => ({
      show: mockShow,
    }),
  };
});

const trackMock = {
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
};

const apiMock = new AxiosMock(api);

describe('Track Component', () => {
  beforeAll(() => {
    axios.interceptors.request.use = jest.fn();
  });

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Should be able to show playlist tracks', async () => {
    const { getByText } = render(<Track track={trackMock} />);

    const miliToMinAndSec = transformToMinutesAndSeconds(350000);
    expect(getByText('fake track')).toBeInTheDocument();
    expect(getByText('fake album')).toBeInTheDocument();
    expect(getByText('fake artist')).toBeInTheDocument();
    expect(getByText(miliToMinAndSec)).toBeInTheDocument();
  });

  it('Should be able to play audio preview', async () => {
    apiMock.onGet('tracks/fakeId').reply(200, { preview_url: 'fakePreview' });
    const { container } = render(<Track track={trackMock} />);

    const playEl = container.querySelector('button')!;

    fireEvent.click(playEl);

    await waitFor(
      () => {
        expect(mockPlay).toHaveBeenCalled();
      },
      {
        timeout: 1000,
      },
    );
  });

  it('Should not be able to play audio because of preview null', async () => {
    apiMock.onGet('tracks/fakeId').reply(200, { preview_url: null });
    const { container } = render(<Track track={trackMock} />);

    const playEl = container.querySelector('button')!;

    fireEvent.click(playEl);

    await waitFor(
      () => {
        expect(mockShow).toHaveBeenCalledWith({
          severity: 'warning',
          description: 'Prévia indisponível',
        });
      },
      {
        timeout: 1000,
      },
    );
  });

  it('Should not be able to play audio because of internal server error', async () => {
    apiMock.onGet('tracks/fakeId').reply(500, {});
    const { container } = render(<Track track={trackMock} />);

    const playEl = container.querySelector('button')!;

    fireEvent.click(playEl);

    await waitFor(
      () => {
        expect(mockShow).toHaveBeenCalledWith({
          severity: 'error',
          description: 'Ocorreu um erro ao executar a prévia :(',
        });
      },
      {
        timeout: 1000,
      },
    );
  });
});
