// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Cloudwallet {

    mapping(address => uint) public clientFunds;
    mapping(address => uint) public clientCounters;
    uint _start;
    uint _end;

    // Lock time counter check
    modifier timeCounter {
        require(block.timestamp >= clientCounters[msg.sender], "Not allowed to withdraw before set time.");
        _;
    }

    // Locking funds
    function lockFund(uint lockTime) external payable {
         _start = block.timestamp;
        _end = _start + lockTime;
        clientFunds[msg.sender] += msg.value;
        clientCounters[msg.sender] = _end;
    }

    // Unlocking funds
    function unlockFund(uint _amount) timeCounter external payable {
        require(_amount <= clientFunds[msg.sender], "You're request is cancelled due to insufficient funds.");
        clientFunds[msg.sender] -= _amount;
        payable(msg.sender).send(_amount);
    }

    // Balance storing funds for all clients
    function balanceOf() external view returns(uint) {
        return address(this).balance;
    }

    // Balance for available funds in cloud wallet for a single client
    function balanceOfClient() external view returns(uint) {
        return  clientFunds[msg.sender];
    }

    // get time remaining before withdraw
    function getTime() external view returns(uint) {
        require(block.timestamp <= _end, "Allowed to withdraw");
        return clientCounters[msg.sender]-block.timestamp;
    }
}

// Contract address on rinkeby testnet
// 0xedF72DFFD27c8c1F9f37877163C91dD9F3675C05