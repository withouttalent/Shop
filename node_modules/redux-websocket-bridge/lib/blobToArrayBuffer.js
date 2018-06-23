"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = blobToArrayBuffer;
function blobToArrayBuffer(blob) {
  return new Promise(function (resolve, reject) {
    var fileReader = new FileReader();

    fileReader.onerror = function (event) {
      reject(event);
    };

    fileReader.onload = function () {
      resolve(this.result);
    };

    fileReader.readAsArrayBuffer(blob);
  });
}
//# sourceMappingURL=blobToArrayBuffer.js.map