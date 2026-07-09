import React, { useEffect } from "react";
import { LearningExperienceComposition } from "@/compositions/marketing/features/LearningExperienceComposition";

export function LearningExperiencePage(): React.JSX.Element {
  useEffect(() => {
    document.title = "Learning Experience | PragyaOS";
  }, []);

  return <LearningExperienceComposition />;
}

export default LearningExperiencePage;
