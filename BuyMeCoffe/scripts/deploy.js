const hre = require("hardhat");

async function main() {
  const BuyMeCoffe = await hre.ethers.getContractFactory("BuyMeCoffe");
  const buyMeCoffe = await BuyMeCoffe.deploy();

  await buyMeCoffe.deployed();

  console.log("BuyMeCoffe deployed to:", buyMeCoffe.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
