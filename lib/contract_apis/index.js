"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAbiWithType = exports.ERC4626 = exports.ERC1155 = exports.ERC777 = exports.ERC721 = exports.ERC20 = void 0;
const ERC20_1 = __importDefault(require("./ERC20"));
exports.ERC20 = ERC20_1.default;
const ERC721_1 = __importDefault(require("./ERC721"));
exports.ERC721 = ERC721_1.default;
const ERC777_1 = __importDefault(require("./ERC777"));
exports.ERC777 = ERC777_1.default;
const ERC1155_1 = __importDefault(require("./ERC1155"));
exports.ERC1155 = ERC1155_1.default;
const ERC4626_1 = __importDefault(require("./ERC4626"));
exports.ERC4626 = ERC4626_1.default;
function getAbiWithType(contractType) {
    switch (contractType) {
        case "ERC721":
            return ERC721_1.default.abi;
        case "ERC777":
            return ERC777_1.default.abi;
        case "ERC1155":
            return ERC1155_1.default.abi;
        case "ERC4626":
            return ERC4626_1.default.abi;
        default:
            return ERC20_1.default.abi;
    }
}
exports.getAbiWithType = getAbiWithType;
