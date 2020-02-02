/// <reference path="../typings/interfaces.d.ts"/>
define(["require", "exports", "./utils/Randomizer", "./map/Playground", "./game/GameOptionsGenerator", "./game/GameData", "./game/GamePlay", "./render/Renderer"], function (require, exports, Randomizer, Playground, GameOptionsGenerator, GameData, GamePlay, Renderer) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function generateNewMap() {
        let seed = (Math.round(Math.random() * 1000000000)).toString(36).toUpperCase();
        window.location.hash = seed;
    }
    // PREPARE RANDOMIZER (#)
    window.onhashchange = () => {
        window.location.reload();
    };
    let hash = window.location.hash.replace(/#/g, '');
    let seed = parseInt(hash, 36);
    if (isNaN(seed)) {
        generateNewMap();
    }
    window.nextReal = Randomizer.generateNextRealFunction(seed);
    let first = document.querySelector('[firstScreen]');
    let newMapButton = first.querySelector('[newMapButton]');
    let playButton = first.querySelector('[playButton]');
    newMapButton.addEventListener('click', () => {
        first.parentNode.removeChild(first);
        generateNewMap();
    });
    playButton.addEventListener('click', () => {
        first.parentNode.removeChild(first);
        gameplay.start((scores, isSuccess) => {
            alert(isSuccess ? `You Win!\nYour scores: ${scores}` : `Game Over\nYour scores: ${scores}`);
            window.location.reload();
        });
    });
    // NEW GAME
    let gameOptions = GameOptionsGenerator.generate();
    // 1. create 2d+ playground
    let playground = new Playground(gameOptions);
    // 2. render environment with surface (ground)
    let renderer = new Renderer(playground);
    // 3. recalculate Y positions (from real surface mesh)
    playground.updateElevationMap(renderer.surface);
    let gameData = new GameData(gameOptions, playground);
    gameData.generateThings();
    let gameplay = new GamePlay(gameData, renderer);
});
