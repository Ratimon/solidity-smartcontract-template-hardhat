# 🔏 Workflow for Internal USe

## 📱 Command


**for Author**

```
git checkout main
git pull
git checkout test
git pull origin main
git add .
git commit -m 'docs(./README.md): Add Naming Convention'
git rebase -i main
git checkout main
git merge test
git push origin main
```
**for Collaboration**

```
git checkout main
git pull upstream main
git status
git push
git checkout test
git pull upstream main
git status
git push
git add .
git commit -m 'docs(./README.md): Add Naming Convention'
git push -u origin test
```
Then create a pull request for ‘new_branch’

**Behind**
```
git fetch
git rebase  origin/master
```
or

```
git pull --rebase
```
**Ahead**

If you work in another way and your local changes should be pushed then just 

```
git push origin 
```
assuming origin is your remote

or

If your local changes are bad then just remove them or reset your local master to the state on remote 

```
git reset --hard origin/master
```

## 📝  Naming Convention & Pipeline

### Commit Message Convention

- *task*(*scope*): *task-id* *message*

- feat
- fix
- chore
- Refactor
- test
- build
- docs

### Examples

(eg. chore(./test/): clean up unused code)

(eg. docs(./README.md): Add Naming Convention)

(eg. Refactor && fix (./deploy && ./test): Fixing deploy script to allow Fixture feature and storing artifacts from factory contracts eg TestToken and JrepoOracle && fix param unit in 2-1_deployOracle)

(eg.  fix && Refactor && Build (./deploy): Fixing deploy scripts to allow running them with both hardhat and bscTestnet networks as well as to include iToken addresses && refactor hardhat.config.ts file using hardhat-deploy plugin's namedAccounts so helper-hardhat-config.ts is depreciated && Build new deployment history)


(eg.  chore (./) : cleaning up used comments and files)

(eg.  refactor (./test) : orchesratrating up loan tokens cases)

(eg.  test && fix  (./test/ && ./deploy) : Successfully adding test suites for bollowing GASH token and adding deploy script for missing mocking contract)

(eg.  docs && test  (./docs/ && ./test) : Successfully adding test suites for bollowing GASH token and adding deploy script for missing mocking contract)

## Generating Git tree


[comment]: # 'git config --global alias.tree '! git ls-tree --full-name --name-only -t -r HEAD | sed -e "s/[^-][^\/]*\//   |/g" -e "s/|\([^ ]\)/|-- \1/"''

[comment]: # 'git tree'