# 4. 🛠  Running Manual Tasks

## Built-in Tasks

We can run following manual **tasks**, including default and ones built with plugin.

1) Compiling contracts

To compile the contract run `yarn hardhat compile` in your terminal. The `compile` task is one of the built-in tasks.

Run using:

```
$ yarn hardhat compile
Compiling 1 file with 0.5.19
Compilation finished successfully
```

2) **verify** - verify the  contract

Run using:

```
yarn hardhat verify --network bscTestnet <EOA address> --contract contracts/tokens/BUSDTest.sol:BUSDTest --constructor-args deploy/1_deploy_tokens/busd_arguments.js
```



3) **Remove** Hardhat console.log imports and calls from Solidity source code.

Run the Hardhat task manually:
```
yarn run hardhat remove-logs
```
Before removing logs, the plugin will ensure that all contracts can be compiled successfully


4) **Checking Contract Size** - to check if we need refactoring or not

Run using:

```
yarn run hardhat size-contracts
```

5) **Checking Storage Layout** - to check if the storage slot
> :warning: **Warning**
>

> Need to compile first

```
yarn hardhat storage-layout > layout.txt
```
## Customed Tasks

All customed tasks `**.ts` are in [`./tasks`](../tasks/).


1) **Accounts** - list all of accounts 
currently using in the runtime environment

Run using:

```
yarn hardhat --network bscTestnet accounts
```
2) **balance** - specify balance in the given account 

**Param: account** : Address from **Accounts** task

Run using:
```
yarn hardhat --network bscTestnet  balance --account <EOA address>
```
3) **block-number** - specify the current block number

Run using:
```
yarn hardhat --network bscTestnet block-number
```

