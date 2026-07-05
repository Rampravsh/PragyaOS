// 1. Import all subsystems for local packaging and dynamic exports
import { colors } from "./tokens/colors";
import { semanticColors } from "./tokens/semantic-colors";
import { typography } from "./tokens/typography";
import { spacing } from "./tokens/spacing";
import { sizing } from "./tokens/sizing";
import { radius } from "./tokens/radius";
import { border } from "./tokens/border";
import { shadow } from "./tokens/shadow";
import { opacity } from "./tokens/opacity";
import { blur } from "./tokens/blur";
import { motion } from "./tokens/motion";
import { grid } from "./tokens/grid";
import { container } from "./tokens/container";
import { breakpoints } from "./tokens/breakpoints";
import { zIndex } from "./tokens/zIndex";
import { interaction } from "./tokens/interaction";
import { elevation } from "./tokens/elevation";

import { marketingLight } from "./themes/marketing-light";
import { marketingDark } from "./themes/marketing-dark";
import { workspaceLight } from "./themes/workspace-light";
import { workspaceDark } from "./themes/workspace-dark";

import { editorialTypography } from "./editorial/typography";
import { editorialLayout } from "./editorial/layout";
import { editorialSpacing } from "./editorial/spacing";

import { workspaceDensity } from "./workspace/density";
import { workspaceLayout } from "./workspace/layout";
import { workspaceNavigation } from "./workspace/navigation";

import { createTheme } from "./helpers/createTheme";
import { resolveToken } from "./helpers/resolveToken";
import { generateCSSVariables } from "./helpers/cssVariables";

// 2. Export all tokens individually for named consumers
export {
  colors,
  semanticColors,
  typography,
  spacing,
  sizing,
  radius,
  border,
  shadow,
  opacity,
  blur,
  motion,
  grid,
  container,
  breakpoints,
  zIndex,
  interaction,
  elevation,
  marketingLight,
  marketingDark,
  workspaceLight,
  workspaceDark,
  editorialTypography,
  editorialLayout,
  editorialSpacing,
  workspaceDensity,
  workspaceLayout,
  workspaceNavigation,
  createTheme,
  resolveToken,
  generateCSSVariables
};

// 3. Consolidated System Export Object
export const pragyaTheme = {
  tokens: {
    colors,
    semanticColors,
    typography,
    spacing,
    sizing,
    radius,
    border,
    shadow,
    opacity,
    blur,
    motion,
    grid,
    container,
    breakpoints,
    zIndex,
    interaction,
    elevation,
  },
  themes: {
    marketingLight,
    marketingDark,
    workspaceLight,
    workspaceDark,
  },
  editorial: {
    typography: editorialTypography,
    layout: editorialLayout,
    spacing: editorialSpacing,
  },
  workspace: {
    density: workspaceDensity,
    layout: workspaceLayout,
    navigation: workspaceNavigation,
  }
};

export default pragyaTheme;
