const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BuyMeOneCoffee", function () {
  it("Should deploy contract with params", async function () {
    const [owner] = await ethers.getSigners();

    const BuyMeOneCoffee = await ethers.getContractFactory("BuyMeOneCoffee");
    const buyMeOneCoffee = await BuyMeOneCoffee.deploy("Gustavo", 21);
    await buyMeOneCoffee.deployed();

    const user = await buyMeOneCoffee.getUser()

    const expectedUser = {
      name: "Gustavo",
      age: 21,
      wallet: owner.address
    }

    expect(user.name).to.equal(expectedUser.name);
    expect(user.age).to.equal(expectedUser.age);
    expect(user.wallet).to.equal(expectedUser.wallet);
  });
  it("Should set user data", async function () {
    const [owner, addr1] = await ethers.getSigners();

    const BuyMeOneCoffee = await ethers.getContractFactory("BuyMeOneCoffee");
    const buyMeOneCoffee = await BuyMeOneCoffee.deploy("Gustavo", 21);
    await buyMeOneCoffee.deployed();

    const newUser = {
      name: "Pedro",
      age: 10,
      wallet: addr1.address
    }

    await buyMeOneCoffee.setUser(newUser)
    const user = await buyMeOneCoffee.getUser()

    expect(user.name).to.equal(newUser.name);
    expect(user.age).to.equal(newUser.age);
    expect(user.wallet).to.equal(newUser.wallet);
  });
});
