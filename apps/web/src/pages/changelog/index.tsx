import { useEffect } from "react";
import ChangelogComposition from "@/compositions/marketing/changelog/ChangelogComposition";

export function ChangelogPage(): React.JSX.Element {
  useEffect(() => {
    document.title = "Changelog | PragyaOS";
  }, []);

  return <ChangelogComposition />;
}

export default ChangelogPage;
