import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/dist/src/signers';
import {Contract} from 'ethers';
import {ethers} from 'hardhat';

export async function setupNamedUsers<T extends {[contractName: string]: Contract}>(
  namedAccounts: {[name: string]: string},
  contracts: T
): Promise<{[name: string]: {address: string; signer: SignerWithAddress} & T}> {
  const users: {[name: string]: {address: string; signer: SignerWithAddress} & T} = {};
  for (const entry of Object.entries(namedAccounts)) {
    users[entry[0]] = await setupUser(entry[1], contracts);
  }
  return users;
}

export async function setupUsers<T extends {[contractName: string]: Contract}>(
  addresses: string[],
  contracts: T
): Promise<({address: string; signer: SignerWithAddress} & T)[]> {
  const users: ({address: string; signer: SignerWithAddress} & T)[] = [];
  for (const address of addresses) {
    users.push(await setupUser(address, contracts));
  }
  return users;
}

export async function setupUser<T extends {[contractName: string]: Contract}>(
  address: string,
  contracts: T
): Promise<{address: string; signer: SignerWithAddress} & T> {
  const signer = await ethers.getSigner(address);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user: any = {address, signer};
  for (const key of Object.keys(contracts)) {
    user[key] = contracts[key].connect(signer);
  }
  return user as {address: string; signer: SignerWithAddress} & T;
}