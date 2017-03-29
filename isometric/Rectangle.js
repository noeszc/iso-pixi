import Coordinate from './Coordinate';

export default class Rectangle {
  constructor(x = 0, y = 0, width = 0, height = 0){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  get left(){
    return this.x;
  }
  set left(value) {
    this.width = this.width + (this.x - value);
    this.x = value;
  }

  get right() {
    return this.x + this.width;
  }
  set right(value) {
    this.width = value - this.x;
  }

  get top() {
    return this.y;
  }
  set top(value) {
    this.height = this.height + (this.y - value);
    this.y = value;
  }

  get bottom() {
    return this.y + this.height;
  }
  set bottom(value) {
    this.height = value - this.y;
  }

  get topLeft(){
    return new Coordinate(this.x, this.y);
  }
  set topLeft(value){
    this.width = this.width + (this.x - value.x);
    this.height = this.height + (this.y - value.y);
    this.x = value.x;
    this.y = value.y;
  }

  get bottomRight(){
    new Coordinate(this.right, this.bottom);
  }
  set bottomRight(value){
    this.width = value.x - this.x;
    this.height = value.y - this.y;
  }

  get size(){
    return new Coordinate(this.width, this.height);
  }
  set size(value) {
    this.width = value.x;
    this.height = value.y;
  }

  clone(){
    return new Rectangle(this.x, this.y, this.width, this.height);
  }

  isEmpty(){
    return this.width <= 0 || this.height <= 0;
  }
  setEmpty(){
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
  }

  inflate(dx, dy){
    this.x = this.x - dx;
    this.width = this.width + 2 * dx;
    this.y = this.y - dy;
    this.height = this.height + 2 * dy;
  }

  inflatePoint(point){
    this.x = this.x - point.x;
    this.width = this.width + 2 * point.x;
    this.y = this.y - point.y;
    this.height = this.height + 2 * point.y;
  }

  offset(dx, dy){
    this.x = this.x + dx;
    this.y = this.y + dy;
  }

  offsetPoint(point) {
    this.x = this.x + point.x;
    this.y = this.y + point.y;
  }

  contains(x, y){
    return x >= this.x && x < this.x + this.width && y >= this.y && y < this.y + this.height;
  }

  containsPoint(point){
    return point.x >= this.x && point.x < this.x + this.width && point.y >= this.y && point.y < this.y + this.height;
  }

  containsRect(rect) {
    let r1 = rect.x + rect.width;
    let b1 = rect.y + rect.height;
    let r2 = this.x + this.width;
    let b2 = this.y + this.height;
    return rect.x >= this.x && rect.x < r2 && rect.y >= this.y && rect.y < b2 && r1 > this.x && r1 <= r2 && b1 > this.y && b1 <= b2;
  }

  intersection(toIntersect) {
    let result = new Rectangle();
    if (this.isEmpty() || toIntersect.isEmpty()) {
      result.setEmpty();
      return result;
    }
    result.x = Math.max(this.x, toIntersect.x);
    result.y = Math.max(this.y, toIntersect.y);
    result.width = Math.min(this.x + this.width, toIntersect.x + toIntersect.width) - result.x;
    result.height = Math.min(this.y + this.height, toIntersect.y + toIntersect.height) - result.y;
    if (result.width <= 0 || result.height <= 0) {
      result.setEmpty();
    }
    return result;
  }

  intersects(toIntersect){
    if (this.isEmpty() || toIntersect.isEmpty()) {
      return false;
    }
    let resultx = Math.max(this.x, toIntersect.x);
    let resulty = Math.max(this.y, toIntersect.y);
    let resultwidth = Math.min(this.x + this.width, toIntersect.x + toIntersect.width) - resultx;
    let resultheight = Math.min(this.y + this.height, toIntersect.y + toIntersect.height) - resulty;
    if (resultwidth <= 0 || resultheight <= 0) {
      return false;
    }
    return true;
  }

  union(toUnion){
    let r = null;
    if (this.isEmpty()) {
      return toUnion.clone();
    }
    if (toUnion.isEmpty()) {
      return this.clone();
    }
    r = new Rectangle();
    r.x = Math.min(this.x, toUnion.x);
    r.y = Math.min(this.y, toUnion.y);
    r.width = Math.max(this.x + this.width, toUnion.x + toUnion.width) - r.x;
    r.height = Math.max(this.y + this.height, toUnion.y + toUnion.height) - r.y;
    return r;
  }

  equals(toCompare){
    return toCompare.x == this.x && toCompare.y == this.y && toCompare.width == this.width && toCompare.height == this.height;
  }

  toString(){
    return `(x= ${this.x}, y= ${this.y}, w= ${this.width}, h= ${this.height})`;
  }

  copyFrom(sourceRect){
    this.x = sourceRect.x;
    this.y = sourceRect.y;
    this.width = sourceRect.width;
    this.height = sourceRect.height;
  }
  setTo(xa, ya, widtha, heighta){
    his.x = xa;
    this.y = ya;
    this.width = widtha;
    this.height = heighta;
  }
}
