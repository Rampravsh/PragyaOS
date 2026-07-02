import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const App = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-slate-950 text-slate-100">
      <h1 className="text-4xl font-extrabold tracking-tight">PragyaOS</h1>
      <p className="mt-2 text-slate-400">The Operating System for Modern Learning</p>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
