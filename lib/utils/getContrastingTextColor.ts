import { TColor } from "@/types/canvas";

export const getContrastingTextColor = (color: TColor) => {
  const luminance = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;

  return luminance > 182 ? "black" : "white";
};
