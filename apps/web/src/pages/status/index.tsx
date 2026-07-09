import { useEffect } from "react";
import StatusComposition from "@/compositions/marketing/status/StatusComposition";

export function StatusPage(): React.JSX.Element {
  useEffect(() => {
    document.title = "System Status | PragyaOS";
  }, []);

  return <StatusComposition />;
}

export default StatusPage;
