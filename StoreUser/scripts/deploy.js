const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );
  
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const StoreUser = await hre.ethers.getContractFactory("StoreUser");
  const storeUser = await StoreUser.deploy("Gustavo", 21);
  await storeUser.deployed();

  console.log("Deployed to:", storeUser.address);

  if(process.env.CHAIN_SCAN_TOKEN) {
    console.log("Verifying contract:")
    await hre.run("verify:verify", {
      address: storeUser.address,
    });
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });