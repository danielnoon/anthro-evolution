import { Game, Scene } from "gamedeck/lib";
import { Rectangle, Dot } from "gamedeck/lib/GObjects";
import { Vector2 } from "gamedeck/lib/Utils";
import Clade from "./obj/Clade.obj";

import clades from "../data/clades.json";
import { Camera, CameraState } from "./obj/Camera.obj";
import publish from "../pubsub/publish";
import Texture from "./obj/Texture.obj";
import RoughRectangle from "./obj/RoughRectangle.obj";
import { Text } from "gamedeck/lib/gobjects/Text";

const BACKGROUND_COLOR = "#F4F5F6";
const BORDER_COLOR = "#444";
const BORDER_THICKNESS = 15;
const BORDER_STYLE = "solid";
const BORDER_X = -100;
const BORDER_Y = -100;
const BORDER_WIDTH = 2300;
const BORDER_HEIGHT = 1170;

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
  clickStart = new Vector2(0, 0);

  makeBorder() {
    return [
      new Text({
        position: new Vector2(20, BORDER_Y - 20),
        text: "Order Primates",
        font: "800 60px Caveat",
        color: "#000",
        positioning: "bottom left",
      }),
      new RoughRectangle({
        x: BORDER_X + 14,
        y: BORDER_Y - 2,
        width: BORDER_WIDTH,
        height: BORDER_THICKNESS,
        color: BORDER_COLOR,
        style: BORDER_STYLE,
      }),
      new RoughRectangle({
        x: BORDER_X - 12,
        y: BORDER_Y + 4,
        width: BORDER_THICKNESS,
        height: BORDER_HEIGHT + 8,
        color: BORDER_COLOR,
        style: BORDER_STYLE,
      }),
      new RoughRectangle({
        x: BORDER_X,
        y: BORDER_HEIGHT - 100 + 6,
        width: BORDER_WIDTH + 20,
        height: BORDER_THICKNESS,
        color: BORDER_COLOR,
        style: BORDER_STYLE,
      }),
      new RoughRectangle({
        x: BORDER_WIDTH - 100,
        y: BORDER_Y,
        width: BORDER_THICKNESS,
        height: BORDER_HEIGHT + 8,
        color: BORDER_COLOR,
        style: BORDER_STYLE,
      }),
    ];
  }

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
          leftLabel: root ? "Primates             " : "",
          position: new Vector2(0, root ? 380 : 0),
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
      width: 0,
      height: 0,
      color: "transparent",
      children: [
        new Rectangle({
          x: this.cameraState.origin.x,
          y: this.cameraState.origin.y,
          width: game.width / this.cameraState.scale,
          height: game.height / this.cameraState.scale,
          color: BACKGROUND_COLOR,
        }),
        new Camera(this.cameraState, {
          children: [
            makeClade(clades, true),
            ...this.makeBorder(),
            new Texture(1 / this.cameraState.scale, this.cameraState.origin),
          ],
        }),

        new Dot({
          x:
            this.mousePos.x / this.cameraState.scale +
            this.cameraState.origin.x,
          y:
            this.mousePos.y / this.cameraState.scale +
            this.cameraState.origin.y,
          color: "transparent",
          radius: 1,
          id: "mouse",
        }),
      ],
    });
  }

  update(game: Game) {
    if (game.input.mouseIsDown()) {
      game.canvasElement.style.cursor = "grabbing";
    } else {
      game.canvasElement.style.cursor = "grab";
    }

    this.cameraState.update(game);

    this.mousePos = game.input.getMouseLocation();

    game.registerCollision("mouse", ".details-indicator", (example) => {
      game.canvasElement.style.cursor = "pointer";
      if (!this.isClicking && game.input.mouseIsDown()) {
        this.isClicking = true;
        this.clickStart = this.mousePos.clone();
      } else if (this.isClicking && !game.input.mouseIsDown()) {
        if (this.clickStart.add(this.mousePos.invert()).getMagnitude() < 10) {
          publish("show-details", example.id);
        }
        this.isClicking = false;
      } else if (!game.input.mouseIsDown()) {
        this.isClicking = false;
      }
    });
  }
}
