# 🏄‍♂️ Quick Start & Architecture

This project is a monorepo created with [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/).

> 🔏 See smart contracts `**.sol` in [`./contracts`](../contracts/).

> 🔏 Manage dependencies in [`hardhat.config.ts`](../hardhat.config.ts).

it includes required config information, such as **rpc** config and **plugin dependencies**.

It also contains **Account Config Addresses** which are stored in `namedAccounts` key. This is very useful additional hardhat plugin. As these can be uses as parameter to run the deploy scripts in `/deploy`

> 🔏 Import built artifacts`**.json` in [`/artifacts`](../artifacts/)

it contains **ABI files**.

> The ABI, **Application Binary Interface**, is basically how you call functions in a contract and get data back.

To generate these , compile the contracts via runing:

```
yarn hardhat compile
```

> 🔏 See deployment scripts `**.ts` in [`./deploy`](../deploy/).

They can be used to both for TDD purpose and deployment in production

- > Read more [`here`](./3_DEPLOY_SCRIPT.md).

> 🔏 See deployment History `**.json` in [`./deployments`](../deployments/).

- They contain both **ABI** and **Deployed Addresses** .
- This is only generated for Testnet and Mainnet after running **deployment scripts**d.

> 🔏 See customed tasks `**.ts` in [`./tasks`](../tasks/).

They are core components used for automation

Note that all tasks including built-in ones can be shown by runing:

>

```
yarn hardhat help
```

> 🔏 See test suites `**.test.ts` in [`./test`](../test/).

Test suites are locally performed after automatically running all the deployments scripts in [`./deploy`](../deploy/).

This will generaly speed up the tests as further tests will be able to revert back to the full deployment, by **deployments.fixture** feature.

- Read more [`here`](./3_DEPLOY_SCRIPT.md).

> 🔏 See **Typescript Declaration Files** `**.d.ts` in [`./typechain`](../typechain/).

They are built, so they could be used to abstract logic if wanted
