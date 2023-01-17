import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

const app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x999999
});

const grid = new PIXI.Graphics();
grid.lineStyle({ color: 0xffffff, width: 1, alpha: 0.2 });

for (let x = 0; x < 800; x += 50) {
    if ((x - 50) % 200 == 0) {
        grid.line.alpha = 0.5;
    } else {
        grid.line.alpha = 0.2;
    }
    grid.moveTo(x, 0);
    grid.lineTo(x, 600);
}
for (let y = 0; y < 600; y += 50) {
    if ((y - 50) % 200 == 0) {
        grid.line.alpha = 0.5;
    } else {
        grid.line.alpha = 0.2;
    }
    grid.moveTo(0, y);
    grid.lineTo(800, y);
}

app.stage.addChild(grid)

document.body.appendChild(app.view as HTMLCanvasElement);

const circle = new PIXI.Graphics();
circle.beginFill(0x000000);
circle.drawCircle(100, 100, 50);
circle.endFill();
circle.pivot.set(100, 100);
circle.position.set(100, 100);

gsap.to(circle, {pixi: {x: 700}, duration: 2, delay: 1});
gsap.to(circle, {pixi: {scale: 1.5}, duration: 1, delay: 1});
gsap.to(circle, {pixi: {scale: 1}, duration: 1, delay: 2});

const circle2 = new PIXI.Graphics();
circle2.beginFill(0x000000);
circle2.drawCircle(100, 100, 50);
circle2.endFill();
circle2.pivot.set(100, 100);
circle2.position.set(100, 300);

gsap.to(circle2, {pixi: {x: 700}, ease: 'linear', duration: 2, delay: 1});
gsap.to(circle2, {pixi: {scale: 1.5}, ease: 'elastic.out', duration: 1, delay: 1});
gsap.to(circle2, {pixi: {scale: 1}, ease: 'elastic.in', duration: 1, delay: 2});

const circle3 = new PIXI.Graphics();
circle3.beginFill(0x000000);
circle3.drawCircle(100, 100, 50);
circle3.endFill();
circle3.pivot.set(100, 100);
circle3.position.set(100, 500);

gsap.to(circle3, {pixi: {x: 700}, ease: 'sine.inOut', duration: 2, delay: 1});
gsap.to(circle3, {pixi: {scale: 1.5}, ease: 'bounce.out', duration: 1, delay: 1});
gsap.to(circle3, {pixi: {scale: 1}, ease: 'bounce.in', duration: 1, delay: 2});

app.stage.addChild(circle, circle2, circle3);