import * as PIXI from 'pixi.js';
import Coordinate from './Coordinate';
import Rectangle from './Rectangle';
import IsoUtils from './IsoUtils';

export default class IsoObject extends PIXI.Graphics {
  constructor(size) {
    super();
    this._size = size;
    this._position = new Coordinate();
    this._vx = 0;
    this._vy = 0;
    this._vz = 0;
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
  set vx(value) {
    this._vx = value;
  }
  get vx() {
    return this._vx;
  }
  set vy(value) {
    this._vy = value;
  }
  get vy() {
    return this._vy;
  }
  set vz(value) {
    this._vz = value;
  }
  get vz() {
    return this._vz;
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
    return new Rectangle(this.x - this.size / 2, this.z - this.size / 2, this.size, this.size);
  }
}
