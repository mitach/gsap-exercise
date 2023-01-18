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

async function loadAssets() {
    const gear12Asset = await PIXI.Assets.load('assets/gear12.png');
    const gear12 = PIXI.Sprite.from(gear12Asset);

    const gear16Asset = await PIXI.Assets.load('assets/gear16.png');
    const gear16 = PIXI.Sprite.from(gear16Asset);
    
    const gear20Asset = await PIXI.Assets.load('assets/gear20.png');
    const gear20 = PIXI.Sprite.from(gear20Asset);

    const gear24Asset = await PIXI.Assets.load('assets/gear24.png');
    const gear24 = PIXI.Sprite.from(gear24Asset);

    const gear28Asset = await PIXI.Assets.load('assets/gear28.png');
    const gear28 = PIXI.Sprite.from(gear28Asset);

    const gear40Asset = await PIXI.Assets.load('assets/gear40.png');
    const gear40 = PIXI.Sprite.from(gear40Asset);

    const gearboxAsset = await PIXI.Assets.load('assets/gearbox.png');
    const gearbox = PIXI.Sprite.from(gearboxAsset);

    const pauseAsset = await PIXI.Assets.load('assets/speed-paused.png');
    const pause = PIXI.Sprite.from(pauseAsset);

    const playAsset = await PIXI.Assets.load('assets/speed-normal.png');
    const play = PIXI.Sprite.from(playAsset);

    const fastAsset = await PIXI.Assets.load('assets/speed-fast.png');
    const fast = PIXI.Sprite.from(fastAsset);

    const fasterAsset = await PIXI.Assets.load('assets/speed-faster.png');
    const faster = PIXI.Sprite.from(fasterAsset);

    return {gears: [gear12, gear16, gear20, gear24, gear28, gear40], opt: [gearbox, pause, play, fast, faster]};
}


loadAssets()
    .then((data) => {
        const [gear12Tween, gear16Tween, gear20Tween, gear24Tween, gear28Tween, gear40Tween] = spawnGears(data.gears);
        const [gearbox, pause, play, fast, faster] = data.opt;

        gearbox.position.set(400, 300);
        gearbox.anchor.set(0.5);

        pause.position.set(326, 285);
        pause.interactive = true;

        pause.on('pointertap', () => {
            gear12Tween.pause();
            gear16Tween.pause();
            gear20Tween.pause();
            gear24Tween.pause();
            gear28Tween.pause();
            gear40Tween.pause();
        });

        play.position.set(365, 285);
        play.interactive = true;

        play.on('pointertap', () => {
            gear12Tween.play(); gear12Tween.timeScale(1);
            gear16Tween.play(); gear16Tween.timeScale(1);
            gear20Tween.play(); gear20Tween.timeScale(1);
            gear24Tween.play(); gear24Tween.timeScale(1);
            gear28Tween.play(); gear28Tween.timeScale(1);
            gear40Tween.play(); gear40Tween.timeScale(1);
        });

        fast.position.set(402, 285);
        fast.interactive = true;

        fast.on('pointertap', () => {
            gear12Tween.play(); gear12Tween.timeScale(2);
            gear16Tween.play(); gear16Tween.timeScale(2);
            gear20Tween.play(); gear20Tween.timeScale(2);
            gear24Tween.play(); gear24Tween.timeScale(2);
            gear28Tween.play(); gear28Tween.timeScale(2);
            gear40Tween.play(); gear40Tween.timeScale(2);
        });

        faster.position.set(440, 285);
        faster.interactive = true;

        faster.on('pointertap', () => {
            gear12Tween.play(); gear12Tween.timeScale(3);
            gear16Tween.play(); gear16Tween.timeScale(3);
            gear20Tween.play(); gear20Tween.timeScale(3);
            gear24Tween.play(); gear24Tween.timeScale(3);
            gear28Tween.play(); gear28Tween.timeScale(3);
            gear40Tween.play(); gear40Tween.timeScale(3);
        });

        app.stage.addChild(gearbox, pause, play, fast, faster);
    })
    .catch(err => console.log(err));


function spawnGears(sprites: PIXI.Sprite[]) {
    const [gear12, gear16, gear20, gear24, gear28, gear40] = sprites;
    gear12.position.set(300, 117);
    gear12.anchor.set(0.5);
    const gear12Tween = gsap.to(gear12, {pixi: {rotation: -360}, duration: 6, repeat: -1, ease: 'linear'});

    gear16.position.set(542, 471);
    gear16.anchor.set(0.5);
    const gear16Tween = gsap.to(gear16, {pixi: {rotation: -360}, duration: 8, repeat: -1, ease: 'linear'});

    gear20.position.set(212, 441);
    gear20.anchor.set(0.5);
    const gear20Tween = gsap.to(gear20, {pixi: {rotation: -360}, duration: 10, repeat: -1, ease: 'linear'});

    gear24.position.set(676, 388);
    gear24.anchor.set(0.5);
    const gear24Tween = gsap.to(gear24, {pixi: {rotation: 360}, duration: 12, repeat: -1, ease: 'linear'});

    gear28.position.set(142, 130);
    gear28.anchor.set(0.5);
    const gear28Tween = gsap.to(gear28, {pixi: {rotation: 360}, duration: 14, repeat: -1, ease: 'linear'});

    gear40.position.set(400, 300);
    gear40.anchor.set(0.5);
    const gear40Tween = gsap.to(gear40, {pixi: {rotation: 360}, duration: 20, repeat: -1, ease: 'linear'});

    app.stage.addChild(gear12, gear16, gear20, gear24, gear28, gear40);

    return [gear12Tween, gear16Tween, gear20Tween, gear24Tween, gear28Tween, gear40Tween];
}