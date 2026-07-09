import React, { useEffect } from "react";
import { TeachingToolsComposition } from "@/compositions/marketing/features/TeachingToolsComposition";

export function TeachingToolsPage(): React.JSX.Element {
  useEffect(() => {
    document.title = "Teaching Tools | PragyaOS";
  }, []);

  return <TeachingToolsComposition />;
}

export default TeachingToolsPage;
