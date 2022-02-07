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

    const  ERC20Args : {[key: string]: any} = {}; 
    
    ERC20Args[`tokenName`] = "MockUSDT";
  
    const deploymentName = "TokenUSDT"
    const ERC20Result = await deploy(deploymentName, {
        contract: "MockERC20",
        from: deployer,
        args: Object.values(ERC20Args),
        log: true,
        skipIfAlreadyDeployed: true
      });
      
    log("------------------ii---------ii---------------------")
    log("----------------------------------------------------")
    log("------------------ii---------ii---------------------")
    log(`Could be found at ....`)
    log(chalk.yellow(`/deployment/${network.name}/${deploymentName}.json`))
    
  
    if (ERC20Result.newlyDeployed) {
      
      log(`contract address (MockERC20): ${chalk.green(ERC20Result.address)} using ${ERC20Result.receipt?.gasUsed} gas`);

      for(var i in ERC20Args){
        log(chalk.yellow( `Argument: ${i} - value: ${ERC20Args[i]}`));
      }


      if(hre.network.tags.production || hre.network.tags.staging){

        try {
            
            await hre.run("verify:verify", {
                address: ERC20Result.address,
                constructorArguments: Object.values(ERC20Args),
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
func.tags = ["0-2","usdt",'external'];
func.dependencies = ['0-1'];


// func.skip = async (hre) => (await hre.deployments.getNetworkName()) !== 'hardhat'; //skip when it is  hardhat

func.skip = async function (hre: HardhatRuntimeEnvironment) {


  //not use for mainnet fork test,generate local host, or production
  
  //1) mainnet fork test    hre.network.name == 'hardhat' && isMainnetForking == true
  //2) generate local host  hre.network.name == 'localhost' && isMainnetForking == true
  //3) production           hre.network.name == 'bscMainnet' && isMainnetForking == false

  //use for testnet, generate hardhat, unit test
  //1) testnet              hre.network.name == 'bscTestnet' && isMainnetForking == false
  //2) generate hardhat     hre.network.name == 'hardhat' && isMainnetForking == false
  //3) unit test            hre.network.name == 'hardhat' && isMainnetForking == false

  let isForking = process.env.HARDHAT_FORK == undefined ? false: true


  if( (hre.network.name == 'hardhat' && isForking)
     || (hre.network.name == 'localhost' && isForking) 
     || (hre.network.name == 'bscmainnet' && !isForking) ){
        return true;
    } else{
        return false;
    }

};


// func.skip = async function (hre: HardhatRuntimeEnvironment) {



//   //not use for mainnet fork test,generate local host, or production
  
//   //1) mainnet fork test    hre.network.name == 'hardhat' && isMainnetForking == true
//   //2) production           hre.network.name == 'bscMainnet' && isMainnetForking == false

//   //use for testnet, generate hardhat, unit test
//   //1) testnet              hre.network.name == 'bscTestnet' && isMainnetForking == false
//   //2) unit test            hre.network.name == 'hardhat' && isMainnetForking == false


//   if( (hre.network.name == 'hardhat' && isMainnetForking)
//      || (hre.network.name == 'localhost' && isMainnetForking) 
//      || (hre.network.name == 'bscmainnet' && !isMainnetForking) ){
//         return true;
//     } else{
//         return false;
//     }

// };