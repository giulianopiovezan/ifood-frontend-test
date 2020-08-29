import React, { useState, useCallback } from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Select from 'components/UI/Select';

import { Container } from './styles';

import { FilterResponse, Params, ParamsType } from './types';

interface PlaylistFilterProps {
  onSearch: (params: Params) => void;
  onLocalSearch: (value: string) => void;
  filters: FilterResponse[];
}

const PlaylistFilter: React.FC<PlaylistFilterProps> = ({
  onSearch,
  onLocalSearch,
  filters,
}) => {
  const [filterSelected, setFilterSelected] = useState({} as Params);

  const handleFilterChange = useCallback((name: string, value: ParamsType) => {
    if (value !== '') {
      setFilterSelected(prev => ({ ...prev, [name]: value }));
    }
  }, []);

  return (
    <Container id="playlistFilter">
      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
          <h2>
            <strong>Encontre as </strong> melhores playlists.
          </h2>
        </Grid>
        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            {filters.map(
              filter =>
                filter?.values && (
                  <Grid key={filter.id} item xs={12} md={6}>
                    <Select
                      key={filter.id}
                      label={filter.name}
                      options={filter.values}
                      onChange={({ target }) =>
                        handleFilterChange(filter.id, target.value as string)
                      }
                    />
                  </Grid>
                ),
            )}
            <Grid item xs={12}>
              <TextField
                label="Playlist"
                fullWidth
                variant="outlined"
                onChange={({ target }) => onLocalSearch(target.value as string)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                className="btn-search"
                color="primary"
                variant="contained"
                fullWidth
                onClick={() => onSearch(filterSelected)}
              >
                PESQUISAR
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PlaylistFilter;
