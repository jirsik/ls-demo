import { ChangeEvent, useReducer, useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  Avatar,
  Box,
  Button,
  FormControlLabel,
  LinearProgress,
  Link,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import Replay from '@mui/icons-material/Replay';

import searchReducer, { SearchDataType, searchLoadingDoneAC, searchLoadingStartedAC } from './searchReducer';
import { SearchTypeEnum } from '../../enums/SearchTypeEnum';
import SearchDetailModal from '../../components/modals/SearchDetailModal/SearchDetailModal';

const prepareSearchUrl = (filter: string, query: string): string =>
  `https://s.livesport.services/api/v2/search?type-ids=${filter}&project-type-id=1&project-id=602&lang-id=1&q=${query}&sport-ids=1,2,3,4,5,6,7,8,9`;

function SearchPage(): JSX.Element {
  const searchInput = useRef<HTMLInputElement>(null);
  const [detailModalData, setDetailModalData] = useState<SearchDataType | null>(null);
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
      const response = await axios.get(prepareSearchUrl(filter, searchInput.current.value));

      data = response.data;
    } catch (err) {
      data = [];
      toast.error(
        <Box
          display="flex"
          justifyContent="space-between"
        >
          <span>Loading failed.</span>
          <Replay color="warning" onClick={() => {
            toast.dismiss('loadingError');
            void doSearch();
          }} />
        </Box>,
        {
          toastId: 'loadingError',
        },
      );
    } finally {
      dispatch(searchLoadingDoneAC(data));
    }
  };

  const openDetailModal = (data: SearchDataType): void => setDetailModalData(data);

  const closeDetailModal = (): void => setDetailModalData(null);

  return (
    <>
      <Box mt={5} mb={5}>
        <Box
          display="flex"
          justifyContent="space-between"
        >
          <TextField
            label="Search"
            id="outlined-size-normal"
            size="small"
            inputRef={searchInput}
            sx={{ minWidth: 350 }}
          />

          <Button
            variant="contained"
            size="medium"
            onClick={() => {
              void doSearch();
            }}
          >
            Search
          </Button>
        </Box>

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

      <Box mb={5}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="search results">
            <TableHead>
              <TableRow sx={{ '.MuiTableCell-root': { fontWeight: 800 } }}>
                <TableCell />
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Sport</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Avatar
                      alt={item.name}
                      src={`https://www.livesport.cz/res/image/data/${(item.images).find((img) => img.variantTypeId === 15)?.path ?? 'non-existing-image.png'}`}
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.type.name}</TableCell>
                  <TableCell>{item.sport.name}</TableCell>
                  <TableCell><Link href="#" onClick={() => openDetailModal(item)}>show detail</Link></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {loading && <LinearProgress color="primary" />}
      </Box>

      <SearchDetailModal
        data={detailModalData}
        onClose={closeDetailModal}
      />
    </>
  );
}

export default SearchPage;
