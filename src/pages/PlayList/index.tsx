import React, { useEffect, useState, useCallback, useMemo } from 'react';

import axios from 'axios';

import LinearProgress from '@material-ui/core/LinearProgress';
import TablePagination from '@material-ui/core/TablePagination';

import api from 'services/api';

import PlaylistDetails from 'components/PlaylistDetails';
import PlaylistFilter from 'components/PlaylistFilter';

import { Container } from './styles';

import { FilterResponse, Params, PlayListResponse } from './types';

const PlayList: React.FC = () => {
  const [playlistData, setPlaylistData] = useState<PlayListResponse>(
    {} as PlayListResponse,
  );
  const [filterData, setFilterData] = useState<FilterResponse>(
    {} as FilterResponse,
  );
  const [filters, setFilters] = useState<Params>({} as Params);
  const [playlistFilter, setPlaylistFilter] = useState('');
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const playlistFiltered = useMemo(
    () =>
      playlistData.playlists &&
      playlistData.playlists.items.filter(item =>
        !playlistFilter
          ? true
          : item.name
              .toLocaleLowerCase()
              .includes(playlistFilter.toLocaleLowerCase()),
      ),
    [playlistData.playlists, playlistFilter],
  );

  const rowsPerPageOptions = useMemo(() => {
    if (!filterData.filters) {
      return [];
    }

    const findLimitFilter = filterData.filters.find(
      filter => filter.validation && filter.validation.min,
    );

    if (!findLimitFilter?.validation) {
      return [];
    }

    const { min, max } = findLimitFilter.validation;

    return Array.from({ length: max - min + 1 }, (_, k) => k + min);
  }, [filterData.filters]);

  const loadPlaylist = useCallback(async () => {
    const response = await api.get('browse/featured-playlists', {
      params: {
        ...filters,
        limit,
        offset: page * limit,
      },
    });

    setPlaylistData(response.data);
  }, [page, limit, filters]);

  useEffect(() => {
    axios
      .get('http://www.mocky.io/v2/5a25fade2e0000213aa90776')
      .then(res => setFilterData(res.data));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      loadPlaylist();
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, [loadPlaylist]);

  useEffect(() => {
    loadPlaylist();
  }, [loadPlaylist]);

  const handleLocalSearch = useCallback((value: string) => {
    setPlaylistFilter(value);
  }, []);

  const handleSearch = useCallback((params: Params) => {
    setFilters(params);
  }, []);

  if (!playlistData.playlists || !filterData.filters) {
    return <LinearProgress style={{ marginTop: 5 }} color="primary" />;
  }

  return (
    <>
      <PlaylistFilter
        onLocalSearch={handleLocalSearch}
        onSearch={handleSearch}
        filters={filterData.filters}
      />
      <Container>
        {playlistFiltered.map(playlist => (
          <PlaylistDetails key={playlist.id} playlist={playlist} />
        ))}

        <TablePagination
          component="div"
          labelRowsPerPage="Itens por página"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} de ${count !== -1 ? count : `mais que ${to}`}`
          }
          count={playlistData.playlists.total}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={rowsPerPageOptions}
          onChangePage={(_, number) => setPage(number)}
          onChangeRowsPerPage={({ target }) => setLimit(Number(target.value))}
        />
      </Container>
    </>
  );
};

export default PlayList;
