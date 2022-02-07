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
    const {deploy,execute, get, getOrNull, log, read } = deployments;

    const {
        deployer,
        busdChainlinkOracle
    } = await getNamedAccounts();

    log(chalk.cyan(`.....`));
    log(chalk.cyan(`Starting Script.....`));
    
    log(`Deploying contracts with the account: ${deployer}`);
    
    
    const balance = await hre.ethers.provider.getBalance(deployer);
    log(`Account balance: ${formatUnits(balance, 'ether')} BNB`);
    
    
    log(chalk.yellow(`Network Name: ${network.name}`));
    log("----------------------------------------------------");    

    
    const  OracleArgs : {[key: string]: any} = {};

    const mockOracle = await getOrNull('OracleChainlinkMock_USD_per_BUSD');


    if (mockOracle){
        OracleArgs[`chainlink`] = mockOracle.address;
    } else{
        const chainlinkAddress = busdChainlinkOracle
        OracleArgs[`chainlink`] = chainlinkAddress;
    }



    const deploymentName = "OracleChainlinkWrapper_USD_per_BUSD"
    const OracleResult = await deploy(deploymentName, {
        contract: 'ChainlinkOracleWrapper', 
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


        const price: BigNumber = await read(
            deploymentName,
            "read"
        )
    
    
        log(`Price: ${chalk.green(price)}`);
    }

    log(chalk.cyan(`Ending Script.....`));
    log(chalk.cyan(`.....`));




  
};
export default func;
func.tags = ["2-1-01", "2-1" ,"busd-wrapper","oracle"];
func.dependencies = ["2-0-01"]