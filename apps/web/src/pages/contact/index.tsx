import { useEffect } from "react";
import ContactComposition from "@/compositions/marketing/contact/ContactComposition";

export function ContactPage(): React.JSX.Element {
  useEffect(() => {
    document.title = "Contact Us | PragyaOS";
  }, []);

  return <ContactComposition />;
}

export default ContactPage;
