import IsoObject from './IsoObject';

export default class DrawIsoTile extends IsoObject {
  constructor(size, color, height = 0) {
    super(size);
    this.color = color;
    this.height = height;
    this.draw();
  }

  draw() {
    const size = this.size;
    this.clear();
    this.beginFill(this.color, 0.8);
    this.lineStyle(1, this.color, 1);

    this.moveTo(-size, 0);
    this.lineTo(0, -size * 0.5);
    this.lineTo(size, 0);
    this.lineTo(0, size * 0.5);
    this.lineTo(-size, 0);
  }

  set height(value) {
    this._height = value;
    this.draw();
  }
  get height() {
    return this._height;
  }

  set color(value) {
    this._color = value;
    this.draw();
  }
  get color() {
    return this._color;
  }
}
