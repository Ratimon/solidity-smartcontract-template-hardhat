import 'dotenv/config';


import chalk from 'chalk';


import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';


import {
    BigNumber,
    utils,
} from 'ethers';

const { 
    formatUnits,
} = utils;


  
const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments, getNamedAccounts, network} = hre;
    const {deploy,execute, get, log, read } = deployments;

    const {
        deployer,
    } = await getNamedAccounts();

    log(chalk.cyan(`.....`));
    log(chalk.cyan(`Starting Script.....`));
    
    log(`Deploying contracts with the account: ${deployer}`);
    
    
    const balance = await hre.ethers.provider.getBalance(deployer);
    log(`Account balance: ${formatUnits(balance, 'ether')} BNB`);
    
    
    log(chalk.yellow(`Network Name: ${network.name}`));
    log("----------------------------------------------------");    

    
    const  OracleArgs : {[key: string]: any} = {};

    OracleArgs[`value`] = 100000000;
    OracleArgs[`decimals`] = 8;


    const deploymentName = "OracleChainlinkMock_USD_per_BUSD"
    const OracleResult = await deploy(deploymentName, {
        contract: 'MockChainlinkOracle', 
        from: deployer,
        args: Object.values(OracleArgs),
        log: true,
        deterministicDeployment: false
    });


    log("------------------ii---------ii---------------------")
    log("----------------------------------------------------")
    log("------------------ii---------ii---------------------")
    log(`Could be found at ....`)
    log(chalk.yellow(`/deployment/${network.name}/${deploymentName}.json`))

    
    if (OracleResult.newlyDeployed) {

        log(` contract address: ${chalk.green(OracleResult.address)} using ${OracleResult.receipt?.gasUsed} gas`);

        for(let i in OracleArgs){
            log(chalk.yellow( `Argument: ${i} - value: ${OracleArgs[i]}`));
          }

          if(hre.network.tags.production || hre.network.tags.staging){

            try {
                
                await hre.run("verify:verify", {
                    address: OracleResult.address,
                    constructorArguments: Object.values(OracleArgs),
                });

            }
            catch(err) {
                console.log(err)
            }
        }


    }

    log(chalk.cyan(`Ending Script.....`));
    log(chalk.cyan(`.....`));




  
};
export default func;
func.tags = ["2-0-01", "2-0", 'busd-mock-oracle','oracle'];
func.dependencies = ['nft'];


func.skip = async function (hre: HardhatRuntimeEnvironment) {


    //not use for mainnet fork test,generate local host, or production
    
    //1) mainnet fork test    hre.network.name == 'hardhat' && isMainnetForking == true
    //2) generate local host  hre.network.name == 'localhost' && isMainnetForking == true
    //3) production           hre.network.name == 'bscMainnet' && isMainnetForking == false
    //4) testnet              hre.network.name == 'bscTestnet' && isMainnetForking == false
  
    //use for testnet, generate hardhat, unit test
    //1) generate hardhat     hre.network.name == 'hardhat' && isMainnetForking == false
    //2) unit test            hre.network.name == 'hardhat' && isMainnetForking == false
  
    const isForking = process.env.HARDHAT_FORK == undefined ? false: true
  
  
    if( (hre.network.name == 'hardhat' && isForking)
       || (hre.network.name == 'localhost' && isForking) 
       || (hre.network.name == 'bscmainnet' && !isForking)
       || (hre.network.name == 'bsctestnet') ){
          return true;
      } else{
          return false;
      }
  
  };