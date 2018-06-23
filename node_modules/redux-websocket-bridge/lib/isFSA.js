'use strict';

var FSA_ALLOWED_KEYS = ['error', 'meta', 'payload', 'type'];

module.exports = function isFSA(action) {
  return action && typeof action.type === 'string' && (typeof action.error === 'boolean' || typeof action.error === 'undefined' || action.error === null) && Object.keys(action).every(function (key) {
    return FSA_ALLOWED_KEYS.includes(key);
  });
};
//# sourceMappingURL=isFSA.js.map