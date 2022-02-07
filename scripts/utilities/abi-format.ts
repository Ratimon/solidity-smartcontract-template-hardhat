
 import { promises } from "fs";

 const {
   readFile,
   writeFile
  } = promises;


// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import {
  utils,
} from 'ethers';

const {
  Interface,
  FormatTypes
} = utils;


// import jsonabi from "../../src/abis/external/erc20.json";
// import jsonabi from "../../src/abis/external/wbnb.json";
// import jsonabi from "../../src/abis/external/uni-factory.json";
import jsonabi from "../../src/abis/external/uni-pair.json";
// import jsonabi from "../../src/abis/external/uni-router.json";




async function main(): Promise<void> {
    // Hardhat always runs the compile task when running scripts through it.
    // If this runs in a standalone fashion you may want to call compile manually
    // to make sure everything is compiled
    // await run("compile");
    const name = "uni-pair"
    const iface = new Interface(jsonabi);

    console.log('formatedAbi',iface.format(FormatTypes.full));

    const formatedAbi = iface.format(FormatTypes.full)
    await writeFile(`./src/abis/internal/formated/${name}.json`, JSON.stringify(formatedAbi), 'utf8')

    console.log('Formated abi GENERATED!')


}  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main()
    .then(() => process.exit(0))
    .catch((error: Error) => {
      console.error(error);
      process.exit(1);
    });