import * as PIXI from 'pixi.js';
import Coordinate from './isometric/Coordinate';
import IsoUtils from './isometric/IsoUtils';
import IsoObject from './isometric/IsoObject';
import DrawIsoTile from './isometric/DrawIsoTile';
import DrawIsoBox from './isometric/DrawIsoBox';

const app = new PIXI.Application(800, 600, { antialias: true, transparent: true });
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

for (let i = 0; i < 20; i++) {
  for (let j = 0; j < 20; j++) {
    const tile = new DrawIsoTile(20, 0xCCCCCC);
    tile.position = new Coordinate(i * 20, 0, j * 20);
    floor.addChild(tile);
  }
}

const gravity = 2;
const friction = 0.95;
const bounce = -0.9;

const box = new DrawIsoBox(20, 0x01CEC2,20);
box.x = 200;
box.y = 200;
world.addChild(box);

const shadow = new DrawIsoTile(20, 0);
shadow.alpha = 0.5;
world.addChild(shadow);

const filter = new PIXI.filters.BlurFilter();
shadow.filters = [filter];
sortAllItems();

floor.interactive = true;
floor.buttonMode = true;

app.ticker.add(()=> {
  box.vy += 2;
  box.x += box.vx;
  box.y += box.vy;
  box.z += box.vz;
  if (box.x > 380) {
    box.x = 380;
    box.vx *= -.8;
  }
  else if (box.x < 0) {
    box.x = 0;
    box.vx *= bounce;
  }
  if (box.z > 380) {
    box.z = 380;
    box.vz *= bounce;
  }
  else if (box.z < 0) {
    box.z = 0;
    box.vz *= bounce;
  }
  if (box.y > 0) {
    box.y = 0;
    box.vy *= bounce;
  }
  box.vx *= friction;
  box.vy *= friction;
  box.vz *= friction;

  shadow.x = box.x;
  shadow.z = box.z;
  filter.blurX = filter.blurY = -box.y * .25;

  sortAllItems();
});

floor.on('pointerdown', (event)=> {
  box.vx = Math.random() * 20 - 10;
  box.vy = -Math.random() * 40;
  box.vz = Math.random() * 20 - 10;
});

function sortAllItems() {
  world.children.sort((a, b) => {
    if (a.depth > b.depth) return 1;
    if (a.depth < b.depth) return -1;
  });
}


function canMove(obj) {
  const rect = obj.rect;
  rect.offset(obj.vx, obj.vz);
  for (let i = 0; i < world.children.length; i++) {
    const objB = world.children[i];
    if (obj !== objB && objB.walkable && rect.intersects(objB.rect)) {
      return false;
    }
  }
  return true;
}

