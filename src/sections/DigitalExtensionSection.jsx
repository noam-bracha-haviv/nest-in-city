import CaseStudySection from '../components/CaseStudySection/CaseStudySection';
import LaptopPreview from '../components/LaptopPreview/LaptopPreview';
import { LINKS } from '../data/links';

export default function DigitalExtensionSection() {
  return (
    <CaseStudySection id="digital-extension" label="Digital Extension">
      <p>
        A digital extension of the project.
        <br />
        As an extension of the project, I designed a concept website that
        introduces the initiative, presents the modular nesting kits, and
        envisions an online experience for discovering workshops and
        exploring the product collection.
      </p>
      <LaptopPreview
        src={LINKS.websiteConcept}
        title="Nest in City concept website, running live"
        openLabel="Open the live website"
      />
    </CaseStudySection>
  );
}
