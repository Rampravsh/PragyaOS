import { useEffect } from "react";
import TermsComposition from "@/compositions/marketing/legal/TermsComposition";

export function TermsPage(): React.JSX.Element {
  useEffect(() => {
    document.title = "Terms & Conditions | PragyaOS";
  }, []);

  return <TermsComposition />;
}

export default TermsPage;
