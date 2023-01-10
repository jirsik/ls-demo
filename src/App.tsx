import { StrictMode } from 'react';
import Layout from './containers/Layout/Layout';
import SearchPage from './pages/SearchPage/SearchPage';

function App(): JSX.Element {
  return (
    <StrictMode>
      <Layout>
        <SearchPage />
      </Layout>
    </StrictMode>
  );
}

export default App;
