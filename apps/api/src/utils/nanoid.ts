import { customAlphabet } from "nanoid";

// URL-safe alphabet excluding visually similar characters (l, 1, o, 0, I)
const ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export const generateNanoId = (length = 12): string => {
  const nanoid = customAlphabet(ALPHABET, length);
  return nanoid();
};
