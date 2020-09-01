import React from 'react';
import { render } from '@testing-library/react';

import Player from 'components/Player';

const playerMock = {
  trackName: 'fake track',
  album: {
    name: 'fake album',
    image: 'fake img',
  },
  artists: [
    {
      name: 'fake artist',
    },
  ],
  trackSource: 'fake track source',
};

describe('Player Component', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.load = () => {};
    window.HTMLMediaElement.prototype.play = () => {};
    window.HTMLMediaElement.prototype.pause = () => {};
  });

  it('Should be able to show music player', async () => {
    const { getByText } = render(
      <Player value={playerMock} onClose={() => {}} />,
    );

    expect(getByText('fake track')).toBeInTheDocument();
    expect(getByText('fake album')).toBeInTheDocument();
    expect(getByText('fake artist')).toBeInTheDocument();
  });
});
