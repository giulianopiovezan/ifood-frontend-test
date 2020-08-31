import { renderHook, act } from '@testing-library/react-hooks';

import { usePlayer, PlayerProvider } from 'hooks/player';

describe('Player hook', () => {
  it('Should be able to play music', () => {
    const { result } = renderHook(() => usePlayer(), {
      wrapper: PlayerProvider,
    });

    act(() => {
      result.current.play({
        trackName: 'fake track',
        album: {
          image: 'fake-image',
          name: 'fake album',
        },
        artists: [
          {
            name: 'fake artist',
          },
        ],
        trackSource: 'fake track source',
      });
    });

    expect(result.current.currentTrack.trackName).toBe('fake track');
    expect(result.current.currentTrack.trackSource).toBe('fake track source');
    expect(result.current.currentTrack.artists).toHaveLength(1);
  });

  it('Should be able to close player', () => {
    const { result } = renderHook(() => usePlayer(), {
      wrapper: PlayerProvider,
    });

    expect(result.current.isPlayerOpen).toBe(false);

    act(() => {
      result.current.play({
        trackName: 'fake track',
        album: {
          image: 'fake-image',
          name: 'fake album',
        },
        artists: [
          {
            name: 'fake artist',
          },
        ],
        trackSource: 'fake track source',
      });
    });

    expect(result.current.isPlayerOpen).toBe(true);

    act(() => {
      result.current.close();
    });

    expect(result.current.isPlayerOpen).toBe(false);
  });
});
