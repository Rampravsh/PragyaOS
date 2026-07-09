import React, { useEffect } from "react";
import { DocsComposition } from "@/compositions/marketing/resources/documentation/DocsComposition";

export function DocumentationPage(): React.JSX.Element {
  useEffect(() => {
    document.title = "Developer Documentation | PragyaOS";
  }, []);

  return <DocsComposition />;
}

export default DocumentationPage;
