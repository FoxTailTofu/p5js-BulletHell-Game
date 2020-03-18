class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.bm = new BulletManager();
    this.counter = 0;
    this.damage = 3;
  }

  update() {
    this.control();
    this.show();
    this.bm.update();
  }

  show() {
    strokeWeight(1);
    fill(color('pink'));
    circle(this.x, this.y, 20);
    fill(color('red'));
    circle(this.x, this.y, 5);
  }

  control() {
    if (keyIsDown(SHIFT)) {
      this.speed = 2.5;
    } else {
      this.speed = 5;
    }

    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }

    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }

    if (keyIsDown(UP_ARROW)) {
      this.y -= this.speed;
    }

    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.speed;
    }

    if (keyIsDown(90)) {
      this.counter += 1;
      this.shoot();
      this.traceShot(0);
      this.traceShot(180);
    }
  }

  shoot() {
    if (this.counter % 3 == 0) {
      this.bm.createBullet(this.x, this.y - 10, 20, -90, 16, color('gray'), 100);
    }
  }
  async traceShot(ang) {
    if (this.counter % 10 == 0) {
      let time = 105;
      let obj = this.bm.createBullet(this.x + 10 * cos(ang), this.y + 10, 10, ang, 16, color('Azure'), 100);
      while (time > 0) {
        await sleep(1);
        if (time < 100) {
          let angToPl = atan2(boss.getY() - obj.getY(), boss.getX() - obj.getX());
          obj.angle = angToPl;
        }
        time -= 1;
      }
    }
  }

  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
}