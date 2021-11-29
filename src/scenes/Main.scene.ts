import { Game, Scene } from "gamedeck/lib";
import { Rectangle, Dot } from "gamedeck/lib/GObjects";
import { Vector2 } from "gamedeck/lib/Utils";
import Clade from "./obj/Clade.obj";

import clades from "../data/clades.json";
import { Camera, CameraState } from "./obj/Camera.obj";
import publish from "../pubsub/publish";
import Background from "./obj/Background.obj";
import RoughRectangle from "./obj/RoughRectangle.obj";
import { Text } from "gamedeck/lib/gobjects/Text";

const BACKGROUND_COLOR = "#F4F5F6";
const BORDER_COLOR = "#444";
const BORDER_WIDTH = 15;
const BORDER_STYLE = "solid";

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
        position: new Vector2(20, -90),
        text: "Order Primates",
        font: "800 60px Caveat",
        color: "#000",
        positioning: "bottom left",
      }),
      new RoughRectangle({
        x: -80,
        y: -60,
        width: 2225,
        height: BORDER_WIDTH,
        color: BORDER_COLOR,
        style: BORDER_STYLE,
      }),
      new RoughRectangle({
        x: -100,
        y: -30,
        width: BORDER_WIDTH,
        height: 1050,
        color: BORDER_COLOR,
        style: BORDER_STYLE,
      }),
      new RoughRectangle({
        x: -50,
        y: 1025,
        width: 2180,
        height: BORDER_WIDTH,
        color: BORDER_COLOR,
        style: BORDER_STYLE,
      }),
      new RoughRectangle({
        x: 2175,
        y: -50,
        width: BORDER_WIDTH,
        height: 1050,
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
      width: game.width,
      height: game.height,
      color: BACKGROUND_COLOR,
      children: [
        new Camera(this.cameraState, {
          children: [
            makeClade(clades, true),
            ...this.makeBorder(),
            new Background(),
          ],
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
