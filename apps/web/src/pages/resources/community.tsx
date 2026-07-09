import React, { useEffect } from "react";
import { CommunityComposition } from "@/compositions/marketing/resources/community/CommunityComposition";

export function CommunityPage(): React.JSX.Element {
  useEffect(() => {
    document.title = "Community Ecosystem | PragyaOS";
  }, []);

  return <CommunityComposition />;
}

export default CommunityPage;
