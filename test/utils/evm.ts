

import * as hre from 'hardhat';
import { network,  } from 'hardhat';

import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/dist/src/signers';

import {
    utils,
  } from 'ethers';

const { 
    parseEther,
    hexValue
  } = utils;


export async function impersonate (address: string): Promise<SignerWithAddress> {
    await hre.network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: [address],
    });
    return hre.ethers.getSigner(address);
  };

export async function getStorageAt (address: string, index: string) : Promise<string> {
    const storage = await hre.ethers.provider.send("eth_getStorageAt", [address, index])
    return storage;
  }


export async function setStorageAt (address: string, index: string, value: string) {
    await hre.ethers.provider.send('hardhat_setStorageAt', [address, index, value])
    await hre.ethers.provider.send('evm_mine', []) // Just mines to the next block
  }


  export async function depositGas (address: string, amount: number) {

    const gasAmount = parseEther(`${amount}`)

    await setBalance(address, hexValue(gasAmount));

  }

export async function setBalance (address: string, value: string) {
    await network.provider.request({
        method: 'hardhat_setBalance',
        params: [address, value],
      });
}


export async function reset (forking?: { [key: string]: any })  {
    const params = forking
      ? [
          {
            forking,
          },
        ]
      : [];

    await network.provider.request({
      method: 'hardhat_reset',
      params,
    });
  };


export async function advanceTimeAndBlock(time: number): Promise<void>  {
    await advanceTime(time);
    await advanceBlock();
  };
  


export async function advanceTime (time: number): Promise<void> {

    await network.provider.request({
      method: 'evm_increaseTime',
      params: [time],
    });

  };

export async function advanceBlock ()  {

    await network.provider.request({
      method: 'evm_mine',
      params: [],
    });

  };

