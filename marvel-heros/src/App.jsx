import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import NavigationBar from './components/NavigationBar';
import BrowseCharacters from './components/BrowseCharacters';
import CharacterDetails from './components/CharacterDetails';
import Comics from './components/Comics';
import NotFound from './components/NotFound';

export default function App() {
  return (
    <main>
      <div className="app-container">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse-characters" element={<BrowseCharacters />} />
          <Route path="/character-details/:id" element={<CharacterDetails />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </main>
  );
};
