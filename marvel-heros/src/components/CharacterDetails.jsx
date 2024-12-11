import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Marvel.module.css';

export default function CharacterDetails() {
  const { id } = useParams(); // Get character ID from URL
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentSelections, setRecentSelections] = useState([]); // Track last 3 selected characters

  // Fetch character details when component loads
  useEffect(() => {
    const PUBLIC_KEY = '4ab805c65c4402360e4572c3a376eb0c';
    const HASH = '314f1d00a835e607982461ad239a7481';
    const URL = `https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`;

    async function fetchCharacterDetails() {
      try {
        const response = await axios.get(URL);
        const characterData = response.data.data.results[0];
        setCharacter(characterData);
        updateRecentSelections(characterData); // Update recent selections
      } catch (err) {
        console.error('Error fetching character details:', err);
        setError('Failed to load character details.');
      } finally {
        setLoading(false);
      }
    }

    fetchCharacterDetails();
  }, [id]);

  // Update the recent selections list in localStorage
  function updateRecentSelections(characterData) {
    if (!characterData) return;

    const storedSelections = JSON.parse(localStorage.getItem('recentSelections')) || [];
    const updatedSelections = [characterData, ...storedSelections.filter(item => item.id !== characterData.id)].slice(0, 3);

    localStorage.setItem('recentSelections', JSON.stringify(updatedSelections));
    setRecentSelections(updatedSelections);
  }

  // Load recent selections from localStorage when the component mounts
  useEffect(() => {
    const storedSelections = JSON.parse(localStorage.getItem('recentSelections')) || [];
    setRecentSelections(storedSelections);
  }, []);

  if (loading) {
    return <p className={styles.loading}>Loading character details...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.pageHeader}>
        <h1>Character Details Page</h1>
      </header>

      {character && (
        <div>
          <h2 className={styles.title}>{character.name}</h2>
          <img
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
            className={styles.characterImage}
          />
          <p className={styles.description}>
            {character.description || 'No description available.'}
          </p>
          <h3 className={styles.subTitle}>Comics</h3>
          <ul className={styles.comicsList}>
            {character.comics.items.map((comic, index) => (
              <li key={index} className={styles.comicItem}>
                {comic.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recent Selections Section */}
      <div className={styles.recentSelections}>
        <h3>Recently Viewed Characters</h3>
        {recentSelections.length > 0 ? (
          <ul className={styles.recentList}>
            {recentSelections.map((recent) => (
              <li key={recent.id} className={styles.recentItem}>
                <Link to={`/character-details/${recent.id}`} className={styles.recentLink}>
                  <img
                    src={`${recent.thumbnail.path}.${recent.thumbnail.extension}`}
                    alt={recent.name}
                    className={styles.recentImage}
                  />
                  <p className={styles.recentName}>{recent.name}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.noRecent}>No recent selections.</p>
        )}
      </div>
    </div>
  );
}


