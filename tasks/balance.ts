import {HardhatRuntimeEnvironment} from 'hardhat/types';
import { task } from "hardhat/config";

export default async () => { 

    task( 'balance', 'Prints an account\'s balance')
        .addParam('account', 'The account\'s address')
        .setAction(async (_taskArgs, hre: HardhatRuntimeEnvironment) => {
            const account = hre.ethers.utils.getAddress(_taskArgs.account);
            const balance = await hre.ethers.provider.getBalance(account);
            console.log(hre.ethers.utils.formatUnits(balance, 'ether'), 'BNB');
        })

}
