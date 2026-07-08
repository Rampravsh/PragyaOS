import { Section, Container } from '@/components/layout';
import { MarketingHero, ContactForm } from '@/components/marketing';
import { MapPin, Mail } from 'lucide-react';

export default function ContactPage() {
  const coordinates = [
    { label: 'San Francisco', desc: '450 Sutter St, Suite 120, San Francisco, CA 94108', icon: <MapPin className="w-5 h-5 text-accent-gold" /> },
    { label: 'Bengaluru Office', desc: '72, MG Road, Haridevpur, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560001', icon: <MapPin className="w-5 h-5 text-accent-blue" /> },
    { label: 'General Email', desc: 'hello@pragyaos.org', icon: <Mail className="w-5 h-5 text-accent-purple" /> },
  ];

  return (
    <>
      <MarketingHero
        tag="Contact Us"
        title="We would love to hear from"
        italicTitle="your study space."
        desc="Connect with general inquiries, school coordinate integrations, or group discount billing questions."
      />
      <Section bg="white" spacing="md">
        <Container width="desktop">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Office info */}
            <div className="lg:col-span-5 space-y-8 text-left">
              <div className="space-y-3">
                <h3 className="text-h2 font-heading font-extrabold text-text-primary">Office Coordinates</h3>
                <p className="text-body text-text-secondary leading-relaxed font-body">
                  Drop by or reach out via email. Our team coordinates across multiple study zones.
                </p>
              </div>

              <ul className="space-y-6">
                {coordinates.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div className="space-y-0.5 pt-0.5">
                      <h4 className="text-body font-heading font-extrabold text-text-primary leading-none">{item.label}</h4>
                      <p className="text-small text-text-muted leading-relaxed font-body mt-1">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Contact form block */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

          </div>
        </Container>
      </Section>
    </>
  );
}
