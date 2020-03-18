class BulletManager {
  constructor() {
    this.bullets = [];
  }

  update() {
    for (let i = 0; i < this.bullets.length; i++) {
      this.bullets[i].update();
      if (this.bullets[i].autoDelete && this.isOutOfCanvas(this.bullets[i])) {
        this.bullets.splice(i, 1);
        i = i - 1;
        continue;
      }
      if (this.bullets[i].life <= 0) {
        this.bullets.splice(i, 1);
        i = i - 1;
        continue;
      }
      this.bullets[i].show();
    }
  }

  createBullet(x, y, speed, angle, size, color, life) {
    var temp = new Bullet(x, y, speed, angle, size, color, life);
    this.bullets.push(temp);
    return temp;
  }

  getBulletCounter() {
    return this.bullets.length;
  }

  collisionWith(x, y, size = 0) {
    let colArray = [];
    for (let i = 0; i < this.bullets.length; i++) {
      if (dist(this.bullets[i].getX(), this.bullets[i].getY(), x, y) < (this.bullets[i].getSize() + size) / 2) {
        colArray.push(i);
      }
    }
    return colArray;
  }

  clean() {
    this.bullets = [];
  }

  delete(bulletIDs) {
    if (typeof bulletIDs == "number") {
      this.bullets.splice(bulletIDs, 1);
      return;
    }
    bulletIDs.sort();
    let count = 0;
    for (let i = 0; i < bulletIDs.length; i++) {
      this.bullets.splice(bulletIDs[i] - count, 1);
      count += 1;
    }
  }

  getID(bullet) {
    let findID = -1;
    for (let i = 0; i < this.bullets.length; i++) {
      if (bullet == this.bullets[i]) {
        findID = i;
        break;
      }
    }
    return findID;
  }

  isOutOfCanvas(bul) {
    let halfSize = bul.size / 2;
    if (bul.getX() < -halfSize || bul.getY() < -halfSize ||
      bul.getX() > width + halfSize || bul.getY() > height + halfSize) {
      return true;
    }
    return false;
  }
}