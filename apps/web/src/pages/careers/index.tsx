import { useEffect } from "react";
import CareersComposition from "@/compositions/marketing/careers/CareersComposition";

export function CareersPage(): React.JSX.Element {
  useEffect(() => {
    document.title = "Careers | PragyaOS";
  }, []);

  return <CareersComposition />;
}

export default CareersPage;
