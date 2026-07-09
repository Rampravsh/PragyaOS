import { useEffect } from "react";
import FAQComposition from "@/compositions/marketing/faq/FAQComposition";

export function FAQPage(): React.JSX.Element {
  useEffect(() => {
    document.title = "FAQ | PragyaOS";
  }, []);

  return <FAQComposition />;
}

export default FAQPage;
