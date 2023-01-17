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

function particle(color: number, parent: PIXI.Container) {
    const sq = new PIXI.Graphics();
    sq.beginFill(0xffffff);
    sq.drawRect(0, 0, 4, 4);
    sq.endFill();
    sq.pivot.set(2, 2);

    gsap.fromTo(sq, {pixi: {scale: 0}}, {pixi: {x: 'random(-100, 100)', y: 'random(-100, 100)', rotation: 1440, scale: 2, blur: 1}, duration: 2});
    gsap.to(sq, {pixi: {tint: color}, duration: 1});
    gsap.to(sq, {pixi: {tint: 0}, duration: 1, delay: 1});

    parent.addChild(sq);
}

function firework(x: number, y: number, color: number) {
    const container = new PIXI.Container();
    container.position.set(x, y);

    for (let i = 0; i < 100; i++) {
        particle(color, container);
    }

    gsap.to(container, {pixi: {y: 500}, duration: 2, ease: 'power2.in', onComplete: () => {container.destroy()} });

    return container;
}

const bg = new PIXI.Graphics();
bg.beginFill(0x000000);
bg.drawRect(0, 0, 800, 600);
bg.endFill();
bg.interactive = true;

bg.on('pointertap', (e) => {
    const sparkles = firework(e.globalX, e.globalY, ((Math.random() * 256 | 0) << 16) + ((Math.random() * 256 | 0) << 8) + (Math.random() * 256 | 0));
    app.stage.addChild(sparkles);
});

app.stage.addChild(bg);