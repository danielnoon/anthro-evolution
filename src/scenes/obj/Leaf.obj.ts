import { Sprite } from "gamedeck/lib/Assets";
import { GObject } from "gamedeck/lib/GObject";
import { Vector2 } from "gamedeck/lib/Utils";

const SIZE = 50;

export class Leaf extends GObject {
  sprite = new Sprite("/leaf.svg", SIZE, SIZE);
  dimensions = new Vector2(SIZE, SIZE);
  scale = 0.5;
}
