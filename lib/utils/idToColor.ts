const COLORS = [
  "#c04f38",
  "#9b8c2b",
  "#71a22b",
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
