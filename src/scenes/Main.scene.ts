import { Game, Scene } from "gamedeck/lib";
import { Rectangle } from "gamedeck/lib/GObjects";

export class MainScene extends Scene {
  color = 0;

  build(game: Game) {
    return new Rectangle({
      color: `hsl(${this.color}, 50%, 50%)`,
      x: 0,
      y: 0,
      width: game.width,
      height: game.height,
    });
  }

  update() {
    this.color += 1;
  }
}
