const { expect } = require("chai");

describe("Cloudwallet contract", function () {
  it("Deployment should get funds", async function () {
    const [owner] = await ethers.getSigners();

    const Cloudwallet = await ethers.getContractFactory("Cloudwallet");

    const hardhatCloudwallet= await Cloudwallet.deploy();

    const ownerBalance = await hardhatCloudwallet.balanceOf(owner.address);
    expect(await hardhatCloudwallet.totalSupply()).to.equal(ownerBalance);
  });
});