import { GObject } from "gamedeck/lib/GObject";
import { Vector2 } from "gamedeck/lib/Utils";
import { Game } from "gamedeck/lib/Game";

export class CameraState {
  public position = new Vector2(0, 0);
  private mousePrev?: Vector2;

  public update(game: Game) {
    if (game.input.mouseIsDown()) {
      const mouseNow = game.input.getMouseLocation();

      if (!this.mousePrev) this.mousePrev = game.input.getMouseLocation();

      const diff = mouseNow.add(this.mousePrev.invert());
      this.position.addM(diff);

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
