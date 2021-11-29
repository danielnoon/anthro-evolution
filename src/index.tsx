import React from "react";
import { startGame } from "gamedeck/lib";
import { render } from "react-dom";
import Sidebar from "./components/Sidebar";
import { MainScene } from "./scenes/Main.scene";
import "overlayscrollbars/css/OverlayScrollbars.css";

const canvas = document.querySelector<HTMLCanvasElement>("#view")!;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const game = startGame(new MainScene(), {
  canvas,
  debug: false,
  eventTarget: canvas,
});
render(<Sidebar />, document.querySelector("#sidebar")!);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  game.width = canvas.width;
  game.height = canvas.height;
});

window.addEventListener("pointermove", (ev) => game.input.mouseMove(ev));
window.addEventListener(
  "pointerup",
  (ev) => ((game.input as any).left = false)
);
