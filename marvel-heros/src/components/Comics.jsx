import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Marvel.module.css'; 

export default function Comics() {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchComics() {
    const PUBLIC_KEY = '4ab805c65c4402360e4572c3a376eb0c';
    const HASH = '314f1d00a835e607982461ad239a7481';
    const URL = `https://gateway.marvel.com/v1/public/comics?ts=1&limit=50&apikey=${PUBLIC_KEY}&hash=${HASH}`; // Fetching comics data

    try {
      const response = await axios.get(URL);
      setComics(response.data.data.results); // Storing comics in state
    } catch (err) {
      console.error("Error fetching comics", err);
      setError(err.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchComics();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to the Comics Page</h1>

      <div>
        {loading && <p className={styles.loading}>Loading comics...</p>}
        {error && <p className={styles.error}>Error: {error}</p>}
        {comics.length > 0 ? (
          <ul className={styles.comicsGrid}>
            {comics.map((comic) => (
              <li key={comic.id} className={styles.comicCard}>
                <img
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={comic.title}
                  className={styles.comicImage}
                />
                <h3 className={styles.comicTitle}>{comic.title}</h3>
                <p className={styles.comicDescription}>
                  {comic.description ? comic.description : 'No description available.'}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p className={styles.noComics}>No comics found.</p>
        )}
      </div>
    </div>
  );
}
