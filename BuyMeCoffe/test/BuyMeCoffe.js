const chai = require("chai")
const expect = chai.expect
const { solidity } = require("ethereum-waffle");

chai.use(solidity)

describe("BuyMeCoffe contract", function () {
  let owner;
  let contract;

  this.beforeAll(async () => {
    [owner, someFucker] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory("BuyMeCoffe");
    contract = await Contract.deploy();
  })

  it("should deposite a token at contract", async function () {
    await contract.receiveMoney({ value: 10 })

    const balance = await contract.getBalance()
    expect(balance.toNumber()).to.equal(10)    
  });

  it("should withdrawn if is owner", async function () {
    const contractInitialBalance = await contract.getBalance()

    await contract.receiveMoney({ value: ethers.utils.parseEther("10") })

    await expect(
        await contract.withdrawMoney()
    ).to.changeEtherBalance(owner, ethers.utils.parseEther("10").add(contractInitialBalance));

    expect(await contract.getBalance()).to.equal(0)
});

  it("should not withdrawn if is not owner", async function () {
      const contractFuckerSigner = contract.connect(someFucker)

      await contract.receiveMoney({ value: 10 })
  
      const receipt = await contractFuckerSigner.withdrawMoney().catch(e => e.message)
      expect(receipt).to.equal(`VM Exception while processing transaction: reverted with reason string 'Unauthorized'`)
  });
});
