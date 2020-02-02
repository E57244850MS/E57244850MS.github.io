/// <reference path="../../typings/Interfaces.d.ts" />
define(["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * use static counter for uniq ids
     */
    let createdObjectsCount = 0;
    class Thing {
        constructor(type, pos0, w = 1, h = 1) {
            this.rotation = BABYLON.Vector3.Zero();
            this.scaling = new BABYLON.Vector3(1, 1, 1);
            // render props
            this.parent = null;
            this.id = createdObjectsCount++;
            this.type = type;
            this.pos0 = pos0;
            this.position = pos0.clone();
            this.w = w;
            this.h = h;
        }
    }
    return Thing;
});
