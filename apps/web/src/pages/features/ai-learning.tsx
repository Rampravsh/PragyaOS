import React, { useEffect } from "react";
import { AILearningComposition } from "@/compositions/marketing/features/AILearningComposition";

export function AILearningPage(): React.JSX.Element {
  useEffect(() => {
    document.title = "AI Learning | PragyaOS";
  }, []);

  return <AILearningComposition />;
}

export default AILearningPage;
