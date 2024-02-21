export type TColor = {
  r: number;
  g: number;
  b: number;
};

export type TCamera = {
  x: number;
  y: number;
};

export enum ELayerType {
  Rectangle,
  Ellipse,
  Path,
  Text,
  Note,
}

export type TRectangleLayer = {
  type: ELayerType.Rectangle;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: TColor;
  value?: string;
};

export type TEllipseLayer = {
  type: ELayerType.Ellipse;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: TColor;
  value?: string;
};

export type TPathLayer = {
  type: ELayerType.Path;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: TColor;
  points: number[][];
  value?: string;
};

export type TTextLayer = {
  type: ELayerType.Text;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: TColor;
  value?: string;
};

export type TNoteLayer = {
  type: ELayerType.Note;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: TColor;
  value?: string;
};

export type TPoint = {
  x: number;
  y: number;
};

export type TXYWH = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export enum ESide {
  Top = 1,
  Bottom = 2,
  Left = 4,
  Right = 8,
}

export type TCanvasState =
  | {
      mode: ECanvasMode.None;
    }
  | {
      mode: ECanvasMode.SelectionNet;
      origin: TPoint;
      current?: TPoint;
    }
  | {
      mode: ECanvasMode.Translating;
      current: TPoint;
    }
  | {
      mode: ECanvasMode.Inserting;
      layerType:
        | ELayerType.Ellipse
        | ELayerType.Rectangle
        | ELayerType.Text
        | ELayerType.Note;
    }
  | {
      mode: ECanvasMode.Pencil;
    }
  | {
      mode: ECanvasMode.Pressing;
      origin: TPoint;
    }
  | {
      mode: ECanvasMode.Resizing;
      initialBounds: TXYWH;
      corner: ESide;
    };

export enum ECanvasMode {
  None,
  Pressing,
  SelectionNet,
  Translating,
  Inserting,
  Resizing,
  Pencil,
}

export type TLayer =
  | TRectangleLayer
  | TEllipseLayer
  | TPathLayer
  | TTextLayer
  | TNoteLayer;
