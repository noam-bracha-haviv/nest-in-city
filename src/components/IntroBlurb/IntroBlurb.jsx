import { Highlight } from '../Highlight/Highlight';
import styles from './IntroBlurb.module.css';

export default function IntroBlurb() {
  return (
    <div className={styles.wrap}>
      <div className={styles.row}>
        <span className={styles.kicker}>Case study</span>
        <p className={styles.text}>
          Nest in City is my final-year Industrial Design project at Bezalel
          Academy of Arts and Design (2022–2023),{' '}
          <Highlight>developed independently over the course of a year.</Highlight>{' '}
          During the research phase, I drew on the knowledge and expertise of
          wild bee researcher Sharon Assis, and together we conducted part of
          the{' '}
          <Highlight>biological research and field experiments</Highlight>{' '}
          related to the placement of the nesting structures.
        </p>
      </div>
    </div>
  );
}
