import { Section, Container } from '@/components/layout';
import { MarketingHero } from '@/components/marketing';

export function PrivacyPage() {
  return (
    <>
      <MarketingHero
        tag="Legal Guidelines"
        title="PragyaOS Privacy"
        italicTitle="Policy."
        desc="Effective July 2026. This policy describes how we handle coordinate databases and study files."
      />
      <Section bg="white" spacing="md" className="text-left select-none font-body text-body leading-relaxed">
        <Container width="reading" className="space-y-6">
          <h4 className="text-h3 font-heading font-extrabold text-text-primary">1. Data Collection Coordinates</h4>
          <p className="text-text-secondary">
            We collect basic account setup data such as email address and username initials. We store study notes, completed assignments, and custom learning path files securely.
          </p>
          <h4 className="text-h3 font-heading font-extrabold text-text-primary">2. No AI Training on Private Files</h4>
          <p className="text-text-secondary">
            PragyaOS coordinates AI queries locally. We never utilize your private notebook text paragraphs or study files to train global large language models.
          </p>
        </Container>
      </Section>
    </>
  );
}

export function TermsPage() {
  return (
    <>
      <MarketingHero
        tag="Legal Guidelines"
        title="Terms & Rules of"
        italicTitle="Service."
        desc="Effective July 2026. Guidelines for setting up collaborative classrooms and coordinate accounts."
      />
      <Section bg="white" spacing="md" className="text-left select-none font-body text-body leading-relaxed">
        <Container width="reading" className="space-y-6">
          <h4 className="text-h3 font-heading font-extrabold text-text-primary">1. Account Responsibility</h4>
          <p className="text-text-secondary">
            Users must maintain the confidentiality of their login credentials. Any collaboration invitation or peer coordinate link generated is your responsibility.
          </p>
          <h4 className="text-h3 font-heading font-extrabold text-text-primary">2. Acceptable Classroom Behavior</h4>
          <p className="text-text-secondary">
            Instructors and students must respect community forum boundaries. Zero tolerance for harassing discussion posts or plagiarized assignments coordinates.
          </p>
        </Container>
      </Section>
    </>
  );
}

export function CookiesPage() {
  return (
    <>
      <MarketingHero
        tag="Legal Guidelines"
        title="Workspace Cookie"
        italicTitle="Policy."
        desc="Effective July 2026. How we configure cookies for session persistence and SSO logins."
      />
      <Section bg="white" spacing="md" className="text-left select-none font-body text-body leading-relaxed">
        <Container width="reading" className="space-y-6">
          <h4 className="text-h3 font-heading font-extrabold text-text-primary">1. Essential Session Cookies</h4>
          <p className="text-text-secondary">
            We store secure local cookies to verify session logins and maintain active workspace tabs. Removing these cookies will cause full workspace logouts.
          </p>
          <h4 className="text-h3 font-heading font-extrabold text-text-primary">2. UI Preferences Cache</h4>
          <p className="text-text-secondary">
            We use localized cache entries to remember whether you prefer horizontal lines or radial dot grids inside card containers.
          </p>
        </Container>
      </Section>
    </>
  );
}
