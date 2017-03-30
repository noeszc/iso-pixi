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

const speed = 4;

const box = new DrawIsoBox(20, 0x01CEC2,20);
box.x = 200;
box.z = 200;
world.addChild(box);

const newBox = new DrawIsoBox(20, 0xcccccc, 20);
newBox.x = 300;
newBox.z = 300;
world.addChild(newBox);

const gameLoop = () => {
  if (canMove(box)) {
    box.x += box.vx;
    box.y += box.vy;
    box.z += box.vz;
  }
  sortAllItems();
}
const onkeydown = (e)=> {
  switch (e.keyCode) {
    case 38:
      box.vx = -speed;
      break;
    case 40:
      box.vx = speed;
      break;
    case 37:
      box.vz = speed;
      break;
    case 39:
      box.vz = -speed;
      break;

    default:
      break;
  }
  app.ticker.start();
}
const onkeyUp = (e) => {
  box.vx = 0;
  box.vz = 0;
  app.stop();
  app.ticker.stop();
}


document.addEventListener('keydown', onkeydown);
document.addEventListener('keyup', onkeyUp);

app.ticker.add(gameLoop);

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
    if (obj != objB && !objB.walkable && rect.intersects(objB.rect)) {
      return false;
    }
  }
  return true;
}



