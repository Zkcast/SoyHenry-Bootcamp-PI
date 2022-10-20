import { render, cleanup } from '@testing-library/react'
import Home from '../components/Home/Home.jsx'

describe('the component should render', () => {
    beforeEach(cleanup)
    it('renders with basic props', () => {
      render(<Home />)
    })
  })


  test('renders the landing page', () => {
    render(<Home />);
    expect(screen.getByRole("inputSelector")).toHaveTextContent(/Population/);
    // expect(screen.getByRole("combobox")).toHaveDisplayValue("Select a breed");
    // expect(screen.getByRole("button", { name: "Search" })).toBeDisabled();
    // expect(screen.getByRole("img")).toBeInTheDocument();
  });