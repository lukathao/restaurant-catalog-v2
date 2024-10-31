// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract ToDoList {
  uint256 public _idUser;
  address public ownerOfContract;

  address[] public creators;
  string[] public message;
  uint256[] public messageId;

  struct ToDoListApp {
    address account;
    uint userId;
    string message;
    bool completed;
  }

  event ToDoEvent(
    address indexed account,
    uint256 indexed userId,
    string message,
    bool completed
  );

  mapping (address => ToDoListApp) public ToDoListApps;

  constructor() {
    ownerOfContract = msg.sender;
  }

  function inc() internal {
    _idUser++;
  }

  function createList(string callData _message) external {
    inc();

    uint256 idNumber = _idUser;
    ToDoListApp storage toDo = toDoListApps[msg.sender];

    toDo.account = msg.sender;
    toDo.message = _message;
    toDo.completed = false;
    toDo.userId = idNumber;

    creators.push(msg.sender);
    message.push(_message);
    messageId.push(idNumber);

    emit ToDoEvent(account, userId, message, completed);
  } 

  function getCreatorData(address _address) public view returns (address, uint256, string memory, bool) {
    ToDoListApp memory singleUserData = toDoListApps[_address];

    return (
      singleUserData.account,
      singleUserData.userId,
      singleUserData.message,
      singleUserData.completed
    )
  }

  function getAddress() external view returns(address[] memory) {
    return creators;
  }
  
  function getMessage() external view return(string[] memory) {
    return message;
  }

  //change state of todo item
  function toggle(address _creator) public {
    ToDoListApp storage singleUserData = toDoListApps[_creator];
    //actual toggle here
    singleUserData.completed = !singleUserData.completed;
  }
}
