export default class Coordinate {
	constructor(x = 0, y = 0, z = 0){
		this.x = x;
		this.y = y;
		this.z = z;
	}

  get x() { return this._x; }
  set x(value) {
    this._x = value;
  }

  get y() { return this._y; }
  set y(value) {
    this._y = value;
  }

  get z() { return this._z; }
  set z(value) {
    this._z = value;
  }

	toString(){
		return `x: ${this.x} , y: ${this.y} , z: ${this.z}`;
	}
}
