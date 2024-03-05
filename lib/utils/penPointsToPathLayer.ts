import { ELayerType, TColor, TPathLayer } from "@/types/canvas";

export const penPointsToPathLayer = (
  points: number[][],
  color: TColor,
): TPathLayer => {
  if (points.length < 2) {
    throw new Error("Cannot transform points with less than 2 points");
  }

  let left = Number.POSITIVE_INFINITY;
  let top = Number.POSITIVE_INFINITY;
  let right = Number.NEGATIVE_INFINITY;
  let bottom = Number.NEGATIVE_INFINITY;

  for (const point of points) {
    const [x, y] = point;

    if (left > x) {
      left = x;
    }

    if (top > y) {
      top = y;
    }

    if (right < x) {
      right = x;
    }

    if (bottom < y) {
      bottom = y;
    }
  }

  return {
    type: ELayerType.Path,
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
    fill: color,
    points: points.map(([x, y, pressure]) => [x - left, y - top, pressure]),
    stroke: { r: 0, b: 0, g: 0 },
    fillOpacity: 1,
    strokeOpacity: 1,
    strokeWidth: 2,
    strokeDasharray: 0,
  };
};
