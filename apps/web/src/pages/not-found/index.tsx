import { useEffect } from "react";
import NotFoundComposition from "@/compositions/marketing/not-found/NotFoundComposition";

export function NotFoundPage(): React.JSX.Element {
  useEffect(() => {
    document.title = "Page Not Found | PragyaOS";
  }, []);

  return <NotFoundComposition />;
}

export default NotFoundPage;
