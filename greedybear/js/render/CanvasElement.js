/// <reference path="../../typings/interfaces.d.ts"/>
define(["require", "exports"], function (require, exports) {
    "use strict";
    const CSS_STYLES = `
  position: absolute;
  width: 100%;
  height: 100%;
`;
    class CanvasElement {
        constructor(parent) {
            this.canvas = document.querySelector('canvas');
            // this.canvas = document.createElement('canvas');
            // this.canvas.setAttribute('style', CSS_STYLES);
            // parent.appendChild(this.canvas);
        }
        get element() {
            return this.canvas;
        }
        destroy() {
            this.canvas.parentElement.removeChild(this.canvas);
        }
        resize(w, h) {
            this.canvas.height = w || window.innerHeight;
            this.canvas.width = h || window.innerWidth;
        }
    }
    return CanvasElement;
});
