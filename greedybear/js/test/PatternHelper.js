/// <reference path="../../typings/Interfaces.d.ts" />
define(["require", "exports", "../utils/Randomizer", "../map/CavePatternGenerator", "../map/PatternHelper"], function (require, exports, Randomizer, CavePatternGenerator, PatternHelper) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe("PatternHelper", function () {
        const GENERATOR_OPTIONS = {
            n: 32,
            m: 32,
            wallChance: .4,
            stepCount: 2,
            nextReal: Randomizer.generateNextRealFunction(13),
            birthLimit: 4,
            deathLimit: 3,
        };
        // test pattern
        // test pattern should be generated once because of seeded randomizer
        let initialPattern = PatternHelper.createFilled(GENERATOR_OPTIONS.n, GENERATOR_OPTIONS.m, 0);
        PatternHelper.fillUniform(initialPattern, .4, GENERATOR_OPTIONS.nextReal, 1);
        for (let i = 0; i < 2; i++) {
            initialPattern = CavePatternGenerator.applyCAStep(initialPattern, GENERATOR_OPTIONS.birthLimit, GENERATOR_OPTIONS.deathLimit);
        }
        let pattern = null;
        beforeEach(function () {
            pattern = PatternHelper.clone(initialPattern);
        });
        it("clones", function () {
            let dummyPattern = [[0, 0, 0], [1, 2, 3], [4, 5, 6], [1, 2, 1]];
            let clonePattern = PatternHelper.clone(dummyPattern);
            assert.deepEqual(dummyPattern, clonePattern, 'pattern are equal');
            assert.notEqual(dummyPattern[0], clonePattern[0], 'arrays are different objects');
        });
        it("stringify and parse", function () {
            let dummyPattern = [[0, 0, 0], [1, 2, 3], [4, 5, 6], [1, 2, 1]];
            let patternText = PatternHelper.stringify(dummyPattern);
            let parsedPattern = PatternHelper.parse(PatternHelper.stringify(dummyPattern));
            assert.deepEqual(dummyPattern, parsedPattern, 'pattern are equal');
            assert.notEqual(dummyPattern[0], parsedPattern[0], 'arrays are different objects');
        });
        const DUMMY_PATTERN = `█░░░███████████░░░░░░░█░░░██████
█░░░░████░░░██░░░░░░░░░░░░░░░███
█░░░░░░░░░░░░█░░░░░░░░░░░░░░░░░█
███░░░░░░░░░░░█░░░░░░░░░░░░░░░░░
███░░░░░░░░░░███░░░░░░░░░░░░░░░█
██░░░░░░░░░█████░░░░░░░░░░░░░░██
█░░░░░░░░░██░░░░░░░░░░░░░░░░░░██
██████░░░██░░░░░░░░░░░░░░░░░░░░█
██████░░███░░░░░░░░░░░░░░░░░██░░
████████░░░░░░░░░░░░░███░░░█████
████████░░░░░░░░░███████░░██████
███████░░░░░░░░░████░░░░░░██████
███████░░░░░░░░░████░░░░░░░█████
███░░██░░░██░░░░██████░░░░░██░░█
███░░██░░███░░░░░██████░░░░██░░█
██░░░░██░░██░░░░░░██████░░███░░█
██░░░░███░░█░░░░░░██████░███████
███░░░█████░░░░░░░██░░██░███████
████░░░░███░░░░░░░░░░░██░░░█████
████░░░░░█░░░░░░░░░░░░███░░░░░░█
██░░░░░░█░░░██░░░░░░░████░░░░░░░
██░░░░░██░░░██░░░░░░░░██░░░░░░░░
█░░░░░░██░░██░░████░░░░░░░░░░░░░
█░░░█░███████░░████░░░░░░░░░░░░█
█░░██████████░░░██░░░░░░░██░░███
█░░█████████░░░░░█░░░░░░░███████
█░░░██████░░░░░░░░░░░░░░████████
░░░░░████░░░░░░░░░░░░░░█████████
░░░░░░███░░░░░░░██░░░███████████
░░░░██████░░░░░░██░░████████████
███████████░░░░░░░░█████████████
█████████████░░░░░██████████████`;
        it("generates random cave pattern (raw)", function () {
            console.log(PatternHelper.stringify(pattern));
            assert.equal(PatternHelper.stringify(pattern), DUMMY_PATTERN);
        });
        const BIGGEST_AREA_PATTERN = `███████████████░░░░░░░█░░░██████
██████████████░░░░░░░░░░░░░░░███
██████████████░░░░░░░░░░░░░░░░░█
███████████████░░░░░░░░░░░░░░░░░
████████████████░░░░░░░░░░░░░░░█
████████████████░░░░░░░░░░░░░░██
████████████░░░░░░░░░░░░░░░░░░██
███████████░░░░░░░░░░░░░░░░░░░░█
███████████░░░░░░░░░░░░░░░░░██░░
████████░░░░░░░░░░░░░███░░░█████
████████░░░░░░░░░███████░░██████
███████░░░░░░░░░████░░░░░░██████
███████░░░░░░░░░████░░░░░░░█████
███████░░░██░░░░██████░░░░░█████
███████░░███░░░░░██████░░░░█████
████████░░██░░░░░░██████░░██████
█████████░░█░░░░░░██████░███████
███████████░░░░░░░██░░██░███████
███████████░░░░░░░░░░░██░░░█████
██████████░░░░░░░░░░░░███░░░░░░█
█████████░░░██░░░░░░░████░░░░░░░
█████████░░░██░░░░░░░░██░░░░░░░░
█████████░░██░░████░░░░░░░░░░░░░
█████████████░░████░░░░░░░░░░░░█
█████████████░░░██░░░░░░░██░░███
████████████░░░░░█░░░░░░░███████
██████████░░░░░░░░░░░░░░████████
█████████░░░░░░░░░░░░░░█████████
█████████░░░░░░░██░░░███████████
██████████░░░░░░██░░████████████
███████████░░░░░░░░█████████████
█████████████░░░░░██████████████`;
        it("finds biggest area", function () {
            PatternHelper.removeSmallOpenAreas(pattern);
            console.log(PatternHelper.stringify(pattern));
            assert.equal(PatternHelper.stringify(pattern), BIGGEST_AREA_PATTERN);
        });
        /*
        ███████████████░░░░░░░█░░░██████
        ██████████████░1░░░░░░░░░░░░░███
        ██████████████░░░░░░░░░░░░░░░░░█
        ███████████████░░░░4░░░░░░░░░2░░
        ████████████████░░░░░░░░4░░░░░░█
        ████████████████░░░░░░░░░░░░░░██
        ████████████░░░░░░░░░░░░░░░░2░██
        ███████████░1░2░░3░░░░░░░░░░░░░█
        ███████████░░░░░░░░░1░░░░░1░██░░
        ████████░░░░░░░░░░░░░███░1░█████
        ████████░░░░░3░░░███████░░██████
        ███████░░2░░░░░░████░░░░░░██████
        ███████░░░░░░░░░████░░░░2░░█████
        ███████░1░██░░2░██████░░░░░█████
        ███████░░███░░░░░██████░░1░█████
        ████████░░██░░░░░░██████░░██████
        █████████░░█░░░░░░██████░███████
        ███████████░░░3░░░██░░██░███████
        ███████████░░░░░░░░░1░██░░░█████
        ██████████░1░░░░░2░░░░███░░░░░░█
        █████████░1░██░2░░░2░████░░░░░░░
        █████████░░░██░░░░░░░░██░░░░3░░░
        █████████░░██░░████░░░░░░2░░░░░░
        █████████████░░████░░░░░░░░░░░░█
        █████████████░░░██░░░3░░░██░░███
        ████████████░░2░░█░░░░░░░███████
        ██████████░░░░░░1░░░░░░░████████
        █████████░1░░░░░░░░2░░░█████████
        █████████░░░░3░░██░░░███████████
        ██████████░░░░░░██░░████████████
        ███████████░░░░░░░░█████████████
        █████████████░░░░░██████████████*/
        const START_POINTS = [{
                "x": 24,
                "y": 4,
                "distance": 4.47213595499958
            }, {
                "x": 19,
                "y": 3,
                "distance": 4.242640687119285
            }, {
                "x": 21,
                "y": 24,
                "distance": 3.1622776601683795
            }, {
                "x": 14,
                "y": 17,
                "distance": 3.1622776601683795
            }, {
                "x": 13,
                "y": 10,
                "distance": 3.1622776601683795
            }, {
                "x": 28,
                "y": 21,
                "distance": 3
            }, {
                "x": 13,
                "y": 28,
                "distance": 3
            }, {
                "x": 17,
                "y": 7,
                "distance": 2.8284271247461903
            }, {
                "x": 19,
                "y": 27,
                "distance": 2.23606797749979
            }, {
                "x": 14,
                "y": 25,
                "distance": 2.23606797749979
            }, {
                "x": 17,
                "y": 19,
                "distance": 2.23606797749979
            }, {
                "x": 24,
                "y": 12,
                "distance": 2.23606797749979
            }, {
                "x": 9,
                "y": 11,
                "distance": 2.23606797749979
            }, {
                "x": 14,
                "y": 13,
                "distance": 2
            }, {
                "x": 14,
                "y": 7,
                "distance": 2
            }, {
                "x": 19,
                "y": 20,
                "distance": 2
            }, {
                "x": 15,
                "y": 20,
                "distance": 2
            }, {
                "x": 25,
                "y": 22,
                "distance": 2
            }, {
                "x": 28,
                "y": 6,
                "distance": 2
            }, {
                "x": 29,
                "y": 3,
                "distance": 2
            }, {
                "x": 20,
                "y": 8,
                "distance": 1.4142135623730951
            }, {
                "x": 20,
                "y": 18,
                "distance": 1.4142135623730951
            }, {
                "x": 11,
                "y": 19,
                "distance": 1.4142135623730951
            }, {
                "x": 25,
                "y": 9,
                "distance": 1.4142135623730951
            }, {
                "x": 25,
                "y": 14,
                "distance": 1.4142135623730951
            }, {
                "x": 8,
                "y": 13,
                "distance": 1.4142135623730951
            }, {
                "x": 26,
                "y": 8,
                "distance": 1.4142135623730951
            }, {
                "x": 10,
                "y": 20,
                "distance": 1.4142135623730951
            }, {
                "x": 12,
                "y": 7,
                "distance": 1.4142135623730951
            }, {
                "x": 15,
                "y": 1,
                "distance": 1.4142135623730951
            }, {
                "x": 16,
                "y": 26,
                "distance": 1.4142135623730951
            }, {
                "x": 10,
                "y": 27,
                "distance": 1.4142135623730951
            }];
        it("generate start points", () => {
            PatternHelper.removeSmallOpenAreas(pattern);
            let bypass = PatternHelper.generateBypass(pattern);
            let positions = PatternHelper.collectFreeAroundPositions(pattern, bypass);
            assert.deepEqual(positions, START_POINTS);
        });
        const BIG_RECT_AREAS = `999999999555551░░░░░░░1░░░111221
99999999955555░░░░░░░░░░░░░░░221
99999999955555░░░░░░░░░░░░░░░░░1
999999999555551░░░░░░░░░░░░░░░░░
9999999995555522░░░░░░░░░░░░░░░1
9999999992211122░░░░░░░░░░░░░░22
999999999221░░░░░░░░░░░░░░░░░░22
99999999922░░░░░░░░░░░░░░░░░░░░1
99999999922░░░░░░░░░░░░░░░░░11░░
77777771░░░░░░░░░░░░░221░░░55555
77777771░░░░░░░░░3331221░░155555
7777777░░░░░░░░░1333░░░░░░155555
7777777░░░░░░░░░1333░░░░░░░55555
7777777░░░22░░░░114444░░░░░55555
7777777░░122░░░░░144441░░░░55555
77777771░░11░░░░░░444422░░155555
999999999░░1░░░░░░444422░2255555
99999999922░░░░░░░11░░22░2255555
99999999922░░░░░░░░░░░22░░░55555
9999999991░░░░░░░░░░░░221░░░░░░1
999999999░░░22░░░░░░░1221░░░░░░░
999999999░░░22░░░░░░░░11░░░░░░░░
999999999░░11░░2222░░░░░░░░░░░░░
9999999993331░░2222░░░░░░░░░░░░1
9999999993331░░░11░░░░░░░11░░111
777777722333░░░░░1░░░░░░░7777777
7777777221░░░░░░░░░░░░░░17777777
777777722░░░░░░░░░░░░░░117777777
777777722░░░░░░░22░░░44447777777
7777777333░░░░░░22░░144447777777
77777773331░░░░░░░░2244447777777
7777777333111░░░░░12244447777777`;
        it('calculateRectBlocks', () => {
            PatternHelper.removeSmallOpenAreas(pattern);
            let rectAreas = PatternHelper.calculateRectBlocks(pattern, 1);
            // mark on map
            rectAreas.forEach(rect => {
                // if (rect.w >= 1) {
                for (let i = 0; i < rect.w; i++) {
                    for (let j = 0; j < rect.h; j++) {
                        pattern[rect.x + i][rect.y + j] = -rect.w;
                    }
                }
                // }
            });
            console.log(PatternHelper.stringify(pattern, true));
            assert.equal(PatternHelper.stringify(pattern, true), BIG_RECT_AREAS);
        });
    });
});
