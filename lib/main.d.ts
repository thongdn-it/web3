import { Web3 as Web3JS, EthExecutionAPI, SupportedProviders, Web3BaseProvider, Web3ProviderStatus } from "web3";
import { EtherUnits } from "web3-utils";
import { ContractType } from "./contract_apis/index";
export declare class Web3 {
    web3: Web3JS;
    constructor(provider?: SupportedProviders<EthExecutionAPI> | string);
    get provider(): Web3BaseProvider<EthExecutionAPI> | undefined;
    setProvider(provider?: SupportedProviders<EthExecutionAPI> | string): void;
    get status(): Web3ProviderStatus | undefined;
    getBalance(address: string, unit?: EtherUnits): Promise<string>;
    getBalanceWithContract(contractType: ContractType, contractAddress: string, address: string, unit?: EtherUnits): Promise<string>;
    private addListeners;
    private removeListeners;
}
