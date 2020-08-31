import React from 'react';
import { render } from '@testing-library/react';

import PlaylistFilter from 'components/PlaylistFilter';

const filtersMock = [
  {
    id: 'fakeId',
    name: 'fake Name',
    values: [
      {
        value: 'fakeValue',
        name: 'fakeName',
      },
    ],
  },
  {
    id: 'locale',
    name: 'Locale',
    values: [
      {
        value: 'pt_BR',
        name: 'pt_BR',
      },
      {
        value: 'en_US',
        name: 'en_US',
      },
    ],
  },
];

describe('PlaylistFilter Component', () => {
  it('Should be able to show filters', async () => {
    const { getByTestId } = render(
      <PlaylistFilter
        filters={filtersMock}
        onLocalSearch={() => {}}
        onSearch={() => {}}
      />,
    );

    expect(getByTestId('fakeId')).toBeInTheDocument();

    // BECAUSE I AM TRANSFORMING LOCALE INTO LANGUAGE
    expect(getByTestId('locale')).toBeInTheDocument();
  });
});
