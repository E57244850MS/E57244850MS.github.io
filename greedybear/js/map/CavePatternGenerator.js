define(["require", "exports", "./PatternHelper"], function (require, exports, PatternHelper) {
    "use strict";
    var CELL_TYPE;
    (function (CELL_TYPE) {
        CELL_TYPE[CELL_TYPE["WALL"] = 1] = "WALL";
        CELL_TYPE[CELL_TYPE["ROAD"] = 0] = "ROAD";
    })(CELL_TYPE || (CELL_TYPE = {}));
    ;
    // const DEFAULT_OPTIONS = {
    //   n: 100,
    //   m: 100,
    //   wallChance: .4,
    //   stepCount: 2,
    //   birthLimit: 4,
    //   deathLimit: 3,
    // };
    class CavePatternGenerator {
        static generateCavePattern(options) {
            const nextReal = window.nextReal;
            let pattern = PatternHelper.createFilled(options.n, options.m, CELL_TYPE.ROAD);
            PatternHelper.fillUniform(pattern, options.wallChance, nextReal, CELL_TYPE.WALL);
            for (let i = 0; i < options.stepCount; i++) {
                pattern = CavePatternGenerator.applyCAStep(pattern, options.birthLimit, options.deathLimit);
            }
            return pattern;
        }
        // Cellular Automaton Step
        static applyCAStep(pattern, birthLimit, deathLimit) {
            if (!pattern || !pattern.length || !pattern[0] || !pattern[0].length) {
                return null;
            }
            let n = pattern.length;
            let m = pattern[0].length;
            let neighbourCount = 0;
            let nextStepPattern = PatternHelper.createFilled(n, m, 0);
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < m; j++) {
                    neighbourCount = PatternHelper.countNotEmptyNeighbours(pattern, i, j);
                    if (pattern[i][j] === CELL_TYPE.WALL) {
                        if (neighbourCount < deathLimit) {
                            nextStepPattern[i][j] = CELL_TYPE.ROAD;
                        }
                        else {
                            nextStepPattern[i][j] = CELL_TYPE.WALL;
                        }
                    }
                    else {
                        if (neighbourCount > birthLimit) {
                            nextStepPattern[i][j] = CELL_TYPE.WALL;
                        }
                        else {
                            nextStepPattern[i][j] = CELL_TYPE.ROAD;
                        }
                    }
                }
            }
            return nextStepPattern;
        }
    }
    return CavePatternGenerator;
});
