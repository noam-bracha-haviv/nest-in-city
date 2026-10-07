import { useEffect, useState } from 'react';
import { LINKS } from '../../data/links';
import styles from './TopBar.module.css';

export default function TopBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <header className={styles.bar}>
      <div className={styles.row}>
        <button
          type="button"
          className={styles.back}
          onClick={() => window.location.assign('https://noam-bracha-haviv.github.io/new-portfolio/')}
        >
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M10 19l-7-7 7-7M3 12h18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Back</span>
        </button>
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
        <a
          className={styles.tag}
          href={LINKS.websiteConcept}
          target="_blank"
          rel="noopener noreferrer"
        >
          Digital website
        </a>
      </div>
    </header>
  );
}
