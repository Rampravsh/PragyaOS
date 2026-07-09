import React, { useEffect } from "react";
import { OrganizationComposition } from "@/compositions/marketing/features/OrganizationComposition";

export function OrganizationPage(): React.JSX.Element {
  useEffect(() => {
    document.title = "Organization | PragyaOS";
  }, []);

  return <OrganizationComposition />;
}

export default OrganizationPage;
