# intercloudv2
# Smart Contract Based Policy System

Copyright Stephen Kirkman, Richard Newman

We use blockchain technology for decentralized storage and smart contracts as the vehicle for policy evaluation.  We present InterCloud, a smart contract based policy system that gains its trustworthiness from being publicly decentralized.  We provide the following:   1) Remove the conflict of interest created by storing policies and attestations in the cloud and move them into a decentralized blockchain, 2) Reduce the dependence on a trusted third party (TTP) for attestations, 3) Use smart contracts to store consumer data and to functionally evaluate the policies.

## Dependencies

*	+-- create-react-app@1.5.2
*	+-- embark@3.0.6
*	+-- ethereumjs-testrpc@6.0.3
*	+-- ganache-cli@7.0.0-beta.0
*	+-- npm@6.1.0
*	+-- truffle@4.1.11
*	+-- webpack@4.12.0
*	+-- windows-build-tools@2.3.0


### Smart Contract System

The smart contract system is implemented using the Solidity language.   The DApp front end uses React and Next.js.



### Instructions to Set up Project

*	Create new directory
*	npm init  (enter a bunch of carriage returns, default answers)
*	npm intall --save ganache-cli mocha solc fs-extra web3@1.0.0-beta.26
*	npm install --save truffle-hdwallet-provider
*	npm install --save next@4.1.4 react react-dom 



# Startup Instructions

*	open 3 project windows and code editor, and browser, and code editor
*	first window:
  * ganache-cli
  * leave running
* second window:
  * cd project directory
  * cd Ethereum directory
  * node compile.js
  * ensure ganache-cli is running
* save test blockchain mnemonics to notepad for later use
  * copy keywords to deploy.js
  * node deploy.js and capture the deployment address
* save deploy address to notepad
  * copy deployment address to main.js
  * cd intercloud
  * npm run dev, wait for localhost to start on 3000
*	open browser to localhost:3000
  * open metamast and import mnemonics to create password
* open second browser navigate to remix.ethereum.online
  * copy contract to display and set up Web3 provider using localhost:8545
  * load contract from Ganache Test Blockchain


## Upload Reminders

```
git push -u origin master

# Pushes the changes in your local repository up to the remote repository you specified as the origin
```


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* With web training help from various locations including:
  * https://github.com/StephenGrider/EthereumCasts
