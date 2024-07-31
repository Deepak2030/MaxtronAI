// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MessageStorage {

    // State variables
    string private message;
    string private password;
    address private immutable i_admin;

    // Events
    event MessageChanged(string newMessage, address changedBy);

    // Errors
    error MessageStorage__Unauthorized(address caller);
    error MessageStorage__IncorrectPassword();

    // Modifiers
    modifier onlyOwner() {
        if (msg.sender != i_admin) {
            revert MessageStorage__Unauthorized(msg.sender);
        }
        _;
    }

    // Constructor to initialize the message, password, and admin
    constructor(string memory initialMessage, string memory initialPassword) {
        message = initialMessage;
        password = initialPassword;
        i_admin = msg.sender;
    }

    // Function to retrieve the message with the correct password
    function getMessage(string memory inputPassword) public view returns (string memory) {
        if (keccak256(abi.encodePacked(inputPassword)) != keccak256(abi.encodePacked(password))) {
            revert MessageStorage__IncorrectPassword();
        }
        return message;
    }

    // Function to set a new message (only owner function)
    function setMessage(string memory newMessage, string memory inputPassword) public onlyOwner {
        if (keccak256(abi.encodePacked(inputPassword)) != keccak256(abi.encodePacked(password))) {
            revert MessageStorage__IncorrectPassword();
        }
        message = newMessage;
        emit MessageChanged(newMessage, msg.sender);
    }
}
