import * as PIXI from 'pixi.js';
import Coordianate from './Coordinate';
import IsoUtils from './IsoUtils';

export default class IsoObject extends PIXI.Graphics {
  constructor(size) {
    super();
    this._size = size;
    this._position = new Coordianate();

    this.updateScreenPosition();
  }

  updateScreenPosition(){
    const screenCoord = IsoUtils.mapToScreen(this._position);
    super.x = screenCoord.x;
    super.y = screenCoord.y;
  }

  set x(value){
    this._position.x = value;
    this.updateScreenPosition();
  }
  get x(){
    return this._position.x;
  }

  set y(value) {
    this._position.y = value;
    this.updateScreenPosition();
  }
  get y() {
    return this._position.y;
  }

  set z(value) {
    this._position.z = value;
    this.updateScreenPosition();
  }
  get z() {
    return this._position.z;
  }

  set position(value){
    this._position = value;
    this.updateScreenPosition();
  }
  get position() {
    return this._position;
  }

  get depth(){
    const _position = this._position;
    return (_position.x + _position.z ) * .866 - _position.y * .707;
  }

  set walkable(value){
    this._walkable = value;
  }
  get walkable(){
    return this._walkable;
  }

  set size(value) {
    this._size = value;
  }
  get size(){
    return this._size;
  }

  get rect(){
    return new PIXI.Rectangle(this.x - this.size / 2, this.z - this.size / 2, this.size, this.size);
  }
}
