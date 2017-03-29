import Coordinate from './Coordinate';

const Y_CORRECT = Math.cos(-Math.PI / 6) * Math.SQRT2;

export default class IsoUtils {
  static get Y_CORRECT() {
     return Y_CORRECT;
  }
  static mapToScreen(coord){
    const screenX = coord.x - coord.z;
    const screenY = coord.y * Y_CORRECT + (coord.x + coord.z) * .5;
    return new Coordinate(screenX, screenY);
  }

  static mapToIsoWorld(coord){
    const xpos = coord.y + coord.x * 0.5;
    const ypos = 0;
    const zpos = coord.y - coord.x * 0.5;
    return new Coordinate(xpos, ypos, zpos);
  }
}
