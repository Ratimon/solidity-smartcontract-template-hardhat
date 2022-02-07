import {HardhatRuntimeEnvironment} from 'hardhat/types';
import { task } from "hardhat/config";

export default async () => { 

    task( "block-number", "Prints the current block number",
        async (_, hre: HardhatRuntimeEnvironment ) => {
            await hre.ethers.provider.getBlockNumber().then((blockNumber) => {
                console.log("Current block number: " + blockNumber);
            })
        })
    }
