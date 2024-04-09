import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

/**
 * Deploys a "MetaMultiSigWallet" contract
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployMetaMultiSigWallet: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network sepolia`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
  const chainId = await hre.getChainId();
  await deploy("MetaMultiSigWallet", {
    from: deployer,
    // Contract constructor arguments
    args: [chainId, ["0x95E08FA8ac4301acC5b943f860Cd8AC84433e3CF","0x2508218C77cE37eb5846E53A3366b0a572B4caCE","0x97843608a00e2bbc75ab0C1911387E002565DEDE"], 2],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  // Get the deployed contract
  // const metaMultiSigWallet = await hre.ethers.getContract("MetaMultiSigWallet", deployer);
};

export default deployMetaMultiSigWallet;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags MetaMultiSigWallet
deployMetaMultiSigWallet.tags = ["MetaMultiSigWallet"];
