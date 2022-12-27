import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main layout', () => {
  render(<App />);
  const headElement = screen.getByText('Livesport demo');
  const searchInputElement = screen.getByRole('textbox');

  expect(headElement).toBeInTheDocument();
  expect(searchInputElement).toBeInTheDocument();
});
