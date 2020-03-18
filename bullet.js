class Bullet {
  constructor(x, y, speed, angle, size, color, life) {
    this.pos = createVector(x, y);
    this.speed = speed;
    this.angle = angle;
    this.size = size;
    this.color = color;
    this.life = life;

    this.autoDelete = true;
  }

  update() {
    this.pos.add(this.speed * cos(this.angle), this.speed * sin(this.angle));
    this.life -= 1;
  }

  show() {
    let halfSize = this.size / 2;
    if (this.pos.x < -halfSize || this.pos.y < -halfSize || this.pos.x > width + halfSize || this.pos.y > height + halfSize) {
      return;
    }
    strokeWeight(1);
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  setAngle(a) {
    this.angle = a;
  }
  getX() {
    return this.pos.x;
  }
  getY() {
    return this.pos.y;
  }
  getSize() {
    return this.size;
  }
}