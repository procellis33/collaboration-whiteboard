const COLORS = [
  "#c04f38",
  "#bdaa36",
  "#7db230",
  "#64FF4A",
  "#31ad89",
  "#365dbe",
  "#7234b6",
  "#a434ad",
  "#ad3365",
  "#b63333",
];

export const idToColor = (id: number) => {
  return COLORS[id % COLORS.length];
};
