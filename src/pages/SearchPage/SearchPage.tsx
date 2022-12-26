import { ChangeEvent, useReducer, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Box, Button, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';

import searchReducer, { searchLoadingDoneAC, searchLoadingStartedAC } from './searchReducer';
import { SearchTypeEnum } from '../../enums/SearchTypeEnum';

const prepareSearchUrl = (filter: string, query: string): string =>
  `https://s.livesport.services/api/v2/search?type-ids=${filter}&project-type-id=1&project-id=602&lang-id=1&q=${query}&sport-ids=1,2,3,4,5,6,7,8,9`;

function SearchPage(): JSX.Element {
  const searchInput = useRef<HTMLInputElement>(null);
  const [filter, setFilter] = useState<string>([
    SearchTypeEnum.COMPETITION,
    SearchTypeEnum.PLAYER,
    SearchTypeEnum.TEAM,
    SearchTypeEnum.TEAM_MEMBER,
  ].join(','));
  const [{ loading, data }, dispatch] = useReducer(
    searchReducer,
    { loading: false, data: [] },
  );

  const handleFilterRadioGroup = (e: ChangeEvent<HTMLInputElement>): void => {
    setFilter(e.target.value);
  };

  const doSearch = async(): Promise<void> => {
    if (searchInput.current === null || searchInput.current.value.length < 2) {
      toast.error('Search string must be at least 2 characters.');

      return;
    }

    let data;

    try {
      dispatch(searchLoadingStartedAC());
      const response = await fetch(prepareSearchUrl(filter, searchInput.current.value));

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

        <RadioGroup
          row
          value={filter}
          name="filter"
          onChange={handleFilterRadioGroup}
        >
          <FormControlLabel
            value={[
              SearchTypeEnum.COMPETITION,
              SearchTypeEnum.PLAYER,
              SearchTypeEnum.TEAM,
              SearchTypeEnum.TEAM_MEMBER,
            ].join(',')}
            control={<Radio/>}
            label="All"
          />

          <FormControlLabel value={SearchTypeEnum.COMPETITION} control={<Radio />} label="Competitions" />

          <FormControlLabel value={[
            SearchTypeEnum.PLAYER,
            SearchTypeEnum.TEAM,
            SearchTypeEnum.TEAM_MEMBER,
          ].join(',')} control={<Radio />} label="Participants" />
        </RadioGroup>

      </Box>

      <Box>
        {loading ? 'Loading...' : JSON.stringify(data)}
      </Box>
    </>
  );
}

export default SearchPage;
