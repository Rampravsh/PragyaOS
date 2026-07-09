import React, { useEffect } from "react";
import { PricingComposition } from "@/compositions/marketing/pricing/PricingComposition";

export function PricingPage(): React.JSX.Element {
  useEffect(() => {
    document.title = "Pricing Plans | PragyaOS";
  }, []);

  return <PricingComposition />;
}

export default PricingPage;
