import styles from './Highlight.module.css';
import { useHighlightSweep } from './useHighlightSweep';

/**
 * Inline yellow-highlighter treatment for a phrase within running body
 * copy — same `.mark` styling as HighlightQuote, just without the
 * wrapping <p> so it can sit inside an existing paragraph.
 *
 * The yellow sweeps in left-to-right the first time the phrase scrolls
 * into view; the text itself never moves.
 */
export function Highlight({ children }) {
  const [ref, sweep] = useHighlightSweep();
  return (
    <mark ref={ref} className={styles.mark} data-sweep={sweep}>
      {children}
    </mark>
  );
}

/** Yellow-highlighter text block, used for pull quotes. */
export function HighlightQuote({ children }) {
  const [ref, sweep] = useHighlightSweep();
  return (
    <p className={styles.quote}>
      <mark ref={ref} className={styles.mark} data-sweep={sweep}>
        {children}
      </mark>
    </p>
  );
}

/**
 * Bold blue link CTA. Renders a plain, visually-identical placeholder
 * when `href` is falsy so the real URL can be dropped in later with zero
 * markup changes.
 */
export function HighlightCTA({ href, children }) {
  if (!href) {
    return (
      <span className={styles.ctaPlaceholder} aria-disabled="true">
        {children}
      </span>
    );
  }
  return (
    <a className={styles.cta} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
