// import Coordinate from './utils/geom/Coordinate';
// import Isometric from './utils/Isometric';
// import * as PIXI from 'pixi.js';

// const app = new PIXI.Application(800, 600);
// document.body.appendChild(app.view);

// const loader = PIXI.loader;
// const resources = PIXI.loader.resources;
// const assetTilePath = '/assets/textures/grass_and_water_23.png';

// loader
//   .add('tile', assetTilePath)
//   .load(buildGrid);
// const Y_CORRECT = Math.cos(-Math.PI / 6) * Math.SQRT2;
// const iso = new Isometric();
// const tileWidthOnScreen = 64;
// const tileHeightOnScreen = 64;

// const tileWidth = iso.mapToIsoWorld(64, 0).x;
// const tileHeight = tileWidth;

// const cols = 10;
// const rows = 10;

// const map = new PIXI.Container();
// app.stage.addChild(map);

// const grid = [];
// let lastTile = null;

// function buildGrid() {

//   for (let i = 0; i < cols; ++i) {
//     grid[i] = [];
//     for (let j = 0; j < rows; ++j) {
//       // create tile
//       const tile = new PIXI.Sprite(resources['tile'].texture);

//       // position it in 3D
//       const tx = i * tileWidth;
//       const tz = -j * tileHeight;

//       // map 3D to screen
//       const coord = iso.mapToScreen(tx, 0, tz);

//       // position on mapToScreen
//       tile.x = coord.x;
//       tile.y = coord.y;

//       // store tile
//       grid[i][j] = tile;

//       // add to screen
//       map.addChild(tile);
//     }
//   }

//   // map.y = app.renderer.height/ 2;
//   console.log(`map size ${map.width}, ${map.height}`);
//   map.x = 400;
//   map.interactive = true;

//   bind();
// }

// function bind() {
//   map.on('pointermove', (ievt) => {
//     const data = ievt.data;
//     const mouse = data.getLocalPosition(map);

//     if (lastTile !== null) {
//       lastTile.alpha = 1;
//       lastTile = null;
//     }

//     const coord = iso.mapToIsoWorld(mouse.x, mouse.y);
//     const col = Math.floor(coord.x / tileWidth);
//     const row = Math.round(Math.abs(coord.z / tileHeight));

//     if (col >= 0 && col < cols && row >= 0 && row < rows) {
//       console.log(`col=${col} row=${row}`);
//       const tile = getTile(col, row);
//       tile.alpha = .5;
//       lastTile = tile;
//     }
//   });
// }

// function getTile(col, row) {
//   return grid[col][row];
// }
import * as PIXI from 'pixi.js';
import Coordinate from './isometric/Coordinate';
import IsoUtils from './isometric/IsoUtils';
import IsoObject from './isometric/IsoObject';
import DrawIsoTile from './isometric/DrawIsoTile';
import DrawIsoBox from './isometric/DrawIsoBox';


const app = new PIXI.Application(800, 600);
const iso = document.getElementById('iso-container');
iso.appendChild(app.view);

const floor = new PIXI.Container();
floor.x = app.renderer.width / 2;
floor.y = 100;
app.stage.addChild(floor);

const world = new PIXI.Container();
world.x = app.renderer.width / 2;
world.y = 100;
app.stage.addChild(world);

// const p0 = new Coordinate(0, 0, 0);
// const p1 = new Coordinate(100, 0, 0);
// const p2 = new Coordinate(100, 0, 100);
// const p3 = new Coordinate(0, 0, 100);

// const sp0 = IsoUtils.mapToScreen(p0);
// const sp1 = IsoUtils.mapToScreen(p1);
// const sp2 = IsoUtils.mapToScreen(p2);
// const sp3 = IsoUtils.mapToScreen(p3);

// const tile = new PIXI.Graphics();
// tile.lineStyle(1, 0xffd900, 1);

// app.stage.addChild(tile);
// tile.x = app.renderer.width / 2;
// tile.y = app.renderer.height / 2;

// tile.moveTo(sp0.x, sp0.y);
// tile.lineTo(sp1.x, sp1.y);
// tile.lineTo(sp2.x, sp2.y);
// tile.lineTo(sp3.x, sp3.y);
// tile.lineTo(sp0.x, sp0.y);

for (let i = 0; i < 20; i++) {
  for (let j = 0; j < 20; j++) {
    const tile = new DrawIsoTile(20, 0x0FDA7D);
    tile.position = new Coordinate(i * 20, 0, j * 20);
    floor.addChild(tile);
  }
}

floor.interactive = true;
floor.buttonMode = true;

floor.on('pointerdown', (event)=> {
  const mouse = event.data.getLocalPosition(floor);

  const box = new DrawIsoBox(20, 0x888EF2, 20);
  const pos = IsoUtils.mapToIsoWorld(new Coordinate(mouse.x, mouse.y));
  pos.x = Math.round(pos.x / 20) * 20;
  pos.y = Math.round(pos.y / 20) * 20;
  pos.z = Math.round(pos.z / 20) * 20;
  box.position = pos;

  world.addChild(box);

  sortAllItems();
});


function sortAllItems() {
  world.children.sort((a, b) => {
    if (a.depth > b.depth) return 1;
    if (a.depth < b.depth) return -1;
  });
}


