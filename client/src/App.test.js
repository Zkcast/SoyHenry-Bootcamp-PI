import { render, screen } from '@testing-library/react';
import App from './App';
import Home from './components/Home/Home'


test('renders learn react link', () => {
  render(<Home />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
