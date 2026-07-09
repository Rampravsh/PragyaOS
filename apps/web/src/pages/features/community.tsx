import React, { useEffect } from "react";
import { CommunityComposition } from "@/compositions/marketing/features/CommunityComposition";

export function CommunityPage(): React.JSX.Element {
  useEffect(() => {
    document.title = "Community | PragyaOS";
  }, []);

  return <CommunityComposition />;
}

export default CommunityPage;
