import { useReducer, useRef } from 'react';
import { toast } from 'react-toastify';
import { Box, Button, TextField } from '@mui/material';

import searchReducer, { searchLoadingDoneAC, searchLoadingStartedAC } from './searchReducer';
import { SearchTypeEnum } from '../../enums/SearchTypeEnum';

const prepareSearchUrl = (types: SearchTypeEnum[]): string =>
  `https://s.livesport.services/api/v2/search?type-ids=${types.join(',')}&project-type-id=1&project-id=602&lang-id=1&q=dj&sport-ids=1,2,3,4,5,6,7,8,9`;

function SearchPage(): JSX.Element {
  const searchInput = useRef<HTMLInputElement>(null);
  const [{ loading, data }, dispatch] = useReducer(
    searchReducer,
    { loading: false, data: [] },
  );

  const doSearch = async(): Promise<void> => {
    if (searchInput.current === null || searchInput.current.value.length < 2) {
      toast.error('Search string must be at least 2 characters.');

      return;
    }

    let data;

    try {
      dispatch(searchLoadingStartedAC());
      const response = await fetch(prepareSearchUrl([SearchTypeEnum.SPORT]));

      if (!response.ok) {
        throw new Error('Request failed.');
      }

      data = await response.json();
    } catch (err) {
      data = [];
      toast.error('Loading failed.');
    } finally {
      dispatch(searchLoadingDoneAC(data));
    }
  };

  return (
    <>
      <Box sx={{ margin: 5 }}>
        <TextField
          label="Search"
          id="outlined-size-normal"
          size="small"
          inputRef={searchInput}
        />

        <Button variant="contained" size="medium" onClick={doSearch}>Search</Button>
      </Box>

      <Box>
        {loading ? 'Loading...' : JSON.stringify(data)}
      </Box>
    </>
  );
}

export default SearchPage;
