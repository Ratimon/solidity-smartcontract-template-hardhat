import {HardhatRuntimeEnvironment} from 'hardhat/types';
import { ethers }  from "ethers";

import { task } from "hardhat/config";

export default async () => { 

  task( 'accounts', 'Prints the list of accounts',
    async (_taskArgs, hre: HardhatRuntimeEnvironment) => {
      const accounts: ethers.Signer[] = await hre.ethers.getSigners();


      for (const account of accounts) {
        console.log(await account.getAddress());
      }
  })
}