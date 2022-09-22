import React, { useEffect, useState } from "react";
import cloudwallet from "../../utils/cloudwallet";
import web3 from "../../utils/web3";
import LeftHeader from "../../components/LeftHeader/LeftHeader";
import wallet from "../../assets/Wallet.png";

export default function Home() {
  const [amount, setAmount] = useState("");
  const [unamount, setUnamount] = useState("");
  const [locktime, setLocktime] = useState("");
  const [message, setMessage] = useState("");
  const [messagetwo, setMessagetwo] = useState("");
  const [messagethree, setMessagethree] = useState("");
  const [time, setTime] = useState("");

  const [clientBalance, setClientBalance] = useState("--");

  const handleDeposit = async (e) => {
    e.preventDefault();
    let accounts;
    try {
      accounts = await window.ethereum.enable();
    } catch (error) {
      console.log(error);
    }

    setMessage("Processing request please wait...");
    // console.log(web3.utils.toWei(amount, "ether"));
    await cloudwallet.methods
      .lockFund(locktime)
      .send({
        from: accounts[0],
        value: web3.utils.toWei(amount, "ether"),
      })
      .then(() => {
        setMessage("Deposit successfully done.");
        setAmount("");
        setLocktime("");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      });
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    let accounts;
    try {
      accounts = await window.ethereum.enable();
    } catch (error) {
      console.log(error);
    }

    setMessagetwo("Processing request please wait...");
    // console.log(web3.utils.toWei(amount, "ether"));
    await cloudwallet.methods
      .unlockFund(web3.utils.toWei(unamount, "ether"))
      .send({
        from: accounts[0],
      })
      .then(() => {
        setMessagetwo("Withdraw successfully done.");
        setUnamount("");
        setTimeout(() => {
          setMessagetwo("");
        }, 3000);
      })
      .catch((e) => {
        setMessagetwo(e.error);
      });
  };

  const handleGetTime = async (e) => {
    e.preventDefault();
    let accounts;
    try {
      accounts = await window.ethereum.enable();
    } catch (error) {
      console.log(error);
    }

    setMessagethree("Processing request please wait...");
    // console.log(web3.utils.toWei(amount, "ether"));
    // let remTime = await cloudwallet.methods.getTime().call()
    const tim = await cloudwallet.methods.clientCounters(accounts[0]).call();
    console.log("bal ", tim);
    // setClientBalance(web3.utils.fromWei(bal, 'ether'))

    setTime(tim);
  };

  const handleGetBalance = async (e) => {
    e.preventDefault();
    let accounts;
    try {
      accounts = await window.ethereum.enable();
    } catch (error) {
      console.log(error);
    }

    setMessagethree("Processing request please wait...");
    // console.log(web3.utils.toWei(amount, "ether"));
    const bal = await cloudwallet.methods.clientFunds(accounts[0]).call();
    console.log("bal ", web3.utils.fromWei(bal, "ether"));
    setClientBalance(web3.utils.fromWei(bal, "ether"));
  };

  return (
    <div>
      <div class="flex flex-col justify-center items-center">
        <LeftHeader />
        <div className="w-96 h-96">
          <img src={wallet} alt="wallet" />
        </div>
        <div className="my-4 text-2xl text-gray-700 font-serif">
          My balance: {clientBalance ? `${clientBalance} ETH` : ""}
        </div>
        {/* My balance: {clientBalance? `${clientBalance} ETH` : '' }  */}
        {/* <button onClick={(e) => handleGetTime(e)}>Get Time</button> */}
        {time}
        {/* <button onClick={(e) => handleGetBalance(e)}>Get Balance</button> */}
        <button
          onClick={(e) => handleGetBalance(e)}
          class="m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Get Balance
        </button>
      </div>

      <div>
        <div class="flex flex-col justify-center items-center">
          <h2 className="my-4 text-2xl text-gray-700 font-serif">Deposit</h2>

          <form
            onSubmit={(e) => handleDeposit(e)}
            class="bg-white shadow-md w-1/2 rounded px-8 pt-6 pb-8 mb-4"
          >
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="amount"
              >
                Amount
              </label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                id="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter amount to be locked"
                required
              />
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="locktime"
              >
                Lock Time
              </label>
              <input
                type="text"
                value={locktime}
                onChange={(e) => setLocktime(e.target.value)}
                id="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter duration (seconds)"
                required
              />
            </div>
            <div class="text-gray-700 text-xl font-bold mb-4">
              <h3>{message}</h3>
            </div>
            <button class="m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
              Lock fund
            </button>
          </form>
        </div>

        <div class="flex flex-col justify-center items-center">
          <h2 className="my-4 text-2xl text-gray-700 font-serif">Withdraw</h2>

          <form
            onSubmit={(e) => handleWithdraw(e)}
            class="bg-white shadow-md w-1/2 rounded px-8 pt-6 pb-8 mb-4"
          >
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="unamount"
              >
                Amount
              </label>
              <input
                type="text"
                value={unamount}
                onChange={(e) => setUnamount(e.target.value)}
                id="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter amount to be unlocked"
                required
              />
            </div>
            <div class="text-gray-700 text-xl font-bold mb-4">
              <h3>{messagetwo}</h3>
            </div>
            <button class="m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
              Unlock fund
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
