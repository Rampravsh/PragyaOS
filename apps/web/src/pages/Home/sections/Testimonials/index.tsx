import { Section, Container, SectionHeader, SectionBody } from '@/components/layout';
import { StickyNote } from '@/components/ui';

export default function TestimonialsSection() {
  const testimonials: {
    quote: string;
    name: string;
    role: string;
    color: 'yellow' | 'green' | 'blue';
    decor: 'pin' | 'tape' | 'none';
  }[] = [
    {
      quote: "PragyaOS helped me go from confused to confident. The learning experience is just amazing!",
      name: "Riya Sharma",
      role: "Student",
      color: "yellow",
      decor: "tape",
    },
    {
      quote: "Finally, a platform that makes teaching online simple and beautiful.",
      name: "Rahul Verma",
      role: "Instructor",
      color: "green",
      decor: "pin",
    },
    {
      quote: "Our team uses PragyaOS to train and upskill every week. It's intuitive, powerful and loved by everyone.",
      name: "Neha Kapoor",
      role: "L&D Manager",
      color: "blue",
      decor: "none",
    },
  ];

  return (
    <Section bg="white" spacing="md" className="border-b border-border select-none">
      <Container width="desktop">
        <SectionHeader align="center" className="mb-14">
          <span className="text-caption font-semibold tracking-wider text-accent-gold uppercase font-body">
            Testimonials
          </span>
          <h2 className="text-display-lg font-heading text-text-primary leading-tight font-extrabold mt-2">
            Loved by learners around the world
          </h2>
        </SectionHeader>

        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {testimonials.map((test, idx) => (
              <StickyNote
                key={idx}
                color={test.color}
                decor={test.decor}
                rotate={idx % 2 === 0 ? 'left' : 'right'}
                className="min-h-[220px] flex flex-col justify-between p-6 text-left"
              >
                <p className="text-body font-body italic leading-relaxed">
                  "{test.quote}"
                </p>
                <div className="pt-4 border-t border-black/5 mt-4">
                  <h4 className="text-small font-heading font-extrabold leading-none">
                    {test.name}
                  </h4>
                  <span className="text-caption font-body opacity-70 mt-1 block">
                    {test.role}
                  </span>
                </div>
              </StickyNote>
            ))}
          </div>
        </SectionBody>
      </Container>
    </Section>
  );
}
