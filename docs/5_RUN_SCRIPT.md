# 3. 📱 Running Stand Alone Scripts 

## General SCRIPTS

Here is the list of npm scripts you can execute:

Some of them relies on [./\_scripts.js](./_scripts.js) to allow parameterizing it via command line argument (have a look inside if you need modifications)
<br/><br/>

```bash
yarn prepare
```

As a standard lifecycle npm script, it is executed automatically upon install. It generate config file and typechain to get you started with type safe contract interactions
<br/><br/>

`yarn lint`, `yarn lint:fix`, `yarn format` and `yarn format:fix`

These will lint and format check your code. the `:fix` version will modifiy the files to match the requirement specified in `.eslintrc` and `.prettierrc.`
<br/><br/>

```bash
yarn compile
```

These will compile your contracts
<br/><br/>

```bash
yarn void:deploy
```

This will deploy your contracts on the in-memory hardhat network and exit, leaving no trace. quick way to ensure deployments work as intended without consequences
<br/><br/>

```bash
yarn test [mocha args...]
```

These will execute your tests using mocha. you can pass extra arguments to mocha
<br/><br/>

```bash
yarn coverage
```

These will produce a coverage report in the `coverage/` folder
<br/><br/>

```bash
yarn gas
```

These will produce a gas report for function used in the tests
<br/><br/>

```bash
yarn dev
```

These will run a local hardhat network on `localhost:8545` and deploy your contracts on it. Plus it will watch for any changes and redeploy them.
<br/><br/>

```bash
yarn local:dev
```

This assumes a local node it running on `localhost:8545`. It will deploy your contracts on it. Plus it will watch for any changes and redeploy them.
<br/><br/>

```bash
yarn execute <network> <file.ts> [args...]
```

This will execute the script `<file.ts>` against the specified network
<br/><br/>

```bash
yarn deploy <network> [args...]
```

This will deploy the contract on the specified network.

Behind the scene it uses `hardhat deploy` command so you can append any argument for it
<br/><br/>

```bash
yarn export <network> <file.json>
```

This will export the abi+address of deployed contract to `<file.json>`
<br/><br/>

```bash
yarn fork:execute <network> [--blockNumber <blockNumber>] [--deploy] <file.ts> [args...]
```

This will execute the script `<file.ts>` against a temporary fork of the specified network

if `--deploy` is used, deploy scripts will be executed
<br/><br/>

```bash
yarn fork:deploy <network> [--blockNumber <blockNumber>] [args...]
```

This will deploy the contract against a temporary fork of the specified network.

Behind the scene it uses `hardhat deploy` command so you can append any argument for it
<br/><br/>

```bash
yarn fork:test <network> [--blockNumber <blockNumber>] [mocha args...]
```

This will test the contract against a temporary fork of the specified network.
<br/><br/>

```bash
yarn fork:dev <network> [--blockNumber <blockNumber>] [args...]
```

This will deploy the contract against a fork of the specified network and it will keep running as a node.

Behind the scene it uses `hardhat node` command so you can append any argument for it
