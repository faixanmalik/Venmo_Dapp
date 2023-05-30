// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract Transactions {
  // No of total Transactions
  uint transactionCounts;

  // event that will fire when the transaction is made
  event Transfer(address from, address receiver, uint amount, string message, uint timestamp);

  // struct the transaction
  struct TransactionStruct {
    address sender;
    address receiver;
    uint amount;
    string message;
    uint timestamp;
  }

  // Array of Transactions
  TransactionStruct[] transactions;

  // Function that add the transaction to the blochchain
  function addTransaction(address payable receiver, uint amount, string memory message) public {
    transactionCounts += 1;
    transactions.push(TransactionStruct(msg.sender, receiver, amount, message, block.timestamp));

    // emit the transaction
    emit Transfer(msg.sender, receiver, amount, message, block.timestamp);
  }

  // Function that get all the transactions from the blockchain
  function getTransaction() view public returns (TransactionStruct[] memory) {
    return transactions;
  }

  // Function that get no of all the transactions from the blockchain
  function getTransactionCount() view public returns (uint) {
    return transactionCounts;
  }
  
}