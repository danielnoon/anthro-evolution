import { Game } from "gamedeck/lib";
import { GObject } from "gamedeck/lib/GObject";
import { Vector2 } from "gamedeck/lib/Utils";
import { Text } from "gamedeck/lib/gobjects/Text";
import { Rectangle } from "gamedeck/lib/GObjects";
import COLORS from "../../colors";
import { Leaf } from "./Leaf.obj";
import RoughRectangle from "./RoughRectangle.obj";

const PADDING = 16;
const THICKNESS = 4;
const RISE = 3;
const FONT = "500 1.8em Caveat";
const FONT_COLOR = "black";
const LINE_COLOR = "#444444";

interface CladeProps {
  position: Vector2;
  height: number;
  leftLabel?: string;
  topLabel: string;
  bottomLabel: string;
  children?: (Clade | null)[];
  color?: string;
  topColor?: string;
  bottomColor?: string;
  leftColor?: string;
  topExample?: string;
  bottomExample?: string;
  hoverState?: string;
}

function c(color: string) {
  return COLORS[color] ?? color;
}

function filterNulls<T>(arr: (T | null)[]): T[] {
  return arr.filter((x) => x !== null) as T[];
}

export default class Clade extends GObject {
  private cladeProps: CladeProps;
  private top: Vector2;
  private bottom: Vector2;
  private left: Vector2;

  constructor(props: CladeProps, game: Game) {
    game.canvasContext.font = FONT;

    const topMeasure = game.canvasContext.measureText(props.topLabel);
    const bottomMeasure = game.canvasContext.measureText(props.bottomLabel);
    const leftMeasure = props.leftLabel
      ? game.canvasContext.measureText(props.leftLabel)
      : { width: 0, actualBoundingBoxAscent: 0 };

    const position = props.position.add(new Vector2(0, -props.height / 2));
    const branchWidth = Math.max(topMeasure.width, bottomMeasure.width);
    const dimensions = new Vector2(
      branchWidth + leftMeasure.width + PADDING * 4,
      props.height
    );

    super({ position, dimensions, children: [] });

    this.cladeProps = props;

    this.top = new Vector2(
      topMeasure.width,
      topMeasure.actualBoundingBoxAscent
    );
    this.bottom = new Vector2(
      bottomMeasure.width,
      bottomMeasure.actualBoundingBoxAscent
    );
    this.left = new Vector2(
      leftMeasure.width,
      leftMeasure.actualBoundingBoxAscent
    );
  }

  build(game: Game) {
    const child: (n: number) => GObject[] = (n: number) => {
      const c = this.cladeProps.children?.[n];
      if (!c) {
        return [] as GObject[];
      } else
        return [
          new Rectangle({
            x:
              PADDING * 4 +
              this.left.x +
              (n === 0 ? this.top.x : this.bottom.x),
            y: n === 0 ? this.top.y : this.dimensions.y - THICKNESS - RISE,
            width: 0,
            height: 0,
            color: "transparent",

            children: [c],
          }),
        ];
    };

    return [
      // left underline
      ...filterNulls([
        this.cladeProps.leftLabel
          ? new RoughRectangle({
              x: 0,
              y: this.cladeProps.height / 2 + RISE,
              width: this.left.x + PADDING * 2,
              height: THICKNESS,
              color: c(
                this.cladeProps.leftColor ?? this.cladeProps.color ?? LINE_COLOR
              ),
              id: `left_underline_${this.cladeProps.leftLabel}_${this.cladeProps.bottomLabel}`,
            })
          : null,
      ]),
      // left text
      new Text({
        color: c(
          this.cladeProps.leftColor ?? this.cladeProps.color ?? FONT_COLOR
        ),
        font: FONT,
        text: this.cladeProps.leftLabel ?? "",
        position: new Vector2(PADDING, this.cladeProps.height / 2),
        positioning: "middle left",
      }),
      // branch line
      new RoughRectangle({
        color: c(
          this.cladeProps.leftColor ?? this.cladeProps.color ?? LINE_COLOR
        ),
        x: this.left.x + PADDING * 2,
        y: this.top.y + RISE,
        width: THICKNESS,
        height: this.cladeProps.height - this.top.y - RISE,
        id: `branch_stem_${this.cladeProps.leftLabel}_${this.cladeProps.bottomLabel}`,
      }),
      // top underline
      new RoughRectangle({
        x: PADDING * 2 + this.left.x,
        y: this.top.y + RISE,
        width: this.top.x + PADDING * 2 * (this.cladeProps.topExample ? 1 : 2),
        height: THICKNESS,
        color: c(
          this.cladeProps.topColor ?? this.cladeProps.color ?? LINE_COLOR
        ),
        id: `top_underline_${this.cladeProps.leftLabel}_${this.cladeProps.bottomLabel}`,
      }),
      // top text
      new Text({
        color: c(
          this.cladeProps.topColor ?? this.cladeProps.color ?? FONT_COLOR
        ),
        font: FONT,
        text: this.cladeProps.topLabel,
        position: new Vector2(PADDING * 3 + this.left.x, this.top.y),
        positioning: "top left",
      }),
      // bottom underline
      new RoughRectangle({
        color: c(
          this.cladeProps.bottomColor ?? this.cladeProps.color ?? LINE_COLOR
        ),
        x: PADDING * 2 + this.left.x,
        y: this.cladeProps.height - THICKNESS,
        width:
          this.bottom.x + PADDING * 2 * (this.cladeProps.bottomExample ? 1 : 2),
        height: THICKNESS,
        id: `bottom_underline_${this.cladeProps.leftLabel}_${this.cladeProps.bottomLabel}`,
      }),
      // bottom text
      new Text({
        color: c(
          this.cladeProps.bottomColor ?? this.cladeProps.color ?? FONT_COLOR
        ),
        font: FONT,
        text: this.cladeProps.bottomLabel,
        position: new Vector2(
          PADDING * 3 + this.left.x,
          this.cladeProps.height - RISE - THICKNESS
        ),
        positioning: "bottom left",
      }),
      // children
      ...child(0),
      ...child(1),
      // examples
      ...filterNulls<Leaf>([
        this.cladeProps.topExample
          ? new Leaf({
              position: new Vector2(
                PADDING * 4 + this.left.x + this.top.x - 4,
                this.top.y + RISE - 20 + THICKNESS / 2 - 14
              ),
              className: "details-indicator",
              id: this.cladeProps.topExample,
            })
          : null,
        this.cladeProps.bottomExample
          ? new Leaf({
              position: new Vector2(
                PADDING * 4 + this.left.x + this.bottom.x - 4,
                this.cladeProps.height - THICKNESS / 2 - 34
              ),
              className: "details-indicator",
              id: this.cladeProps.bottomExample,
            })
          : null,
      ]),
    ];
  }
}
