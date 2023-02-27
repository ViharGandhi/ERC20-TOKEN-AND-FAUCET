// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const Faucet = await hre.ethers.getContractFactory('Faucet');
  const faucet = await Faucet.deploy("0xF0E42c5E9cfFD6bCC5c7b3739bcE1486A62b1323")
  await faucet.deployed();
  console.log(`ContractAddress deployed at ${faucet.address}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
//0xf1C7592a45c351B4c0c5db3eE1B6dB69E7A409F4
//0xF0E42c5E9cfFD6bCC5c7b3739bcE1486A62b1323
//0xECcb967A758ec765541C49C596c7E4E6Fb6aB77c-faucet address.