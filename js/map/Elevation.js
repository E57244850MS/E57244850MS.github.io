define(["require", "exports"], function (require, exports) {
    "use strict";
    class Elevation {
        constructor(height, x, y) {
            this.neighbors = [];
            this.x = x;
            this.y = y;
            this.height = height;
        }
        // top, right, bottom, left
        updateNeighbors(elevationMap) {
            let leftCol = elevationMap[this.x - 1] || [];
            let rightCol = elevationMap[this.x + 1] || [];
            this.neighbors.push(elevationMap[this.x][this.y - 1] || null);
            this.neighbors.push(rightCol[this.y] || null);
            this.neighbors.push(elevationMap[this.x][this.y + 1] || null);
            this.neighbors.push(leftCol[this.y] || null);
        }
    }
    return Elevation;
});
