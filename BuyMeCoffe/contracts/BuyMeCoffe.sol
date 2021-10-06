//SPDX-License-Identifier: Unlicense
// Ref https://blog.soliditylang.org/2020/03/26/fallback-receive-split/
pragma solidity ^0.8.0;

contract BuyMeCoffe {
    uint public balanceReceived;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function receiveMoney() public payable {
        balanceReceived += msg.value;
    }

    function getBalance() public view returns(uint) {
        return address(this).balance;
    }

    function withdrawMoney() public {
        require(msg.sender == owner, "Unauthorized");

        payable(owner).transfer(getBalance());
    }
}