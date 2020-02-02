/// <reference path="../../typings/interfaces.d.ts"/>
define(["require", "exports"], function (require, exports) {
    "use strict";
    // use vendors - https://github.com/ckknight/random-js
    class Randomizer {
        constructor() { }
        static generateNextIntFunction(min, max, seed) {
            let randomEngine = Random.engines.mt19937().seed(seed);
            let distribution = Random.integer(min, max);
            return () => (distribution(randomEngine));
        }
        static generateNextRealFunction(seed) {
            let randomEngine = Random.engines.mt19937().seed(seed);
            let distribution = Random.real(0, 1, false);
            return () => (distribution(randomEngine));
        }
    }
    ;
    return Randomizer;
});
