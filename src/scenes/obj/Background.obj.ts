import { GObject } from "gamedeck/lib/GObject";

const SIZE = 200;

const img = new Image();
img.src = "/paper.png";

export default class Background extends GObject {
  constructor() {
    super({});
  }
  render(ctx: CanvasRenderingContext2D, parent: GObject) {
    const { x, y } = parent.position;

    ctx.save();
    ctx.fillStyle = ctx.createPattern(img, "repeat")!;
    ctx.translate(x % SIZE, y % SIZE);
    ctx.fillRect(
      -SIZE,
      -SIZE,
      ctx.canvas.width + SIZE * 2,
      ctx.canvas.height + SIZE * 2
    );
    ctx.restore();
  }
}
