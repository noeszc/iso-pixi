import Coordinate from './geom/Coordinate';

export default class Isometric {
	constructor() {
		const theta = 30 * Math.PI / 180;
		const alpha = 45 * Math.PI / 180;

		this._sinTheta = Math.sin(theta);
		this._cosTheta = Math.cos(theta);
		this._sinAlpha = Math.sin(alpha);
		this._cosAlpha = Math.cos(alpha);
	}

	mapToScreen(xpp, ypp, zpp) {
		const _sinTheta = this._sinTheta;
		const _cosTheta = this._cosTheta;
		const _sinAlpha = this._sinAlpha;
		const _cosAlpha = this._cosAlpha;

		const yp = ypp;
		const xp = xpp * _cosAlpha + zpp * _sinAlpha;
		const zp = zpp * _cosAlpha - xpp * _sinAlpha;
		const x = xp;
		const y = yp * _cosTheta - zp * _sinTheta;
		return new Coordinate(x, y, 0);
	}

	mapToIsoWorld(screenX, screenY) {
		const _sinTheta = this._sinTheta;
		const _cosTheta = this._cosTheta;
		const _sinAlpha = this._sinAlpha;
		const _cosAlpha = this._cosAlpha;

		const z = (screenX / _cosAlpha - screenY / (_sinAlpha * _sinTheta)) * (1 / (_cosAlpha / _sinAlpha + _sinAlpha / _cosAlpha));
		const x = (1 / _cosAlpha) * (screenX - z * _sinAlpha);
		return new Coordinate(x, 0, z);
	}
}