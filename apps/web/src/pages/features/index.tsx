import React, { useEffect } from "react";
import { FeaturesMainComposition } from "@/compositions/marketing/features/FeaturesMainComposition";

export function FeaturesPage(): React.JSX.Element {
  useEffect(() => {
    document.title = "Features | PragyaOS";
  }, []);

  return <FeaturesMainComposition />;
}

export default FeaturesPage;
