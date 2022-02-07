import 'dotenv/config';

import chalk from 'chalk';

import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

import {
  utils,
} from 'ethers';

const { 
  formatUnits,
  parseEther,
  parseUnits
} = utils;


const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    
    const {deployments, getNamedAccounts, network} = hre;
    const {deploy, execute , log } = deployments;
    const {deployer} = await getNamedAccounts();

    log(chalk.cyan(`.....`));
    log(chalk.cyan(`Starting Script.....`));
  
    log(`Deploying contracts with the account: ${deployer}`);
  
  
    const balance = await hre.ethers.provider.getBalance(deployer);
    log(`Account balance: ${formatUnits(balance, 'ether')} ETH`);
  
  
    log(chalk.yellow(`Network Name: ${network.name}`));
    log("----------------------------------------------------")
  


    const  NFTArgs : {[key: string]: any} = {}; 
    
    NFTArgs[`_name`] = "SuperMario2";
    NFTArgs[`_symbol`] = "SM2";


    const deploymentName = "1155Mario"
    const NFTResult = await deploy(deploymentName, {
        contract: "SuperMarioWorldERC1155",
        from: deployer,
        args: Object.values(NFTArgs),
        log: true,
        skipIfAlreadyDeployed: true
      });
      
    log("------------------ii---------ii---------------------")
    log("----------------------------------------------------")
    log("------------------ii---------ii---------------------")
    log(`Could be found at ....`)
    log(chalk.yellow(`/deployment/${network.name}/${deploymentName}.json`))
  
    if (NFTResult.newlyDeployed) {
      
      log(`contract address (SuperMarioWorldERC1155): ${chalk.green(NFTResult.address)} using ${NFTResult.receipt?.gasUsed} gas`);

      for(var i in NFTArgs){
        log(chalk.yellow( `Argument: ${i} - value: ${NFTArgs[i]}`));
      }

      if(hre.network.tags.production || hre.network.tags.staging){

        try {
            
            await hre.run("verify:verify", {
                address: NFTResult.address,
                constructorArguments: Object.values(NFTArgs),
            });

            }
        catch(err) {
            console.log(err)
        }
      }

      
    }

    log(chalk.cyan(`Ending Script.....`));
    log(chalk.cyan(`.....`)); 

    
}
export default func;
func.tags = ["1-2","erc1155",'nft'];
func.dependencies = ['external', '1-1'];