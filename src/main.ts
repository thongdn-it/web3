import Web3, {
  Contract,
  EthExecutionAPI,
  HttpProvider,
  SupportedProviders,
  Web3BaseProvider,
  Web3ProviderStatus,
} from "web3";

import { EtherUnits } from "web3-utils";
import { ContractType, getAbiWithType } from "./contract_apis/index";

export class RNWeb3 {
  web3: Web3;

  constructor(provider?: SupportedProviders<EthExecutionAPI> | string) {
    this.web3 = new Web3(provider);
    this.addListeners();
  }

  /// Provider ///
  get provider(): Web3BaseProvider<EthExecutionAPI> | undefined {
    return this.web3.provider;
  }

  setProvider(provider?: SupportedProviders<EthExecutionAPI> | string) {
    this.removeListeners();
    this.web3.setProvider(provider);
    this.addListeners();
  }

  get status(): Web3ProviderStatus | undefined {
    if (this.provider instanceof HttpProvider) {
      return undefined;
    } else {
      return this.provider?.getStatus();
    }
  }

  /// Wallet ///
  async getBalance(address: string, unit: EtherUnits = "ether") {
    const balance = await this.web3.eth.getBalance(address);
    return this.web3.utils.fromWei(balance, unit);
  }

  async getBalanceWithContract(
    contractType: ContractType,
    contractAddress: string,
    address: string,
    unit: EtherUnits = "ether"
  ) {
    const contract = new Contract(
      getAbiWithType(contractType),
      contractAddress,
      this.web3
    );
    const balance = await contract.methods.balanceOf(address).call();
    return this.web3.utils.fromWei(balance, unit);
  }

  /// Private Function ///
  private addListeners() {
    if (this.provider instanceof HttpProvider) {
      console.log("HttpProvider does not support event");
    } else {
      this.provider?.once("connect", (data) => {
        console.log("RNWeb3 -> on connect -> data: " + data);
      });

      this.provider?.once("disconnect", (data) => {
        console.log("RNWeb3 -> on disconnect -> data: " + data);
      });

      this.provider?.once("accountsChanged", (data) => {
        console.log("RNWeb3 -> on accountsChanged -> data: " + data);
      });

      this.provider?.once("chainChanged", (data) => {
        console.log("RNWeb3 -> on chainChanged -> data: " + data);
      });
    }
  }

  private removeListeners() {
    this.provider?.removeAllListeners;
  }
}
