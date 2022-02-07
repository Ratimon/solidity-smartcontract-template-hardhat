import 'dotenv/config';

import chalk from 'chalk';

import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {
  DeployFunction,
  DeploymentSubmission
} from 'hardhat-deploy/types';

import erc20abi from "../../src/abis/external/erc20.json";
import wbnbabi from "../../src/abis/external/wbnb.json";


import {
  utils,
} from 'ethers';

const { 
  formatUnits,
  parseEther,
  parseUnits
} = utils;

  
const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // if(!hre.network.tags.production) {
    
    const {deployments, getNamedAccounts, network} = hre;
    const {deploy, log ,save } = deployments;
    const {
      deployer,
      busd,
      wbnb
    } = await getNamedAccounts();

    log(chalk.cyan(`.....`));
    log(chalk.cyan(`Starting Script.....`));
  
    log(`Saving contracts ....`);
  

    log(chalk.yellow(`Network Name: ${network.name}`));
    log("----------------------------------------------------")

    const wbnbSubmission : DeploymentSubmission = {
      abi: wbnbabi,
      address: wbnb
    }

    const busdSubmission : DeploymentSubmission = {
      abi: erc20abi,
      address: busd
    }


    await save('TokenWBNB', wbnbSubmission);
    await save('TokenBUSD', busdSubmission);

    log(`Deployment Saved: TokenWBNB with address ${chalk.green(wbnb)}`);
    log(`Deployment Saved: TokenBUSD with address ${chalk.green(busd)}`);

    log(chalk.cyan(`Ending Script.....`));
    log(chalk.cyan(`.....`));




    
  
  // };
}
export default func;
func.tags = ["0-0","save",'external'];

// func.skip = async (hre) => (await hre.deployments.getNetworkName()) == 'hardhat'; //skip when it is  hardhat


func.skip = async function (hre: HardhatRuntimeEnvironment) {


  //use for mainnet fork test,generate local host, or production

  //1) mainnet fork test    hre.network.name == 'hardhat' && isMainnetForking == true
  //2) generate local host  hre.network.name == 'localhost' && isMainnetForking == true
  //3) production           hre.network.name == 'bscMainnet' && isMainnetForking == false

 //not use for testnet, generate hardhat, unit test
  //1) testnet              hre.network.name == 'bscTestnet' && isMainnetForking == false
  //2) generate hardhat     hre.network.name == 'hardhat' && isMainnetForking == false
  //3) unit test            hre.network.name == 'hardhat' && isMainnetForking == false



  let isForking = process.env.HARDHAT_FORK == undefined ? false: true

  if( (hre.network.name == 'bsctestnet' && !isForking)
     || (hre.network.name == 'hardhat' && !isForking) ){
        return true;
    } else{
        return false;
    }


};

// func.skip = async (hre) => (await hre.deployments.getNetworkName()) == 'hardhat'; //skip when it is  hardhat


// func.skip = async function (hre: HardhatRuntimeEnvironment) {


//   //use for mainnet fork test,generate local host, or production

//   //1) mainnet fork test    hre.network.name == 'hardhat' && isMainnetForking == true
//   //2) production           hre.network.name == 'bscMainnet' && isMainnetForking == false

//  //not use for testnet, generate hardhat, unit test
//   //1) testnet              hre.network.name == 'bscTestnet' && isMainnetForking == false
//   //2) unit test            hre.network.name == 'hardhat' && isMainnetForking == false

  


//   if( (hre.network.name == 'bscTestnet' && !isMainnetForking)
//      || (hre.network.name == 'hardhat' && !isMainnetForking) ){
//         return true;
//     } else{
//         return false;
//     }


// };
