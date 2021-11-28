import { GObject } from "gamedeck/lib/GObject";

const img = new Image();
img.src = "/paper.png";

export default class Background extends GObject {
  constructor() {
    super({});
  }
  render(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.fillStyle = ctx.createPattern(img, "repeat")!;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();
  }
}
