import { Avatar, Box, Button, Divider, Modal, Typography } from '@mui/material';
import { SearchDataType } from '../../../pages/SearchPage/searchReducer';

type Props = {
  data: SearchDataType | null;
  prepareAvatarSource: (item: SearchDataType) => string;
  onClose: () => void;
};

const detailModalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '1px solid gray',
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};

function SearchDetailModal({ data, prepareAvatarSource, onClose }: Props): JSX.Element {
  return (
    <Modal
      open={data !== null}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={detailModalStyle}>
        {data !== null && (
          <>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {data.name}
            </Typography>

            <Divider light />

            <Box mt={5} mb={5}>
              <Avatar
                alt={data.name}
                src={prepareAvatarSource(data)}
                sx={{ width: 100, height: 100 }}
                variant="rounded"
              />
            </Box>

            <Typography variant="body1">sport: {data.sport.name}</Typography>
            <Typography variant="body1">type: {data.type.name}</Typography>
            <Typography variant="body1">country: {data.defaultCountry.name}</Typography>
            <Typography variant="body1">gender: {data.gender.name}</Typography>

            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              <Button onClick={onClose}>Close</Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
}

export default SearchDetailModal;
