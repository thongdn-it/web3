const {Web3}  = require("../lib/main");

const web3 = new Web3('https://bsc-dataseed.binance.org/');
web3.getBalanceWithContract("ERC20", "0x36C7B164F85D6F775cD128966D5819c7d36FEfF3","0xE74E189D740a013f624EefA86ff1f0d26BB13236").then((value) =>{
    console.log("Balance: " + value);
});

