import { Game, Scene } from "gamedeck/lib";
import { Rectangle, Dot } from "gamedeck/lib/GObjects";
import { Vector2 } from "gamedeck/lib/Utils";
import Clade from "./obj/Clade.obj";

import clades from "../data/clades.json";
import { Camera, CameraState } from "./obj/Camera.obj";
import publish from "../pubsub/publish";

const BACKGROUND_COLOR = "#F4F5F6";

interface CladeData {
  label: string;
  height: number;
  top: CladeData | string;
  bottom: CladeData | string;
  color?: string;
  topColor?: string;
  bottomColor?: string;
  leftColor?: string;
  topExample?: string;
  bottomExample?: string;
}

export class MainScene extends Scene {
  cameraState = new CameraState();
  mousePos = new Vector2(0, 0);
  isClicking = false;

  build(game: Game) {
    function isSubClade(c: string | CladeData): c is CladeData {
      return typeof c !== "string";
    }

    function makeClade(clade: CladeData, root: boolean): Clade {
      const t = isSubClade(clade.top) ? clade.top.label : clade.top;
      const b = isSubClade(clade.bottom) ? clade.bottom.label : clade.bottom;

      return new Clade(
        {
          bottomLabel: b,
          topLabel: t,
          leftLabel: root ? "Primates" : "",
          position: new Vector2(0, root ? 375 : 0),
          height: clade.height,
          children: [
            isSubClade(clade.top) ? makeClade(clade.top, false) : null,
            isSubClade(clade.bottom) ? makeClade(clade.bottom, false) : null,
          ],
          color: clade.color,
          topColor: clade.topColor,
          bottomColor: clade.bottomColor,
          topExample: clade.topExample,
          bottomExample: clade.bottomExample,
        },
        game
      );
    }

    return new Rectangle({
      x: 0,
      y: 0,
      width: game.width,
      height: game.height,
      color: BACKGROUND_COLOR,
      children: [
        new Camera(this.cameraState, {
          children: [makeClade(clades, true)],
        }),
        new Dot({
          x: this.mousePos.x - 1,
          y: this.mousePos.y - 1,
          color: "transparent",
          radius: 1,
          id: "mouse",
        }),
      ],
    });
  }

  update(game: Game) {
    this.cameraState.update(game);

    this.mousePos = game.input.getMouseLocation();
    // this.mousePos = mouse;
    game.registerCollision("mouse", ".details-indicator", (example) => {
      game.canvasElement.style.cursor = "pointer";
      if (!this.isClicking && game.input.mouseIsDown()) {
        this.isClicking = true;
      } else if (this.isClicking && !game.input.mouseIsDown()) {
        publish("show-details", example.id);
        this.isClicking = false;
      } else if (!game.input.mouseIsDown()) {
        this.isClicking = false;
      }
    });
    game.canvasElement.style.cursor = "default";
  }
}
