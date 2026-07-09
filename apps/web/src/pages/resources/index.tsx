import React, { useEffect } from "react";
import { ResourcesHubComposition } from "@/compositions/marketing/resources/ResourcesHubComposition";

export function ResourcesPage(): React.JSX.Element {
  useEffect(() => {
    document.title = "Resources Hub | PragyaOS";
  }, []);

  return <ResourcesHubComposition />;
}

export default ResourcesPage;
