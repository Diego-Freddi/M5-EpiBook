import './App.css';
import MyNavbar from './component/navbar.js';
import LatestRelease from './component/LatestRelease';
import Footer from './component/Footer.js';
import BookDetails from './component/BookDetails';
import NotFound from './component/NotFound';
import { useState } from 'react';
import ThemeProvider, { useTheme } from './context/ThemeContext.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function AppContent() {
  const [search, setSearch] = useState('');
  const [selectedGenere, setSelectedGenere] = useState('all');
  const { theme } = useTheme();

  const handleSearchChange = (searchText) => {
    setSearch(searchText);
  };

  const handleGenereChange = (genere) => {
    setSelectedGenere(genere);
  };

  return (
    <div className={`df-app-container ${theme === 'scuro' ? 'df-dark-mode' : ''}`}>
      <MyNavbar
        onSearchChange={handleSearchChange}
        onGenereChange={handleGenereChange}
      />
      <Routes>
        <Route 
          path="/" 
          element={
            <LatestRelease 
              searchQuery={search}
              sceltaGenere={selectedGenere}
            />
          } 
        />
        <Route path="/book/:asin" element={<BookDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
