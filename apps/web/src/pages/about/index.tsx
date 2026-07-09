import { useEffect } from "react";
import AboutComposition from "@/compositions/marketing/about/AboutComposition";

export function AboutPage(): React.JSX.Element {
  useEffect(() => {
    document.title = "About Us | PragyaOS";
  }, []);

  return <AboutComposition />;
}

export default AboutPage;
