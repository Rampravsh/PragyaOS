import plugin from "tailwindcss/plugin";
import { customUtilities } from "./utilities";

export const themePlugin = plugin(function ({ addUtilities }) {
  // addUtilities(customUtilities);
});

export default themePlugin;
