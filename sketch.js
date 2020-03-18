let bm;
let pl;
let boss;
let dir2 = 0;
let fpsC = 100;
let fpsPerSec = -1;
let hitCount = 0;
let time = 0;
let score = 0;
let grazes = 0;

function setup() {
  bm = new BulletManager();
  pl = new Player(300, 650);
  boss = new Enemy(300, 100, 3000);
  createCanvas(600, 800);
  frameRate(60);
  angleMode(DEGREES);
}

function draw() {
  background(30)
  pl.update();
  boss.update();
  bm.update();
  stroke(0);
  strokeWeight(1);
  textSize(16);
  fill(color('lightgreen'));
  text('bc: ' + bm.getBulletCounter() +
    '\nfps: ' + fpsPerSec +
    '\nhits:' + hitCount +
    '\ngrazes: ' + grazes +
    '\ntime: ' + time +
    '\nscore: ' + score, 8, 20);

  fpsC += 1;
  if (fpsC > 60) {
    fpsPerSec = int(getFrameRate())
    fpsC = 0;
  }

  buls = bm.collisionWith(pl.getX(), pl.getY(), 2);
  if (buls.length > 0) {
    hitCount += buls.length;
    bm.delete(buls);
  }

  if (boss.hp > 0) {
    time += 1;
  }
  grazes += bm.collisionWith(pl.getX(), pl.getY(), 32).length;
  score = 100000 - (hitCount * 1000) - (time*10) - (time > 4800 ? (time-4800)*7 : 0 ) + (grazes * 10);
}