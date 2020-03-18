class Enemy {
  constructor(x, y, hp) {
    this.x = x;
    this.y = y;
    this.hp = hp;
    this.counter = 0;
    this.counter2 = 0;
    this.dir = 0;
    this.objs1 = [];
    this.objs2 = [];
    this.objs3 = [];
    this.seg = 0;
    this.oldseg = 0;

    this.hei = 0;
  }


  update() {
    if (this.hp > 0) {
      this.mainloop();
      this.show();
      this.hitCheck();
    }
  }

  show() {
    strokeWeight(2);
    fill(color('pink'));
    circle(this.x, this.y, 100);
    
    
    strokeWeight(0);
    fill(color('white'));
    let slide = map(this.hp,0,3000,0,width-120);
    rect(60,10,slide,10);
    
    strokeWeight(2);
    stroke(color('gray'));
    fill(0,0);
    rect(60,10,width-120,10);
    stroke(color('black'));
  }

  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }

  mainloop() {
    this.counter++;
    if (this.hp > 2000) {
      this.segment1();
      this.seg = 1;
    } else if (this.hp > 1000) {
      this.segment2();
      this.seg = 2;
    } else {
      this.segment3();
      this.seg = 3;
    }
    if (this.oldseg != this.seg) {
      bm.clean();
      this.counter = 0;
      this.counter2 = 0;
    }
    this.oldseg = this.seg;


  }

  segment1() {
    if (this.counter % 60 == 0) {
      this.movement();
    }
    if (this.counter % 30 == 0) {
      hawkBullet(this.x, this.y, 4, this.angleToPl());
      let dir = random(0, 20);
      for (let i = 0; i < 20; i++) {
        bm.createBullet(this.x, this.y, 5, dir + i * 18, 16, color('white'), 1000)
      }
    }
  }
  segment2() {
    if (this.counter % 5 == 0) {
      this.counter2 += 1;
      if (this.counter2 >= 5 && this.counter2 < 8) {
        for (let i = 0; i < 20; i++) {
          bm.createBullet(this.x, this.y, 5, this.dir + i * 18, 16, color('white'), 1000)
        }
      } else if (this.counter2 == 8) {
        this.counter2 = 0;
        this.dir = random(0, 20);
      }
    }

    if (this.counter % 120 == 0) {
      splitBullet(this.x, this.y, this.angleToPl());
      this.movement();
    }
  }
  segment3() {
    interactBulletAct(this.objs1, this.objs2);
    interactBulletAct(this.objs1, this.objs3);
    this.bombBullet(this.objs2);

    if (this.counter % 10 == 0) {
      this.counter2 += 1;
      if (this.counter2 > 20 && this.counter2 < 30) {
        this.hei += random(40, 60);
        interactBullet1(this.objs1, this.hei);
      } else if (this.counter2 > 40) {
        this.counter2 = 20;
        this.hei = 50;
      }
    }

    if (this.counter % 45 == 0) {
      interactBullet2(this.x, this.y , random(45,135), 64, this.objs2);
    }

    if (this.counter % 120 == 0) {
      this.movement();
    }

  }
  async movement() {
    let tarX = random(50, width - 50);
    let tarY = random(50, 300);
    let speed = 5;
    let ang = atan2(tarY - this.y, tarX - this.x);
    let dis = dist(tarX, tarY, this.x, this.y);
    while (dis > 0) {
      this.x += speed * cos(ang);
      this.y += speed * sin(ang);
      dis = dis - speed;
      await sleep(1);
    }
  }

  angleToPl() {
    return atan2(pl.getY() - this.y, pl.getX() - this.x);
  }

  hitCheck() {
    let buls = pl.bm.collisionWith(this.x, this.y, 100);
    if (buls.length > 0) {
      this.hp -= pl.damage;
      pl.bm.delete(buls);
    }
  }

  bombBullet(objs) {
    for (let i = 0; i < objs.length; i++) {
      if (objs[i].getY() > height) {
        for (let j = 0; j < 6; j++) {
          interactBullet2(objs[i].getX(), objs[i].getY(),random(162,208) + j * 36, 32 , this.objs3);
        }
        objs.splice(i,1);
        i-=1;
        bm.delete(bm.getID(objs[i]));
      }
    }
  }

}