//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// import "hardhat/console.sol";

struct User {
    string name;  
    uint age;  
    address payable wallet;
}
contract StoreUser{
    User user;

    constructor(string memory name, uint age) {
        user.name = name; 
        user.age = age; 
        user.wallet = payable(msg.sender); // setting the contract creator
    }

    /**
        public -> accessível apenas fora do 
    */
    function setUser(User memory data) public {
        user = data;
    }

    /**
        external -> accessível dentro e fora do contrato
        view -> Não pode mudar valores somente lêr
        view -> Não pode mudar valores somente lêr
    */
    function getUser() external view returns (User memory) {
        return user;
    }
}
