import React, { useEffect } from "react";
import { HelpCenterComposition } from "@/compositions/marketing/resources/help-center/HelpCenterComposition";

export function HelpCenterPage(): React.JSX.Element {
  useEffect(() => {
    document.title = "Help Center & Support | PragyaOS";
  }, []);

  return <HelpCenterComposition />;
}

export default HelpCenterPage;
