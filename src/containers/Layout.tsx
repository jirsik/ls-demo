import NavBar from '../components/NavBar';
import { Container } from '@mui/material';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

type Props = {
  children: JSX.Element;
};

function Layout({ children }: Props): JSX.Element {
  return (
    <>
      <NavBar />

      <Container>
        { children }
      </Container>

      <ToastContainer position="bottom-right" closeOnClick={false} draggable={false} pauseOnFocusLoss={false} />
    </>
  );
}

export default Layout;
