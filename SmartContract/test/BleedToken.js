const { expect } = require("chai");
const hre = require("hardhat");

describe("OceanToken contract", function() {
  // global vars
  let Token;
  let oceanToken;
  let owner;
  let addr1;
  let addr2;
  let tokenCap = 100000000;
  let tokenBlockReward = 50;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    Token = await ethers.getContractFactory("BleedToken");
    [owner, addr1, addr2] = await hre.ethers.getSigners();

    oceanToken = await Token.deploy(tokenCap, tokenBlockReward);
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await oceanToken.owner()).to.equal(owner.address);
    });
 })

   
  
});