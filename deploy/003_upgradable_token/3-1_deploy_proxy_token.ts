import 'dotenv/config';
import chalk from 'chalk'
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

import {
    utils,
} from 'ethers';

const { 
    formatUnits,
} = utils;


  
const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments, getNamedAccounts, network} = hre;
    const {deploy,execute, get, log, read } = deployments;

    const {
        deployer
    } = await getNamedAccounts();

    log(chalk.cyan(`.....`));
    log(chalk.cyan(`Starting Script.....`));
    
    log(`Deploying contracts with the account: ${deployer}`);
    
    
    const balance = await hre.ethers.provider.getBalance(deployer);
    log(`Account balance: ${formatUnits(balance, 'ether')} BNB`);
    
    
    log(chalk.yellow(`Network Name: ${network.name}`));
    log("----------------------------------------------------");


    const  Args : {[key: string]: any} = {};


    const deploymentName = "ProxyTokenTestCoin"
    const Result = await deploy(deploymentName, {
        contract: "TestCoin", 
        from: deployer,
        proxy: {
            owner: deployer,
            methodName: 'initialize',
            proxyContract: 'OpenZeppelinTransparentProxy',
            upgradeIndex: 0,
          },
        args: Object.values(Args),
        log: true,
        deterministicDeployment: false
    });


    log("------------------ii---------ii---------------------")
    log("----------------------------------------------------")
    log("------------------ii---------ii---------------------")
    log(`Could be found at ....`)
    log(chalk.yellow(`/deployment/${network.name}/${deploymentName}.json`))

    
    if (Result.newlyDeployed) {

        log(` contract address: ${chalk.green(Result.address)} using ${Result.receipt?.gasUsed} gas`);

        for(var i in Args){
            log(chalk.yellow( `Argument: ${i} - value: ${Args[i]}`));
          }

        let version = await read('ProxyTokenTestCoin', 'version');
        console.log('version', formatUnits(version,0));


        if( network.name != 'hardhat' && ( hre.network.tags.production || hre.network.tags.staging)){

            try {
                    
                await hre.run("verify:verify", {
                    address: Result.address,
                    constructorArguments: Object.values(Args),
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
func.tags = ["3-0-01","3-0", 'deploy','upgradable'];
// func.dependencies = ["oracle"]