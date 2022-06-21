pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract mintableERC20 is ERC20 {
    // Variables
    mapping(address => uint) public lastMintTime;
    uint private interval;
    address public owner;
    address private whale1 = 0x12Cb274aAD8251C875c0bf6872b67d9983E53fDd;
    address private whale2 = 0x3B939FeaD1557C741Ff06492FD0127bd287A421e;
    address private whale3 = 0xDAC66EDAB6e4fB1f6388d082f4689c2Ed1924554;
    
    
    constructor(string memory _name, string memory _symbol) ERC20(_name,_symbol) {
        _mint(whale1, 100000000000000000000000);
        _mint(whale2, 100000000000000000000000);
        _mint(whale3, 100000000000000000000000);

        owner = msg.sender;
        interval = 3600;
    }
    
    function mintToken() public {
        require(lastMintTime[msg.sender] == 0 || block.timestamp > lastMintTime[msg.sender] + interval, 'You need to wait an hour between mints');
        _mint(msg.sender, 100000000000000000000);
        lastMintTime[msg.sender] = block.timestamp;
    }
    
    function canMint(address _address) public view returns (bool) {
        return lastMintTime[_address] == 0 || block.timestamp > lastMintTime[_address] + interval;
    }

    function setInterval(uint _newInterval) public onlyOwner {
        interval = _newInterval;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, 'Not owner');
        _;
    }
}