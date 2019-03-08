"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _scope = require("@dekproject/scope");

var _keycloakConnect = require("keycloak-connect");

var _keycloakConnect2 = _interopRequireDefault(_keycloakConnect);

var _expressSession = require("express-session");

var _expressSession2 = _interopRequireDefault(_expressSession);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var memoryStore, keycloak;
    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    try {
                        memoryStore = new _expressSession2.default.MemoryStore();
                        keycloak = new _keycloakConnect2.default({ store: memoryStore });

                        _scope.$.set("keycloak", keycloak);
                        _scope.$.set("memoryStore", memoryStore);
                    } catch (e) {
                        console.log("[ Keycloak ] - " + e.message);
                    }

                case 1:
                case "end":
                    return _context.stop();
            }
        }
    }, _callee, undefined);
}));
//# sourceMappingURL=index.js.map