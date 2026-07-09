import { useEffect } from "react";
import PrivacyComposition from "@/compositions/marketing/legal/PrivacyComposition";

export function PrivacyPage(): React.JSX.Element {
  useEffect(() => {
    document.title = "Privacy Policy | PragyaOS";
  }, []);

  return <PrivacyComposition />;
}

export default PrivacyPage;
