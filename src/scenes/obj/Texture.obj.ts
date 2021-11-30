import { GObject } from "gamedeck/lib/GObject";
import { Vector2 } from "gamedeck/lib/Utils";

const SIZE = 200;

const img = new Image();
img.src = "/paper.png";

export default class Texture extends GObject {
  constructor(private s: number, private origin: Vector2) {
    super({});
  }
  render(ctx: CanvasRenderingContext2D, parent: GObject) {
    const { x, y } = parent.position;

    ctx.save();
    ctx.fillStyle = ctx.createPattern(img, "repeat")!;
    ctx.translate((x % SIZE) + this.origin.x, (y % SIZE) + this.origin.y);
    ctx.fillRect(
      -SIZE * 2,
      -SIZE * 2,
      ctx.canvas.width * this.s + SIZE * 4,
      ctx.canvas.height * this.s + SIZE * 4
    );
    ctx.restore();
  }
}
