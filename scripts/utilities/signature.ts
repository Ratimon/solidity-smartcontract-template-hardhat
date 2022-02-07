
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.

 import {
  utils,
} from 'ethers';

const {
  Interface
} = utils;


 import jsonabi from "../../src/abis/external/oldloanClosing.json";




async function main(): Promise<void> {
    // Hardhat always runs the compile task when running scripts through it.
    // If this runs in a standalone fashion you may want to call compile manually
    // to make sure everything is compiled
    // await run("compile");

    const iface = new Interface(jsonabi);

    let _name = 'liquidate'

    const sig =  iface.getSighash(_name);

    console.log('sig',sig);

}  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main()
    .then(() => process.exit(0))
    .catch((error: Error) => {
      console.error(error);
      process.exit(1);
    });