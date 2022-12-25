import { useRef } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { toast } from 'react-toastify';

function SearchPage(): JSX.Element {
  const searchInput = useRef<HTMLInputElement>(null);

  const doSearch = (): void => {
    if (searchInput.current === null || searchInput.current.value.length < 2) {
      // toast
      toast.error('Search string must be at least 2 characters.');
      return;
    }

    toast.success('OK.');
    // call
  };

  return (
    <Box sx={{ margin: 5 }}>
      <TextField
        label="Search"
        id="outlined-size-normal"
        size="small"
        inputRef={searchInput}
      />
      <Button variant="contained" size="medium" onClick={doSearch}>Search</Button>
    </Box>
  );
}

export default SearchPage;
