"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Web3 = void 0;
const web3_1 = require("web3");
const index_1 = require("./contract_apis/index");
class Web3 {
    constructor(provider) {
        this.web3 = new web3_1.Web3(provider);
        this.addListeners();
    }
    /// Provider ///
    get provider() {
        return this.web3.provider;
    }
    setProvider(provider) {
        this.removeListeners();
        this.web3.setProvider(provider);
        this.addListeners();
    }
    get status() {
        var _a;
        if (this.provider instanceof web3_1.HttpProvider) {
            return undefined;
        }
        else {
            return (_a = this.provider) === null || _a === void 0 ? void 0 : _a.getStatus();
        }
    }
    /// Wallet ///
    getBalance(address, unit = "ether") {
        return __awaiter(this, void 0, void 0, function* () {
            const balance = yield this.web3.eth.getBalance(address);
            return this.web3.utils.fromWei(balance, unit);
        });
    }
    getBalanceWithContract(contractType, contractAddress, address, unit = "ether") {
        return __awaiter(this, void 0, void 0, function* () {
            const contract = new web3_1.Contract((0, index_1.getAbiWithType)(contractType), contractAddress, this.web3);
            const balance = yield contract.methods.balanceOf(address).call();
            return this.web3.utils.fromWei(balance, unit);
        });
    }
    /// Private Function ///
    addListeners() {
        var _a, _b, _c, _d;
        if (this.provider instanceof web3_1.HttpProvider) {
            console.log("HttpProvider does not support event");
        }
        else {
            (_a = this.provider) === null || _a === void 0 ? void 0 : _a.once("connect", (data) => {
                console.log("RNWeb3 -> on connect -> data: " + data);
            });
            (_b = this.provider) === null || _b === void 0 ? void 0 : _b.once("disconnect", (data) => {
                console.log("RNWeb3 -> on disconnect -> data: " + data);
            });
            (_c = this.provider) === null || _c === void 0 ? void 0 : _c.once("accountsChanged", (data) => {
                console.log("RNWeb3 -> on accountsChanged -> data: " + data);
            });
            (_d = this.provider) === null || _d === void 0 ? void 0 : _d.once("chainChanged", (data) => {
                console.log("RNWeb3 -> on chainChanged -> data: " + data);
            });
        }
    }
    removeListeners() {
        var _a;
        (_a = this.provider) === null || _a === void 0 ? void 0 : _a.removeAllListeners;
    }
}
exports.Web3 = Web3;
