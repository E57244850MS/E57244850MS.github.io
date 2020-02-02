/// <reference path="../../typings/Interfaces.d.ts" />
define(["require", "exports", "./PatternHelper"], function (require, exports, PatternHelper) {
    "use strict";
    class LakeGenerator {
        static generateLakes(map, lakeChance, lakeMinSize) {
            const nextReal = window.nextReal;
            let n = map.length;
            let m = map[0].length;
            let x, y;
            // find isolated walls locations
            let wallAreas = PatternHelper.findIsolatedAreas(map, 1);
            wallAreas = wallAreas.filter((area) => (area.length >= lakeMinSize));
            // choose areas to be lakes
            let rectAreas = [];
            wallAreas.forEach((area) => {
                if (nextReal() < lakeChance) {
                    rectAreas.push(area);
                }
            });
            let lakeAreas = rectAreas.map((area) => {
                let currentLakeMap = PatternHelper.createFilled(n, m, 0);
                let lakeCells = [];
                area.forEach((pos) => {
                    x = pos.x;
                    y = pos.y;
                    // replace it's cell type to be lake (to skip tree/mountain creation)
                    map[x][y] = 2;
                    // prepare for rects
                    currentLakeMap[x][y] = 1;
                    lakeCells.push({ x, y });
                });
                // generate rects for each like
                let lakeRects = PatternHelper.calculateRectBlocks(currentLakeMap, 1);
                return {
                    // make y obviously high to not forget to update
                    y: .01,
                    rects: lakeRects,
                    cells: lakeCells,
                };
            });
            /*
            - find isolated walls locations
            - make randomly some of them to be a lake
            - replace it's cell type to be lake (to skip tree/mountain creation)
            - decrease elevation for the lake (flat is ok)
            - generate rects
            - create as one Thing
            - create planes for rects and merge them
            - use as one mesh
            - add water textures
            */
            /*
            let minHeight = Number.MAX_VALUE;
            let maxHeight = Number.MIN_VALUE;
            for (let i = 10; i < 20; i++) {
              for (let j = 10; j < 20; j++) {
                if (this.heightMap[i][j] < minHeight) {
                  minHeight = this.heightMap[i][j];
                }
                if (this.heightMap[i][j] > maxHeight) {
                  maxHeight = this.heightMap[i][j];
                }
              }
            }
            for (let i = 10 + 1; i < 20 - 1; i++) {
              for (let j = 10 + 1; j < 20 - 1; j++) {
                this.heightMap[i][j] -= this.heightMap[i][j] - minHeight;
              }
            }
            */
            // </LAKE_GENERATION_TEST>
            return lakeAreas;
        }
    }
    return LakeGenerator;
});
