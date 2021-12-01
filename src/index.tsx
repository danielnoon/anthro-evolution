import React from "react";
import { Game } from "gamedeck/lib";
import { render } from "react-dom";
import Sidebar from "./components/Sidebar";
import { MainScene } from "./scenes/Main.scene";
import "overlayscrollbars/css/OverlayScrollbars.css";

const canvas = document.querySelector<HTMLCanvasElement>("#view")!;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

render(<Sidebar />, document.querySelector("#sidebar")!);

const game = new Game({
  canvas,
  debug: false,
  eventTarget: canvas,
});

game.loadScene(new MainScene(canvas, game));

game.start();
