import { render, screen } from '@testing-library/react';
import App from './App';
import Navigation from './components/navigation/Navigation';
import { MemoryRouter } from 'react-router-dom';


jest.mock('./components/navigation/Navigation');


describe('Main page test', () => {
  it('should render the navigation once page loaded', () => {
    render(<App />);
    expect(Navigation).toHaveBeenCalled();
  });

  it('should load the collections page as default router', () => {
    render(<App />);
    expect(screen.getByText('My Collection')).toBeInTheDocument();
  });
});