import { GObject } from "gamedeck/lib/GObject";
import { Vector2 } from "gamedeck/lib/Utils";
import { partition, range } from "itertools";
import { RoughCanvas } from "roughjs/bin/canvas";

interface Set {
  ops: {
    data: number[];
  }[];
}

export default class RoughRectangle extends GObject {
  color: string;
  static rough: RoughCanvas | null;
  static cache = new Map<string, any>();

  constructor({
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    color = "rgb(255, 255, 255)",
    id = "",
  }) {
    super({
      position: new Vector2(x, y),
      dimensions: new Vector2(width, height),
      id,
    });

    this.color = color;
  }

  get cacheId() {
    return (this.id ?? "") + this.dimensions.x + this.dimensions.y;
  }

  private setOps() {
    const sets = RoughRectangle.cache.get(this.cacheId).sets as Set[];

    for (const set of sets) {
      for (const op of set.ops) {
        const data = op.data;
        const [ys, xs] = partition(range(data.length), (x) => x % 2 !== 0);
        for (const x of xs) {
          data[x] += this.position.x;
        }
        for (const y of ys) {
          data[y] += this.position.y;
        }
      }
    }
  }

  private restoreOps() {
    const sets = RoughRectangle.cache.get(this.cacheId).sets as Set[];

    for (const set of sets) {
      for (const op of set.ops) {
        const data = op.data;
        const [ys, xs] = partition(range(data.length), (x) => x % 2 !== 0);
        for (const x of xs) {
          data[x] -= this.position.x;
        }
        for (const y of ys) {
          data[y] -= this.position.y;
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
          fillStyle: "solid",
        }
      );

      RoughRectangle.cache.set(this.cacheId, rect);
    }
    this.setOps();

    ctx.save();
    const rect = RoughRectangle.cache.get(this.cacheId);
    RoughRectangle.rough.draw(rect);
    ctx.restore();
    this.restoreOps();
  }
}
