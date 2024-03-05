import {
  EStrokeDasharray,
  EStrokeWidth,
  TCamera,
  TColor,
} from "@/types/canvas";

// * DASHBOARD
export const DEFAULT_BOARD_NAME: string = "Untitled";

// * CANVAS
export const MAX_LAYERS: number = 350;
export const MULTI_SELECTION_TRIGGER_DISTANCE: number = 5;
export const DEFAULT_THROTTLE_DURATION: number = 12;
export const DEFAULT_SCALE: number = 1;
export const DEFAULT_MOUSE_POSITION = { x: 0, y: 0 };
export const DEFAULT_CAMERA_POSITION: TCamera = { x: 0, y: 0 };

// * Layer Defaults
export const INITIAL_LAYER_COLOR: TColor = {
  r: 255,
  g: 255,
  b: 255,
};
export const INITIAL_LAYER_FILL_OPACITY: number = 1;
export const INITIAL_LAYER_HEIGHT: number = 100;
export const INITIAL_LAYER_WIDTH: number = 100;
export const INITIAL_LAYER_STROKE_COLOR: TColor = {
  r: 0,
  g: 0,
  b: 0,
};
export const INITIAL_LAYER_STROKE_OPACITY: number = 1;
export const INITIAL_LAYER_STROKE_DASHARRAY: EStrokeDasharray =
  EStrokeDasharray.Solid;
export const INITIAL_LAYER_STROKE_WIDTH: EStrokeWidth = EStrokeWidth.Thin;

// * ERRORS
export const MAX_LAYERS_ERROR: string = "You've reached layers limit";
export const FAILED_COPY_COLOR_ERROR: string = "Failed to copy color";
export const FAILED_COPY_LINK_ERROR: string = "Failed to copy link";
export const MUTATE_OPERATION_ERROR: string = "Operation failed";
export const MUTATE_OPERATION_UNKNOWN_ERROR: string = "Unknown error occurred";

// * SUCCESS ACTIONS
export const LINK_COPY_SUCCESS: string = "Link copied";
export const COLOR_COPY_SUCCESS: string = "Color copied";
export const BOARD_CREATE_SUCCESS: string = "Board created";
export const BOARD_DELETE_SUCCESS: string = "Board deleted";
export const BOARD_RENAME_SUCCESS: string = "Board renamed";

// * DEFAULT COLORS
export const COLORS_PICKER: TColor[] = [
  { r: 0, g: 0, b: 0 },
  { r: 255, g: 255, b: 255 },
  { r: 255, g: 51, b: 51 },
  { r: 51, g: 255, b: 51 },
  { r: 51, g: 51, b: 255 },
];

export const COLORS_PICKER_EXTENDED: TColor[] = [
  { r: 255, g: 127, b: 80 },
  { r: 144, g: 238, b: 144 },
  { r: 102, g: 205, b: 170 },
  { r: 64, g: 224, b: 208 },
  { r: 70, g: 130, b: 180 },
  { r: 138, g: 43, b: 226 },
  { r: 250, g: 235, b: 215 },
  { r: 250, g: 250, b: 210 },
  { r: 160, g: 82, b: 45 },
  { r: 176, g: 196, b: 222 },
  { r: 0, g: 0, b: 0 },
  { r: 255, g: 255, b: 255 },
  { r: 240, g: 255, b: 240 },
  { r: 240, g: 255, b: 255 },
  { r: 255, g: 250, b: 250 },
];

export const DEFAULT_FALLBACK_COLOR = "#000";

// * LINKS

export const PORTFOLIO_LINK = "https://www.name-romanov.com/";

export const GITHUB_LINK = "https://github.com/procellis33";

// * TW METRICS
export const TW_MD = 768;
