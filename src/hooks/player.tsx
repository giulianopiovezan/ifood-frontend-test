import React, { createContext, useCallback, useState, useContext } from 'react';

import Player from 'components/Player';

interface PlayerData {
  trackName: string;
  album: {
    name: string;
    image: string;
  };
  artists: {
    name: string;
  }[];
  trackSource: string;
}

interface PlayerContextData {
  play: (track: PlayerData) => void;
  close: () => void;
}

const PlayerContext = createContext<PlayerContextData>({} as PlayerContextData);

export const PlayerProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<PlayerData>({} as PlayerData);
  const [open, setOpen] = useState(false);

  const play = useCallback((track: PlayerData) => {
    setData(track);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <PlayerContext.Provider value={{ play, close }}>
      {children}
      {open && data.trackSource && <Player value={data} onClose={close} />}
    </PlayerContext.Provider>
  );
};

export function usePlayer(): PlayerContextData {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error('usePlayer must be used within PlayerProvider');
  }

  return context;
}
