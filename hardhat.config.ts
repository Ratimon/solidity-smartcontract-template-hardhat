// import { config as dotenvConfig } from "dotenv";
import 'dotenv/config';
import {HardhatUserConfig} from 'hardhat/types';
// import { NetworkUserConfig } from "hardhat/types";

import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-web3";
import 'hardhat-deploy-ethers';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import "hardhat-contract-sizer";
import 'hardhat-deploy';
import "solidity-coverage"
import 'hardhat-tracer';
import "hardhat-log-remover"
import "hardhat-storage-layout"
import "@tenderly/hardhat-tenderly"


import {node_url, accounts, addForkConfiguration} from './utils/network';

import tasks from './tasks'
for (const tsk of tasks) { tsk() }


// const PRIVATE_KEY = process.env.PKEY;
// const MNEMONIC = process.env.MNEMONIC;
const ETHERSCAN_KEY = process.env.ETHERSCANKEY;

const config: HardhatUserConfig = {


  solidity: {

    compilers: [
      {
        version: "0.5.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          },
          outputSelection: {
            "*": {
                "*": ["storageLayout"],
            },
          },
        }
      },

      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          },
          outputSelection: {
            "*": {
                "*": ["storageLayout"],
            },
          },
        }
      },

      {
        version: "0.8.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },

      {
        version: "0.8.15",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      }
      
    ],


  },
  namedAccounts: {
    deployer: 0,
    dev: 1,
    buyer: 2,
    user: 3,


    zero: "0x0000000000000000000000000000000000000000",
     ///-------------------/deploy---tokens-------------------///

    

    lp_reciever: {
      31337: 4, 
      56: "0x0000000000000000000000000000000000000000", //TODO : Add
      97: 4,
    },

    busd: {
      31337: "0xe9e7cea3dedca5984780bafc599bd69add087d56", 
      56: "0xe9e7cea3dedca5984780bafc599bd69add087d56", //Mapped from  https://bscscan.com/address/0xe9e7cea3dedca5984780bafc599bd69add087d56
      97: "0x2a7b39f35fA3e0bFBFD0136E43Cb9c7feb6625Cc",
    },

    weth: {
      31337: "0x2170ed0880ac9a755fd29b2688956bd959f933f8", 
      56: "0x2170ed0880ac9a755fd29b2688956bd959f933f8", //Mapped from https://bscscan.com/address/0x2170ed0880ac9a755fd29b2688956bd959f933f8
      97: "0xA3234ceaaf5877239738a71B1ea24b86f8EF7D5C",
    },

    usdt: {
      31337: "0x55d398326f99059ff775485246999027b3197955", 
      56: "0x55d398326f99059ff775485246999027b3197955", //Mapped from https://bscscan.com/address/0x55d398326f99059ff775485246999027b3197955
      97: "0xd8f40b596bf1a519478888443be550f65c2ca42e",
    },

    wbnb: {
      31337: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", 
      56: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", //Mapped from https://bscscan.com/address/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
      97: "0xEDCC8D4604691CdA5461b9fB42053005Da511588",
    },

    busdChainlinkOracle: {
      31337: "0xcBb98864Ef56E9042e7d2efef76141f15731B82f", //Mock to mainnet
      56: "0xcBb98864Ef56E9042e7d2efef76141f15731B82f", //Mapped from  https://docs.chain.link/docs/binance-smart-chain-addresses/
      97: "0x9331b55D9830EF609A2aBCfAc0FBCE050A52fdEa",
    },


    pancakefactory: {
      31337: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73", 
      56: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73", // Mapped from  https://bscscan.com/address/0xca143ce32fe78f1f7019d7d551a6402fc5350c73#readContract
      97: "0x0000000000000000000000000000000000000000",
    },

    pancakerouter: {
      31337: "0x10ED43C718714eb63d5aA57B78B54704E256024E", // Mapped from  https://bscscan.com/address/0xca143ce32fe78f1f7019d7d551a6402fc5350c73#readContract
      56: "0x10ED43C718714eb63d5aA57B78B54704E256024E", //TODO
      97: "0x0000000000000000000000000000000000000000",
    },


  },


  networks: addForkConfiguration({
    hardhat: {
      // chainId: 1337,
      initialBaseFeePerGas: 0, // to fix : https://github.com/sc-forks/solidity-coverage/issues/652, see https://github.com/sc-forks/solidity-coverage/issues/652#issuecomment-896330136
      tags: ['test']
    },
    localhost: {
      url: node_url('localhost'),
      accounts: accounts(),
    },
    staging: {
      url: node_url('rinkeby'),
      accounts: accounts('rinkeby'),
      tags: ['staging']
    },
    production: {
      url: node_url('mainnet'),
      accounts: accounts('mainnet'),
    },
    mainnet: {
      url: node_url('mainnet'),
      accounts: accounts('mainnet'),
    },
    rinkeby: {
      url: node_url('rinkeby'),
      accounts: accounts('rinkeby'),
      tags: ['staging']
    },
    kovan: {
      url: node_url('kovan'),
      accounts: accounts('kovan'),
    },
    goerli: {
      url: node_url('goerli'),
      accounts: accounts('goerli'),
    },

    bscmainnet: {
      // url: "https://bsc-dataseed.binance.org/",
      url: node_url('bscmainnet'),
      accounts: accounts('bscmainnet'),
      chainId: 56,
      gasPrice: 5000000000,

      throwOnTransactionFailures: false,
      // if true,  throw stack traces on transaction failures.
      // If false, return  failing transaction hash.
      throwOnCallFailures: true,
      // If is true, will throw  stack traces when a call fails.
      // If false, will return the call's return data, which can contain a revert reason
      tags: ['production'],
    },

    bscmainnetfork: {
      url: node_url('bscmainnetfork'),
      accounts: accounts('bscmainnetfork'),
      tags: ['fork']
    },

    bsctestnet: {
      url: node_url('bsctestnet'),
      accounts: accounts('bsctestnet'),
      chainId: 97,
      gasPrice: 10000000000,

      tags: ["staging"]

    },

    // bscTestnet2: {
    //   url: "https://data-seed-prebsc-1-s3.binance.org:8545/",
    //   // url: "https://data-seed-prebsc-1-s2.binance.org:8545/",
    //   chainId: 97,
    //   gasPrice: 10000000000,
    //   // accounts: [`0x${PRIVATE_KEY}`]
    //   accounts: {
    //     count: 10,
    //     initialIndex: 0,
    //     mnemonic: `${MNEMONIC}`,
    //     path: "m/44'/60'/0'/0",
    //   },

    //   tags: ["staging"]

    // },


  }),


  external: process.env.HARDHAT_FORK
  ? {
      deployments: {
        // process.env.HARDHAT_FORK will specify the network that the fork is made from.
        // these lines allow it to fetch the deployments from the network being forked from both for node and deploy task
        hardhat: ['deployments/' + process.env.HARDHAT_FORK],
        localhost: ['deployments/' + process.env.HARDHAT_FORK],
      },
    }
  : undefined,

  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_KEY 
  },


  paths: {
    sources: './contracts',
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
    deploy: './deploy',
    deployments: './deployments',
    imports: './imports'
  },

  typechain: {
    outDir: 'typechain',
    target: 'ethers-v5',
  },

  mocha: {
    timeout: 300000
  },
  
  
  
};

export default config;