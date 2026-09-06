import { useEffect, useRef, useState } from 'react';
import styles from './LaptopPreview.module.css';

/**
 * The live site is a 1440px desktop design (below 1024px it switches to its
 * own mobile layout). The iframe is therefore always laid out at 1440x900
 * and scaled down to whatever width the laptop screen happens to be, so the
 * preview shows the real desktop design instead of the site's mobile view.
 */
const CANVAS_WIDTH = 1440;
const CANVAS_HEIGHT = 900; // 16:10, matching the screen's aspect-ratio

/**
 * A MacBook mockup with the live website running inside the screen.
 *
 * Scrolling over the screen scrolls the embedded site, not the laptop —
 * the laptop is ordinary page content and never moves. Clicks inside the
 * screen belong to the embedded document, so the aluminium base doubles as
 * the "open for real" affordance without stealing any interaction from the
 * preview itself.
 */
export default function LaptopPreview({ src, title, openLabel }) {
  const screenRef = useRef(null);
  const [scale, setScale] = useState(null);

  useEffect(() => {
    const el = screenRef.current;
    if (!el) return;

    const measure = () => {
      const width = el.clientWidth;
      if (width) setScale(width / CANVAS_WIDTH);
    };
    measure();

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <figure className={styles.figure}>
      <div className={styles.laptop}>
        <div className={styles.lid}>
          <span className={styles.camera} aria-hidden="true" />
          <div className={styles.screen} ref={screenRef}>
            {scale !== null && (
              <iframe
                className={styles.site}
                src={src}
                title={title}
                loading="lazy"
                style={{
                  width: `${CANVAS_WIDTH}px`,
                  height: `${CANVAS_HEIGHT}px`,
                  transform: `scale(${scale})`,
                }}
              />
            )}
          </div>
        </div>
        <a
          className={styles.base}
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          title={openLabel}
        >
          <span className={styles.notch} aria-hidden="true" />
          <span className={styles.srOnly}>{openLabel}</span>
        </a>
      </div>
      <figcaption className={styles.caption}>
        <a
          className={styles.captionLink}
          href={src}
          target="_blank"
          rel="noopener noreferrer"
        >
          {openLabel} &#8599;
        </a>
      </figcaption>
    </figure>
  );
}
