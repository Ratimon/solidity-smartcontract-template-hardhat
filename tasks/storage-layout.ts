
import { task } from "hardhat/config";

export default async () => { 


    task("storage-layout", async (taskArgs, hre) => {
        await hre.storageLayout.export();
    })

}