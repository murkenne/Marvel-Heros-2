import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'; 
import styles from './Marvel.module.css';

export default function BrowseCharacters() {
  const [heroes, setHeroes] = useState([]);
  const [filteredHeroes, setFilteredHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(''); // Search input state

  // Shuffle function
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  async function fetchAllHeroes() {
    const PUBLIC_KEY = '4ab805c65c4402360e4572c3a376eb0c';
    const HASH = '314f1d00a835e607982461ad239a7481';
    const URL = `https://gateway.marvel.com/v1/public/characters?ts=1&limit=50&apikey=${PUBLIC_KEY}&hash=${HASH}`; 

    try {
      const response = await axios.get(URL);
      const shuffledHeroes = shuffle(response.data.data.results); // Shuffle characters
      setHeroes(shuffledHeroes);
      setFilteredHeroes(shuffledHeroes); // Initially show all characters
    } catch (err) {
      console.error("Error retrieving characters", err);
      setError(err.message);
      setHeroes([]);
      setFilteredHeroes([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchAllHeroes();
  }, []);

  useEffect(() => {
    // Filter heroes based on search input
    const filtered = heroes.filter(hero =>
      hero.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredHeroes(filtered);
  }, [search, heroes]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Browse Your Favorite Marvel Hero</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search for a hero..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchBar}
      />

      <div>
        {loading && <p className={styles.loading}>Loading heroes...</p>}
        {error && <p className={styles.error}>Error: {error}</p>}
        {filteredHeroes.length > 0 ? (
          <ul className={styles.heroGrid}>
            {filteredHeroes.map((hero) => (
              <li key={hero.id} className={styles.heroCard}>
                <Link to={`/character-details/${hero.id}`} className={styles.heroLink}>
                  <img
                    src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
                    alt={hero.name}
                    className={styles.heroImage}
                  />
                  <h3 className={styles.heroName}>{hero.name}</h3>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p className={styles.noHeroes}>No heroes found.</p>
        )}
      </div>
    </div>
  );
}
