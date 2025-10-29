import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import CreatePortfolioPage from './pages/CreatePortfolioPage';
import EditPortfolioPage from './pages/EditPortfolioPage';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePortfolioPage />} />
          <Route path="/edit/:id" element={<EditPortfolioPage />} />
          <Route path="/portfolio/:id" element={<PortfolioPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
