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

export const MenuIcon = createIcon("MenuIcon", [
  React.createElement("line", { key: "m1", x1: 4, y1: 12, x2: 20, y2: 12 }),
  React.createElement("line", { key: "m2", x1: 4, y1: 6, x2: 20, y2: 6 }),
  React.createElement("line", { key: "m3", x1: 4, y1: 18, x2: 20, y2: 18 }),
]);

export const CloseIcon = createIcon("CloseIcon", [
  React.createElement("line", { key: "c1", x1: 18, y1: 6, x2: 6, y2: 18 }),
  React.createElement("line", { key: "c2", x1: 6, y1: 6, x2: 18, y2: 18 }),
]);

export const MonitorIcon = createIcon("MonitorIcon", [
  React.createElement("rect", { key: "mo1", x: 2, y: 3, width: 20, height: 14, rx: 2, ry: 2 }),
  React.createElement("line", { key: "mo2", x1: 8, y1: 21, x2: 16, y2: 21 }),
  React.createElement("line", { key: "mo3", x1: 12, y1: 17, x2: 12, y2: 21 }),
]);

export const StarIcon = createIcon("StarIcon", [
  React.createElement("polygon", {
    key: "st1",
    points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",
  }),
]);

export const PlayIcon = createIcon("PlayIcon", [
  React.createElement("polygon", { key: "pl1", points: "5 3 19 12 5 21 5 3" }),
]);

export const PencilIcon = createIcon("PencilIcon", [
  React.createElement("path", { key: "pe1", d: "M12 20h9" }),
  React.createElement("path", { key: "pe2", d: "M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" }),
]);

export const LayersIcon = createIcon("LayersIcon", [
  React.createElement("polygon", { key: "la1", points: "12 2 2 7 12 12 22 7 12 2" }),
  React.createElement("polyline", { key: "la2", points: "2 17 12 22 22 17" }),
  React.createElement("polyline", { key: "la3", points: "2 12 12 17 22 12" }),
]);

export const TrophyIcon = createIcon("TrophyIcon", [
  React.createElement("path", { key: "tr1", d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6" }),
  React.createElement("path", { key: "tr2", d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18" }),
  React.createElement("path", { key: "tr3", d: "M4 22h16" }),
  React.createElement("path", { key: "tr4", d: "M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" }),
  React.createElement("path", { key: "tr5", d: "M12 2a4 4 0 0 0-4 4v5a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4Z" }),
]);

export const LogoIcon = createIcon("LogoIcon", [
  React.createElement("path", {
    key: "leaf-solid",
    d: "M20 4c-1.5 1-4.5 3.5-7 6.5-2.5 3-4.5 6.5-5 9.5-.2 1 .2 1.5 1 1.8.8.2 1.8-.2 3-1.2 2.5-2 5.5-5 8-8.5 2.5-3.5 2.5-6.5 1-7.5-.5-.3-.7-.3-1-.6z",
    fill: "currentColor",
  }),
  React.createElement("path", {
    key: "leaf-stem",
    d: "M8 20c-1.5 1.5-3 2-4.5 2.5",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
  }),
]);

export const FlameIcon = createIcon("FlameIcon", [
  React.createElement("path", {
    key: "fl1",
    d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",
  }),
]);

export const BookmarkIcon = createIcon("BookmarkIcon", [
  React.createElement("path", { key: "bm1", d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" }),
]);

export const CalendarIcon = createIcon("CalendarIcon", [
  React.createElement("rect", { key: "ca1", x: 3, y: 4, width: 18, height: 18, rx: 2, ry: 2 }),
  React.createElement("line", { key: "ca2", x1: 16, y1: 2, x2: 16, y2: 6 }),
  React.createElement("line", { key: "ca3", x1: 8, y1: 2, x2: 8, y2: 6 }),
  React.createElement("line", { key: "ca4", x1: 3, y1: 10, x2: 21, y2: 10 }),
]);

export const BarChartIcon = createIcon("BarChartIcon", [
  React.createElement("line", { key: "bc1", x1: 18, y1: 20, x2: 18, y2: 10 }),
  React.createElement("line", { key: "bc2", x1: 12, y1: 20, x2: 12, y2: 4 }),
  React.createElement("line", { key: "bc3", x1: 6, y1: 20, x2: 6, y2: 14 }),
]);

export const MessageSquareIcon = createIcon("MessageSquareIcon", [
  React.createElement("path", { key: "ms1", d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }),
]);

export const AwardIcon = createIcon("AwardIcon", [
  React.createElement("circle", { key: "aw1", cx: 12, cy: 8, r: 6 }),
  React.createElement("path", { key: "aw2", d: "M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" }),
]);

export const ChevronRightIcon = createIcon("ChevronRightIcon", [
  React.createElement("polyline", { key: "cr1", points: "9 18 15 12 9 6" }),
]);

export const ChevronDownIcon = createIcon("ChevronDownIcon", [
  React.createElement("polyline", { key: "cd1", points: "6 9 12 15 18 9" }),
]);

export const SunIcon = createIcon("SunIcon", [
  React.createElement("circle", { key: "su1", cx: 12, cy: 12, r: 5 }),
  React.createElement("line", { key: "su2", x1: 12, y1: 1, x2: 12, y2: 3 }),
  React.createElement("line", { key: "su3", x1: 12, y1: 21, x2: 12, y2: 23 }),
  React.createElement("line", { key: "su4", x1: 4.22, y1: 4.22, x2: 5.64, y2: 5.64 }),
  React.createElement("line", { key: "su5", x1: 18.36, y1: 18.36, x2: 19.78, y2: 19.78 }),
  React.createElement("line", { key: "su6", x1: 1, y1: 12, x2: 3, y2: 12 }),
  React.createElement("line", { key: "su7", x1: 21, y1: 12, x2: 23, y2: 12 }),
  React.createElement("line", { key: "su8", x1: 4.22, y1: 19.78, x2: 5.64, y2: 18.36 }),
  React.createElement("line", { key: "su9", x1: 18.36, y1: 5.64, x2: 19.78, y2: 4.22 }),
]);

export const MoonIcon = createIcon("MoonIcon", [
  React.createElement("path", { key: "mo1", d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" }),
]);

export const UsersIcon = createIcon("UsersIcon", [
  React.createElement("path", { key: "us1", d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" }),
  React.createElement("circle", { key: "us2", cx: 9, cy: 7, r: 4 }),
  React.createElement("path", { key: "us3", d: "M23 21v-2a4 4 0 0 0-3-3.87" }),
  React.createElement("path", { key: "us4", d: "M16 3.13a4 4 0 0 1 0 7.75" }),
]);

export const ArrowRightIcon = createIcon("ArrowRightIcon", [
  React.createElement("line", { key: "ar1", x1: 5, y1: 12, x2: 19, y2: 12 }),
  React.createElement("polyline", { key: "ar2", points: "12 5 19 12 12 19" }),
]);

