import { AppBar, Box, Toolbar, Typography } from '@mui/material';

function NavBar(): JSX.Element {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Livesport demo
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
