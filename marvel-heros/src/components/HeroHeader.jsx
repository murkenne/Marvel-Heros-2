import React from "react";
import styles from './Marvel.module.css'; 

const HeroHeader = () => {
  return (
    <header className={styles.heroHeader}>
      <div className={styles.heroContent}>
        <h1>Welcome to the Hero Book Library</h1>
        <p>Your gateway to exploring the world of super heroes and comics.</p>
        <a href="/browse-characters" className={styles.heroButton}>Browse Characters</a>
      </div>
    </header>
  );
};

export default HeroHeader;
