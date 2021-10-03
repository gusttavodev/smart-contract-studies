const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );
  
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const BuyMeOneCoffee = await hre.ethers.getContractFactory("BuyMeOneCoffee");
  const buyMeOneCoffee = await BuyMeOneCoffee.deploy("Gustavo", 21);
  await buyMeOneCoffee.deployed();

  console.log("Deployed to:", buyMeOneCoffee.address);

  if(process.env.CHAIN_SCAN_TOKEN) {
    console.log("Verifying contract:")
    await hre.run("verify:verify", {
      address: buyMeOneCoffee.address,
    });
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });