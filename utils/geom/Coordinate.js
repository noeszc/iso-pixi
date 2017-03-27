export default class Coordinate {
	constructor(x = 0, y = 0, z = 0){
		this._x = x;
		this._y = y;
		this._z = z;
	}
	get x(){ return this._x; }
	set x(value) {
		this._x = value;
	}

	get y(){ return this._y; }
	set y(value) {
		this._y = value;
	}

	get z(){ return this._z; }
	set z(value) {
		this._z = value;
	}

	toString(){
		return `x: ${this._x} , y: ${this._y} , z: ${this._z}`;
	}
}