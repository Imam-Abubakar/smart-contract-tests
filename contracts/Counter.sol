//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Counter {
    uint public count;
    string public name;

    constructor(string memory _name, uint _initialCount) {
        name = _name;
        count = _initialCount;
    }

    function increment() public returns (uint newCount) {
        count ++;
        return count;
    }

    function decrement() public returns (uint newCount) {
        count --;
        return count;
    }

    function getCount() public view returns(uint) {
        return count;
    }

    function getName() public view returns(string memory) {
        return name;
    }

    function setName(string memory _newName) public returns(string memory newName) {
        name = _newName;
        return name;
    }

    function setCount(uint _newCount) public returns(uint newCount) {
        count = _newCount;
        return count;
    }

}