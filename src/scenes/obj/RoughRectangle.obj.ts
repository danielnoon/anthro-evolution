import { GObject } from "gamedeck/lib/GObject";
import { Vector2 } from "gamedeck/lib/Utils";
import { partition, range } from "itertools";
import { RoughCanvas } from "roughjs/bin/canvas";
import { Options } from "roughjs/bin/core";

interface Set {
  type: string;
  ops: {
    op: string;
    data: number[];
  }[];
}

interface Drawable {
  shape: string;
  sets: Set[];
  options: Options;
}

export default class RoughRectangle extends GObject {
  color: string;
  style: string;
  static rough: RoughCanvas | null;
  static cache = new Map<string, { shape: Drawable; base: Set[] }>();

  constructor({
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    color = "rgb(255, 255, 255)",
    id = "",
    style = "solid",
  }) {
    super({
      position: new Vector2(x, y),
      dimensions: new Vector2(width, height),
      id,
    });

    this.color = color;
    this.style = style;
  }

  get cacheId() {
    return (this.id ?? "") + this.dimensions.x + this.dimensions.y;
  }

  copySets(sets: Set[]): Set[] {
    return sets.map((set) => {
      return {
        type: set.type,
        ops: set.ops.map((op) => {
          return {
            op: op.op,
            data: op.data.slice(),
          };
        }),
      };
    });
  }

  updatePosition() {
    const { shape, base } = RoughRectangle.cache.get(this.cacheId)!;
    const sets = shape.sets;
    for (const i of range(sets.length)) {
      const set = sets[i];
      const baseSet = base[i];
      for (const j of range(set.ops.length)) {
        const op = set.ops[j];
        const baseOp = baseSet.ops[j];
        const [ys, xs] = partition(range(op.data.length), (x) => x % 2 !== 0);
        for (const y of ys) {
          op.data[y] = this.position.y + baseOp.data[y];
        }
        for (const x of xs) {
          op.data[x] = this.position.x + baseOp.data[x];
        }
      }
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    if (!RoughRectangle.rough) {
      RoughRectangle.rough = new RoughCanvas(ctx.canvas);
    }

    if (!RoughRectangle.cache.has(this.cacheId)) {
      const rect = RoughRectangle.rough.generator.rectangle(
        0,
        0,
        this.dimensions.x,
        this.dimensions.y,
        {
          fill: this.color,
          stroke: this.color,
          roughness: 0.8,
          fillStyle: this.style,
        }
      );

      RoughRectangle.cache.set(this.cacheId, {
        shape: rect,
        base: this.copySets(rect.sets),
      });
    }

    this.updatePosition();

    ctx.save();
    const { shape } = RoughRectangle.cache.get(this.cacheId)!;
    RoughRectangle.rough.draw(shape as any);
    ctx.restore();
  }
}
