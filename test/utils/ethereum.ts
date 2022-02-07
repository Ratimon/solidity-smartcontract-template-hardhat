import { ethers, network } from "hardhat";

import { BigNumber, BigNumberish, utils} from 'ethers';

const { 
	defaultAbiCoder,
	hexStripZeros,
	hexZeroPad,
	solidityKeccak256,
	keccak256,
	Interface
   } = utils;



export async function decodeLogs(logs: any, emitter: any, eventName: string) {
	let abi;
	let address: string | null;
	abi = emitter.abi;

	try {
		address = emitter.address;
	} catch (e) {
		address = null;
	}

	let eventABI = abi.filter((x:any) => x.type === "event" && x.name === eventName);

	if (eventABI.length === 0) {
		throw new Error(`No ABI entry for event '${eventName}'`);
	} else if (eventABI.length > 1) {
		throw new Error(`Multiple ABI entries for event '${eventName}', only uniquely named events are supported`);
	}

	eventABI = eventABI[0];

	// The first topic will equal the hash of the event signature
	const eventSignature = `${eventName}(${eventABI.inputs.map((input: any) => input.type).join(",")})`;
	const eventTopic = solidityKeccak256([ "string"], [eventSignature] );

	const iface = new Interface(abi);
	// Only decode events of type 'EventName'
	return logs
		.filter((log: any) => log.topics.length > 0 && log.topics[0] === eventTopic && (!address || log.address === address))
		.map((log:any) => iface.decodeEventLog(eventName, log.data, log.topics ))
		.map((decoded:any) => ({ event: eventName, args: decoded }));
}


// export async function setBalance(tokenSymbol: SupportedTokens, to: string, amount: BigNumberish): Promise<void> {
// 	// If ETH, set the balance directly
// 	if (tokenSymbol === 'eth') {
// 	  await network.provider.send('hardhat_setBalance', [to, BigNumber.from(amount).toHexString()]);
// 	  return;
// 	}
  
// 	// Otherwise, compute the storage slot containing this users balance and use it to set the balance
// 	const slot = getBalanceOfSlotSolidity(tokens[tokenSymbol].mappingSlot, to);
// 	await network.provider.send('hardhat_setStorageAt', [tokens[tokenSymbol].address, slot, to32ByteHex(amount)]);
//   }
  
  // --- Private (not exported) helpers ---
  // Determine the storage slot used to store  Notes:
  //   - This only works for Solidity since Vyper has different storage layout rules
  //   - Read about Solidity storage layout rules at https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html#mappings-and-dynamic-arrays
  //   - `defaultAbiCoder.encode` is equivalent to Solidity's `abi.encode()`, and we strip leading zeros from the hashed
  //     value to conform to the JSON-RPC spec: https://ethereum.org/en/developers/docs/apis/json-rpc/#hex-value-encoding
  function getBalanceOfSlotSolidity(mappingSlot: string, address: string) {
	return hexStripZeros(keccak256(defaultAbiCoder.encode(['address', 'uint256'], [address, mappingSlot])));
  }

  // Returns the storage slot for a Solidity mapping from an `address` to a value, given the slot of the mapping itself,
//  `mappingSlot`. Read more at https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html#mappings-and-dynamic-arrays
	const getSolidityStorageSlot = (mappingSlot: string, address: string) => {
	return hexStripZeros(keccak256(defaultAbiCoder.encode(['address', 'uint256'], [address, mappingSlot])));
  };
  
  // Converts a number to a 32 byte hex string
  export function to32ByteHex(x: BigNumberish) {
	  return hexZeroPad(BigNumber.from(x).toHexString(), 32);
  }
