import { useEffect } from "react";
import CookieComposition from "@/compositions/marketing/legal/CookieComposition";

export function CookiePage(): React.JSX.Element {
  useEffect(() => {
    document.title = "Cookie Policy | PragyaOS";
  }, []);

  return <CookieComposition />;
}

export default CookiePage;
