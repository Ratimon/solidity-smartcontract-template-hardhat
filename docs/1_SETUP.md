# 1. 🏗  Setting up the environment

## Installing Node.js

### 📱 MacOS

Make sure you have `git` installed. Otherwise, follow [these instructions](https://www.atlassian.com/git/tutorials/install-git).

There are multiple ways of installing Node.js on MacOS. We will be using [Node Version Manager (nvm)](http://github.com/creationix/nvm). Copy and paste these commands in a terminal:

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.35.2/install.sh | bash
nvm install 12.19.1
nvm use 12.19.1
nvm alias default 12.19.1
npm install npm --global # Upgrade npm to the latest version
```

## Installing yarn

We are going to use [yarn](yarnpkg.com)

To install it do the following:

```
npm install -g yarn
```

# 2. Creating a new Hardhat project

We'll install **Hardhat** using the npm CLI. The **N**ode.js **p**ackage **m**anager is a package manager and an online repository for JavaScript code.

Open a new terminal, go to the directory and run these commands:

```
yarn init --yes
yarn add -D hardhat
```

In the same directory where you installed **Hardhat** add a `hardhat.config.ts` (we are going to use typescript and use solidity 0.5.17 compiler)

```typescript
import {HardhatUserConfig} from 'hardhat/types';
const config: HardhatUserConfig = {
  solidity: {
    version: '0.6.6',
  }
};
export default config;

```

## Install Dependenciies

Run following yo install required dependencies
```
yarn install
```

## Dependency Issues

However, current verison of [waffle.io](https://vanity-eth.tk/) doesnot support checking against subset of args emitted in events.

To support this, we may need to use **openzeppelin-test-helpers**. Install with:

```
yarn add -D @nomiclabs/hardhat-truffle5
yarn add -D openzeppelin-test-helpers
```

```
yarn add hardhat-tracer
```

Also, there is sometimes problem with  **hardhat-deploy-ethers** dependency. Here is a way to fix:
```
yarn add -D  @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers
```
But it sometimes does not work, try this:
```
yarn add -D  hardhat-deploy-ethers
```



Edit `hardhat.config.ts` so that it looks as in our repository:


We also create the following `tsconfig.json` :

```json
{
    "compilerOptions": {
      "target": "es5",
      "module": "commonjs",
      "strict": true,
      "resolveJsonModule": true,
      "esModuleInterop": true,
      "moduleResolution": "node",
      "forceConsistentCasingInFileNames": true,
      "outDir": "dist"
    },
    "include": [
      "./artifacts",
      "./deploy",
      "./test",
      "./utils"
    ],
    "files": ["./hardhat.config.ts"],
  }
```

## Add .gitignore

We need to create the following `.gitignore` :

```env
cache/
artifacts/

coverage*
typechain/

.vscode/*
!.vscode/settings.json.default
!.vscode/launch.json.default
!.vscode/extensions.json.default

.DS_Store
Thumbs.db
node_modules/
.env

.yalc
yalc.lock

contractsInfo.json
deployments/hardhat
deployments/localhost

.dapp/
_lib/
```

## Add .env

We also create the following `.env` :

```env
PKEY=
MNEMONIC_MAINNET=
MNEMONIC=
ETHERSCANKEY=


# network specific node uri : `"ETH_NODE_URI_" + networkName.toUpperCase()`
ETH_NODE_URI_MAINNET=https://eth-mainnet.alchemyapi.io/v2/<apiKey>
# generic node uri (if no specific found) :
ETH_NODE_URI=https://{{networkName}}.infura.io/v3/<apiKey


CHAINSTACK_NODEUSERNAME=
CHAINSTACK_PASSWORD=
CHAINSTACK_RPC_ENDPOINT=
CHAINSTACK_WSS_ENDPOINT=


ETH_NODE_URI_BSCMAINNET = https://bsc-dataseed1.ninicoin.io/
ETH_NODE_URI_BSCTESTNET = https://data-seed-prebsc-2-s2.binance.org:8545/
```

We can go to [vanity-eth](https://vanity-eth.tk/) in order to generate such Private key

We can go to [iancoleman.io](https://iancoleman.io/bip39/) in order to generate such Mneomic key


We could ask mock BNB for testing purpose by go to
[testnet.binance.org](https://testnet.binance.org/faucet-smart)

> :warning: **Warning**
>

> Note that we use plugin "hardhat-secure-signer" to run stand-alone scripts. We only store private key and Mneomic key for only running test purpose