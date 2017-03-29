import IsoUtils from './IsoUtils';
import DrawIsoTile from './DrawIsoTile';

export default class DrawIsoBox extends DrawIsoTile {
  constructor(size, color, height) {
    super(size, color, height);
  }

  draw() {
    this.clear();
    const red = this.color >> 16;
    const green = this.color >> 8 & 0xff;
    const blue = this.color & 0xff;

    const leftShadow = (red * .5) << 16 |
      (green * .5) << 8 |
      (blue * .5);
    const rightShadow = (red * .75) << 16 |
      (green * .75) << 8 |
      (blue * .75);

    const h = this.height * IsoUtils.Y_CORRECT;
    const _size = this.size;
    const _color = this.color;

    this.beginFill(_color);
    this.lineStyle(0, 0, .5);
    this.moveTo(-_size, -h);
    this.lineTo(0, -_size * .5 - h);
    this.lineTo(_size, -h);
    this.lineTo(0, _size * .5 - h);
    this.lineTo(-_size, -h);
    this.endFill();

    // draw left
    this.beginFill(leftShadow);
    this.lineStyle(0, 0, .5);
    this.moveTo(-_size, -h);
    this.lineTo(0, _size * .5 - h);
    this.lineTo(0, _size * .5);
    this.lineTo(-_size, 0);
    this.lineTo(-_size, -h);
    this.endFill();

    // draw right
    this.beginFill(rightShadow);
    this.lineStyle(0, 0, .5);
    this.moveTo(_size, -h);
    this.lineTo(0, _size * .5 - h);
    this.lineTo(0, _size * .5);
    this.lineTo(_size, 0);
    this.lineTo(_size, -h);
    this.endFill();
  }

}
