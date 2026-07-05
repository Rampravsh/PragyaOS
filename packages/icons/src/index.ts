import React from "react";

// Standard SVG Icon Wrapper Component
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

export const createIcon = (
  displayName: string,
  paths: React.ReactNode,
  viewBox = "0 0 24 24"
): React.FC<IconProps> => {
  const Component: React.FC<IconProps> = ({
    size = 24,
    className = "",
    stroke = "currentColor",
    fill = "none",
    strokeWidth = 2,
    ...props
  }) => {
    return React.createElement(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox,
        stroke,
        fill,
        strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: `pragya-icon ${className}`,
        ...props,
      },
      paths
    );
  };
  Component.displayName = displayName;
  return Component;
};

// Expose a collection of core system icons for user flows (Workspace, Course, Student)
export const DashboardIcon = createIcon("DashboardIcon", [
  React.createElement("rect", { key: "d1", x: 3, y: 3, width: 7, height: 9 }),
  React.createElement("rect", { key: "d2", x: 14, y: 3, width: 7, height: 5 }),
  React.createElement("rect", { key: "d3", x: 14, y: 12, width: 7, height: 9 }),
  React.createElement("rect", { key: "d4", x: 3, y: 16, width: 7, height: 5 }),
]);

export const BookIcon = createIcon("BookIcon", [
  React.createElement("path", { key: "b1", d: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" }),
  React.createElement("path", { key: "b2", d: "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" }),
]);

export const SearchIcon = createIcon("SearchIcon", [
  React.createElement("circle", { key: "s1", cx: 11, cy: 11, r: 8 }),
  React.createElement("line", { key: "s2", x1: 21, y1: 21, x2: 16.65, y2: 16.65 }),
]);

export const SettingsIcon = createIcon("SettingsIcon", [
  React.createElement("circle", { key: "se1", cx: 12, cy: 12, r: 3 }),
  React.createElement("path", {
    key: "se2",
    d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
  }),
]);

export const BellIcon = createIcon("BellIcon", [
  React.createElement("path", { key: "be1", d: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" }),
  React.createElement("path", { key: "be2", d: "M13.73 21a2 2 0 0 1-3.46 0" }),
]);

export const UserIcon = createIcon("UserIcon", [
  React.createElement("path", { key: "u1", d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }),
  React.createElement("circle", { key: "u2", cx: 12, cy: 7, r: 4 }),
]);
