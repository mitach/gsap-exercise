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

document.body.appendChild(app.view as HTMLCanvasElement);

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

app.stage.addChild(grid);

const sq1 = new PIXI.Graphics();
sq1.beginFill(0xffffff);
sq1.drawRect(0, 0, 100, 100);
sq1.endFill();
sq1.pivot.set(50, 50);
sq1.position.set(100, 300);
sq1.interactive = true;

const sq2 = new PIXI.Graphics();
sq2.beginFill(0xffffff);
sq2.drawRect(0, 0, 100, 100);
sq2.endFill();
sq2.pivot.set(50, 50);
sq2.position.set(300, 300);
sq2.interactive = true;

const sq3 = new PIXI.Graphics();
sq3.beginFill(0xffffff);
sq3.drawRect(0, 0, 100, 100);
sq3.endFill();
sq3.pivot.set(50, 50);
sq3.position.set(500, 300);
sq3.interactive = true;

const sq4 = new PIXI.Graphics();
sq4.beginFill(0xffffff);
sq4.drawRect(0, 0, 100, 100);
sq4.endFill();
sq4.pivot.set(50, 50);
sq4.position.set(700, 300);
sq4.interactive = true;

const sq1Tween = gsap.to(sq1, {pixi: {rotation: 360, blur: 10, skewX: 50, tint: 0xff0000}, duration: 1, paused: true});
const sq2Tween = gsap.to(sq2, {pixi: {rotation: 360, blur: 10, skewX: 50, tint: 0xff0000}, duration: 1, paused: true});
const sq3Tween = gsap.to(sq3, {pixi: {rotation: 360, blur: 10, skewX: 50, tint: 0xff0000}, duration: 1, paused: true});
const sq4Tween = gsap.to(sq4, {pixi: {rotation: 360, blur: 10, skewX: 50, tint: 0xff0000}, duration: 1, paused: true});

sq1.on('pointertap', () => {
    if (sq1Tween.progress() == 0) {
        sq1Tween.play();
    } else if (sq1Tween.progress() == 1) {
        sq1Tween.reverse();
    }
});

sq2.on('pointertap', () => {
    if (sq2Tween.progress() == 0) {
        sq2Tween.play();
    } else if (sq2Tween.progress() == 1) {
        sq2Tween.reverse();
    }
});

sq3.on('pointertap', () => {
    if (sq3Tween.progress() == 0) {
        sq3Tween.play();
    } else if (sq3Tween.progress() == 1) {
        sq3Tween.reverse();
    }
});

sq4.on('pointertap', () => {
    if (sq4Tween.progress() == 0) {
        sq4Tween.play();
    } else if (sq4Tween.progress() == 1) {
        sq4Tween.reverse();
    }
})

app.stage.addChild(sq1, sq2, sq3, sq4);