

function sleep(time = 0) {
  return new Promise(r => setTimeout(r, time * deltaTime));
}

async function hawkBullet(x,y, spd, dir) {
  bm.createBullet(x, y, spd, dir, 32, color('aqua'), 1000);
  await sleep(5);
  bm.createBullet(x, y, spd, dir + 5, 16, color('aqua'), 1000);
  bm.createBullet(x, y, spd, dir - 5, 16, color('aqua'), 1000);
  await sleep(5);
  bm.createBullet(x, y, spd, dir + 10, 8, color('aqua'), 1000);
  bm.createBullet(x, y, spd, dir - 10, 8, color('aqua'), 1000);
}

async function traceBullet(x,y,spd, time) {
  let obj = bm.createBullet(x, y, spd, 0, 32, color('blue'), 1000);
  while (time > 0) {
    await sleep(1);
    let angToPl = atan2(pl.getY() - obj.getY(), pl.getX() - obj.getX());
    obj.angle = angToPl;
    time -= 1;
  }
}

async function splitBullet(x,y,dir) {
  let objs = [];
  let objsSize = 0;
  let oldSize = 0;
  //init bullet
  objs.push(bm.createBullet(x, y, 3, dir, 64, color('lightgreen'), 1000));

  //split bullet 1
  await sleep(30);
  oldSize = objsSize;
  objsSize = objs.length;
  for (let i = 0; i < objsSize; i++) {
    if (bm.getID(objs[i]) == -1) {
      continue;
    }
    for (let j = 0; j < 10; j++) {
      objs.push(bm.createBullet(objs[i].getX(), objs[i].getY(), 3, j * 36, 32, color('lightgreen'), 1000));
    }
    bm.delete(bm.getID(objs[i]));
  }

  //split bullet 2 
  await sleep(30);
  oldSize = objsSize;
  objsSize = objs.length;
  for (let i = oldSize; i < objsSize; i++) {
    if (bm.getID(objs[i]) == -1) {
      continue;
    }
    for (let j = 0; j < 5; j++) {
      objs.push(bm.createBullet(objs[i].getX(), objs[i].getY(), 3, random(0, 360), 18, color('lightgreen'), 1000));
    }
    bm.delete(bm.getID(objs[i]));
  }

  //target player
  await sleep(30);
  oldSize = objsSize;
  objsSize = objs.length;
  for (let i = oldSize; i < objsSize; i++) {
    if (bm.getID(objs[i]) == -1) {
      continue;
    }
    let angToPl = atan2(pl.getY() - objs[i].getY(), pl.getX() - objs[i].getX());
    objs[i].angle = angToPl;
    objs[i].color = color('yellow');
    objs[i].speed = 1;
  }
  await sleep(30);
  for (let i = oldSize; i < objsSize; i++) {
    if (bm.getID(objs[i]) == -1) {
      continue;
    }
    objs[i].speed = random(5, 12);
  }
}

async function interactBullet1(objs1, hei) {
  for (let i = random(-15, 15); i <= width; i += 30) {
    objs1.push(bm.createBullet(i, hei, 0, 0, 20, color('green'), 480));
    await sleep(1);
  }
}

function interactBullet2(x,y,ang,size,objs2) {
  objs2.push(bm.createBullet(x, y, 5, ang, size, color('lightgreen'), 480));
}

function interactBulletAct(objs1, objs2) {
  let dists = 0;
  for (let i = 0; i < objs2.length; i++) {
    if (bm.getID(objs2[i]) == -1) {
      objs2.splice(i,1);
      i=i-1;
      continue;
    }
    for (let j = 0; j < objs1.length; j++) {
      dists = dist(objs1[j].getX(), objs1[j].getY(), objs2[i].getX(), objs2[i].getY());
      if (dists < (objs1[j].size + objs2[i].size) / 2) {
        ang = atan2(objs1[j].getY() - objs2[i].getY(), objs1[j].getX() - objs2[i].getX());
        objs1[j].speed = 3;
        objs1[j].angle = ang + random(-20, 20);
        objs1[j].color = color('Aquamarine');
        objs1.splice(j, 1);
        j=j-1;
      }
    }
  }

}