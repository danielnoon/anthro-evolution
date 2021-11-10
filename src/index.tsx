import { startGame } from "gamedeck/lib";
import { MainScene } from "./scenes/Main.scene";

const canvas = document.querySelector<HTMLCanvasElement>("#view")!;
// canvas.width = document.body.getBoundingClientRect().width;
// canvas.height = document.body.getBoundingClientRect().height;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

startGame(new MainScene(), { canvas });
