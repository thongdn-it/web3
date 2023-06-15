import ERC20 from "./ERC20";
import ERC721 from "./ERC721";
import ERC777 from "./ERC777";
import ERC1155 from "./ERC1155";
import ERC4626 from "./ERC4626";

export { ERC20, ERC721, ERC777, ERC1155, ERC4626 };
export type ContractType =
  | "ERC20"
  | "ERC721"
  | "ERC777"
  | "ERC1155"
  | "ERC4626";

export function getAbiWithType(contractType: ContractType) {
  switch (contractType) {
    case "ERC721":
      return ERC721.abi;
    case "ERC777":
      return ERC777.abi;
    case "ERC1155":
      return ERC1155.abi;
    case "ERC4626":
      return ERC4626.abi;
    default:
      return ERC20.abi;
  }
}
