import Coordinate from '../utils/geom/Coordinate';
import Isometric from '../utils/Isometric';

export default class Map {
	constructor() {
		this.initialize();
	}

	initialize() {
		this._iso = new Isometric();

		this._tileWidthOnScreen = 64;
		this._tileHeightOnScreen = 32;

		this._tileWidth = this._iso.mapToIsoWorld(64, 0).x;
		this._tileHeight = this._tileWidth;

		this.buildGrid();
	}

	buildGrid() {
		this._grid = [];

		const cols = 10;
		const rows = 10;

		for (let i = 0; i < cols; ++i) {
			this._grid[i] = [];
			for (let j = 0; j < rows; ++j) {
				const tx = i * this._tileWidth;
				const tz = -j * this._tileHeight;

				const coord = this._iso.mapToScreen(tx, 0, tz);
				console.log(coord.toString());

				this._grid[i][j] = {};
			}
		}
	}
}