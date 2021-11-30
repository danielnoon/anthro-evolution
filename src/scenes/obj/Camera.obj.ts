import { GObject } from "gamedeck/lib/GObject";
import { Vector2 } from "gamedeck/lib/Utils";
import { Game } from "gamedeck/lib/Game";

export class CameraState {
  public position = new Vector2(0, 0);
  private mousePrev?: Vector2;
  public scale = 1;
  public origin = new Vector2(0, 0);

  constructor() {
    const canvas = document.querySelector<HTMLCanvasElement>("#view")!;
    canvas.addEventListener("wheel", (e) => {
      const ctx = canvas.getContext("2d")!;
      const delta = 1 + -e.deltaY / 1000;
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      ctx.translate(this.origin.x, this.origin.y);
      this.origin.addM(
        new Vector2(
          mouseX / (this.scale * delta) - mouseX / this.scale,
          mouseY / (this.scale * delta) - mouseY / this.scale
        ).invert()
      );

      ctx.scale(delta, delta);

      ctx.translate(-this.origin.x, -this.origin.y);

      this.scale *= delta;
    });
  }

  public update(game: Game) {
    if (game.input.mouseIsDown()) {
      const mouseNow = game.input.getMouseLocation();

      if (!this.mousePrev) this.mousePrev = game.input.getMouseLocation();

      const diff = mouseNow.add(this.mousePrev.invert());
      this.position.addM(diff.scalar(1 / this.scale));

      this.mousePrev = game.input.getMouseLocation();
    } else {
      this.mousePrev = undefined;
    }
  }
}

export class Camera extends GObject {
  constructor(state: CameraState, props: { children: GObject[] }) {
    super({ position: state.position, children: props.children });
  }
}
